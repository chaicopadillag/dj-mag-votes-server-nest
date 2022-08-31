import { v4 as uuid } from 'uuid';

export class Producer {
  id: string;
  votes: number;

  constructor(public name: string) {
    this.id = uuid();
    this.votes = 0;
  }
}
