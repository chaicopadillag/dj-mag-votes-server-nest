import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { DjMagVotesService } from './dj-mag-votes.service';
import { Producer } from './models/producer.model';

@WebSocketGateway({ cors: true })
export class DjMagVotesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  socketServer: Socket;

  constructor(private readonly djmagService: DjMagVotesService) {}

  handleConnection(client: Socket, ...args: any[]) {
    // console.log(`Socket Cliente Connect: `, client.id);
    client.emit('producers', this.djmagService.getProducersActive());
  }

  handleDisconnect(client: Socket) {
    console.log(`Socket Cliente Disconnect: `, client.id);
  }

  @SubscribeMessage('message-flutter')
  handleMessage(client: Socket, payload: any) {
    console.log(payload);
    client.broadcast.emit('message-flutter', payload);
  }

  @SubscribeMessage('vote-producer')
  handleVoteProducer(client: Socket, payload: { id: string }) {
    this.djmagService.voteProducer(payload.id);

    this.socketServer.emit('producers', this.djmagService.getProducersActive());
  }

  @SubscribeMessage('add-producer')
  handleAddProducer(client: Socket, payload: { name: string }) {
    this.djmagService.addProducer(payload.name);
    this.socketServer.emit('producers', this.djmagService.getProducersActive());
  }

  @SubscribeMessage('delete-producer')
  handleDeleteProducer(client: Socket, payload: { id: string }) {
    this.djmagService.deleteProducer(payload.id);
    this.socketServer.emit('producers', this.djmagService.getProducersActive());
  }
}
