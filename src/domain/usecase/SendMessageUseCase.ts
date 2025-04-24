
import { WebSocketService } from '../../data/websocket/WebSocketService';
import { MessageEntity } from '../entity/MessageEntity';

export class SendMessageUseCase {
  constructor(private socketService: WebSocketService) {}

  execute(message: MessageEntity) {
    this.socketService.sendMessage(message);
  }
}
