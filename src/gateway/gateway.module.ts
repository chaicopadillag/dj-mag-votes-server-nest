import { Module } from '@nestjs/common';
import { DjMagVotesGateway } from './dj-mag-votes.gateway';
import { DjMagVotesService } from './dj-mag-votes.service';
import { ListProducer } from './models/list-producer.model';
import { Producer } from './models/producer.model';

@Module({
  providers: [DjMagVotesGateway, DjMagVotesService, ListProducer, Producer],
})
export class GatewayModule {}
