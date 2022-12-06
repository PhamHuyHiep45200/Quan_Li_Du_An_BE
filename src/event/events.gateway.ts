import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connect', (socket) => {
      console.log('connected', socket.id);
    });
  }

  @SubscribeMessage('actionNotify')
  handleEvent(@MessageBody() data: any) {
    // this.server.on('actionNotify', (data) => {
    console.log(data);
    // });
    this.server.emit('notify', { msg: data });
  }
}
