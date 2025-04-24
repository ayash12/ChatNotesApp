import { MessageEntity } from '../../domain/entity/MessageEntity';

type MessageCallback = (message: MessageEntity) => void;

export class WebSocketService {
  private socket: WebSocket | null = null;
  private onMessageCallback: MessageCallback | null = null;

  connect(userId: string, onMessage: MessageCallback) {
    this.socket = new WebSocket('ws://192.168.1.14:8080'); // ganti IP
    this.onMessageCallback = onMessage;

    this.socket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.onMessageCallback?.(message);
    };

    this.socket.onerror = (e) => console.error('WebSocket error', e);
    this.socket.onclose = () => console.log('WebSocket closed');
  }

  sendMessage(message: MessageEntity) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  disconnect() {
    this.socket?.close();
  }
}
