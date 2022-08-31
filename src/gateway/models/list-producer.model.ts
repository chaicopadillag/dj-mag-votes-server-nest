import { Producer } from './producer.model';

export class ListProducer {
  private _producers: Producer[];

  constructor() {
    this._producers = [
      new Producer('Armin van Burren'),
      new Producer('Chartte de Witte'),
      new Producer('Martin Garrix'),
      new Producer('Nervo'),
      new Producer('Avicii'),
      new Producer('Mandy'),
      new Producer('Alan Walker'),
    ];
  }

  addProducer(producer: Producer) {
    this._producers.push(producer);
  }

  get producers() {
    return this._producers;
  }

  deleteProducer(id: string) {
    this._producers = this._producers.filter((producer) => producer.id !== id);
  }
  voteProducer(id: string) {
    this._producers = this._producers.map((producer) =>
      producer.id === id
        ? { ...producer, votes: producer.votes + 1 }
        : producer,
    );
  }
}
