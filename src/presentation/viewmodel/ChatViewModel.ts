import { useEffect, useRef, useState } from 'react';
import { WebSocketService } from '../../data/websocket/WebSocketService';
import { MessageEntity } from '../../domain/entity/MessageEntity';
import { ChatDao } from '../../data/local/database/ChatDao';

export const useChatViewModel = (userId: string, recipientId: string) => {
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  const [connected, setConnected] = useState(false);
  const socketServiceRef = useRef<WebSocketService | null>(null);

  useEffect(() => {
    const socketService = new WebSocketService();
    socketServiceRef.current = socketService;

    // 🔹 Load history
    const loadChatHistory = async () => {
      const history = await ChatDao.getMessagesWithUser(userId, recipientId);
      setMessages(history);
    };

    loadChatHistory();

    // 🔹 Connect WebSocket
    socketService.connect(userId, async (msg) => {
      if (
        (msg.from === userId && msg.to === recipientId) ||
        (msg.from === recipientId && msg.to === userId)
      ) {
        setMessages((prev) => [...prev, msg]);
        await ChatDao.saveMessage(msg);
      }
    });

    setConnected(true);

    return () => {
      socketService.disconnect();
      setConnected(false);
    };
  }, [userId, recipientId]);

  const sendMessage = (text: string) => {
    const message: MessageEntity = {
      from: userId,
      to: recipientId,
      text,
      timestamp: Date.now(),
    };
    socketServiceRef.current?.sendMessage(message);
    setMessages((prev) => [...prev, message]);
    ChatDao.saveMessage(message);
  };

  return {
    connected,
    messages,
    sendMessage,
  };
};

