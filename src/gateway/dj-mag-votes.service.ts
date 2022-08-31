import { Injectable } from '@nestjs/common';
import { ListProducer } from './models/list-producer.model';
import { Producer } from './models/producer.model';

@Injectable()
export class DjMagVotesService {
  constructor(private readonly listProducer: ListProducer) {}

  getProducersActive() {
    return this.listProducer.producers;
  }

  voteProducer(id: string) {
    this.listProducer.voteProducer(id);
  }

  addProducer(name: string) {
    this.listProducer.addProducer(new Producer(name));
  }
  deleteProducer(id: string) {
    this.listProducer.deleteProducer(id);
  }
}
