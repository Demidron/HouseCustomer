import { Injectable } from '@angular/core';
import { Consumer } from '../models/dto/consumer.model';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  private consumerKey:string='consumer';
  constructor() { }

  get authorizedConsumer(): Consumer | null{
    var str=localStorage.getItem(this.consumerKey) ;
    return str? JSON.parse(str) as Consumer : null;
  }
  set authorizedConsumer(consumer:Consumer | null){
    consumer ? localStorage.setItem(this.consumerKey,JSON.stringify(consumer))
    : localStorage.removeItem(this.consumerKey);
   
  }
}
