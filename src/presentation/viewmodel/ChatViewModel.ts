import { useEffect, useRef, useState } from 'react';
import { WebSocketService } from '../../data/websocket/WebSocketService';
import { MessageEntity } from '../../domain/entity/MessageEntity';
import { ChatDao } from '../../data/local/database/ChatDao';

export const useChatViewModel = (userId: string) => {
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  const [connected, setConnected] = useState(false);
  const socketServiceRef = useRef<WebSocketService | null>(null);

  useEffect(() => {
    const socketService = new WebSocketService();
    socketServiceRef.current = socketService;

     // Load riwayat chat user dari SQLite
    const loadChatHistory = async () => {
      const history = await ChatDao.getMessagesForUser(userId);
      setMessages(history);
    };

    loadChatHistory();

    // Koneksi WebSocket dan simpan pesan masuk
    socketService.connect(userId, async (msg) => {
      setMessages((prev) => [...prev, msg]);
      await ChatDao.saveMessage(msg);
    });


    setConnected(true);

    return () => {
      socketService.disconnect();
      setConnected(false);
    };
  }, [userId]);

  const sendMessage = (text: string) => {
    const message: MessageEntity = {
      from: userId,
      text,
      timestamp: Date.now(),
    };
    socketServiceRef.current?.sendMessage(message);
    setMessages((prev) => [...prev, message]); // tampilkan pesan sendiri
    ChatDao.saveMessage(message); // simpan ke SQLite
  };

  return {
    connected,
    messages,
    sendMessage,
  };
};
