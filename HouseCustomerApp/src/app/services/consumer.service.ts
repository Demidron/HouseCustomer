import { Injectable } from '@angular/core';
import { Consumer } from '../models/dto/consumer.model';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  authorizedConsumer:Consumer | undefined;
  constructor() { }
}
