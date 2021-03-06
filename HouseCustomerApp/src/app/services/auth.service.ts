import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consumer } from '../models/dto/consumer.model';
import { ConsumersApartment } from '../models/dto/consumers-apartment.model';
import { HouseNumber } from '../models/dto/house-number.model';
import { Street } from '../models/dto/street.model';
import { WaterReading } from '../models/dto/water-reading.model';
import { Register } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly apiURL="https://localhost:44345/api";

  constructor(private http:HttpClient) { }

  register(consumer:Consumer){
    return this.http.post(this.apiURL+"/Consumers",consumer);
  }
  login(phoneNumber:string){
    return this.http.get(this.apiURL+`/Consumers/ConsumersByPhoneNumber/${phoneNumber}`);
  }
  getLastHotWaterReadingByApartmentId(apartmentId:number){
    return this.http.get(this.apiURL+`/HotWaterReadings/HotWaterReadingsByApartmentId/${apartmentId}`);
  }
  enterNewHotWaterReading(wr:WaterReading){
    return this.http.post(this.apiURL+"/HotWaterReadings",wr);
  }
  addConsumerApartment(conAp:ConsumersApartment){
    return this.http.post(this.apiURL+"/ConsumersApartments",conAp);
  }
  getApartmentsByConsumerId(consumerId:number){
    return this.http.get(this.apiURL+`/ConsumersApartments/ApartmentsByConsumerId/${consumerId}`);
  }
  checkPhoneNumber(phoneNumber:string){
    return this.http.get(this.apiURL+`/Consumers/PhoneNumberNotTaken/${phoneNumber}`);
  }
  refreshStreets(){
    return this.http.get(this.apiURL+"/AddressesHouses/Streets")
  }
  refreshHouseNumbersFromStreet(st:Street){
    return this.http.post(this.apiURL+"/AddressesHouses/StreetHouses",st);
  }
  refreshApartmentNumbersFromHouseNumber(hn:HouseNumber){
    return this.http.get(`${this.apiURL}/Apartments/HouseApartments/${hn.addressHouseId}`);
  }
}
