import { Injectable } from '@angular/core';
import { ConsumerModel } from '../models/consumer.model';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  authorizedConsumer:ConsumerModel | undefined;
  constructor() { }
}
