export class ChatSocket {
    private socket: WebSocket;
    private userId: string;

    constructor(userId: string) {
      this.userId = userId;
      this.socket = new WebSocket('ws://localhost:8080');

      this.socket.onopen = () => {
        this.socket.send(JSON.stringify({ type: 'register', userId }));
      };
    }

    sendMessage(to: string, text: string) {
      this.socket.send(JSON.stringify({ type: 'message', from: this.userId, to, text }));
    }

    onMessage(callback: (data: { from: string; text: string; timestamp: number }) => void) {
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        callback(data);
      };
    }
  }
