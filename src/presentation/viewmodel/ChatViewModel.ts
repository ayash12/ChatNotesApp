import { WebSocketService } from '../../data/websocket/WebSocketService';
import { MessageEntity } from '../../domain/entity/MessageEntity';
import { useEffect, useRef, useState } from 'react';

export const useChatViewModel = (userId: string) => {
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  const [connected, setConnected] = useState(false);
  const socketServiceRef = useRef<WebSocketService | null>(null);

  useEffect(() => {
    const socketService = new WebSocketService();
    socketServiceRef.current = socketService;

    socketService.connect(userId, (msg) => {
      setMessages((prev) => [...prev, msg]);
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
  };

  return {
    connected,
    messages,
    sendMessage,
  };
};
