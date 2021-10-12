import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApartmentNumber } from '../models/dto/apartment-number.model';
import { Consumer } from '../models/dto/consumer.model';
import { HouseNumber } from '../models/dto/house-number.model';
import { Street } from '../models/dto/street.model';
import { Register } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly addressesHousesURL="https://localhost:44345/api/AddressesHouses";
  readonly apartmentsURL="https://localhost:44345/api/Apartments";
  formDataRegister:Register=new Register();
  consumerRegistered:Consumer=new Consumer();

  constructor(private http:HttpClient) { }

  refreshStreets(){
    this.http.get(this.addressesHousesURL+"/Streets")
    .toPromise()
    .then(res=>this.formDataRegister.streets=res as Street[]);
  }
  refreshHouseNumbersFromStreet(st:Street){
    this.http.post(this.addressesHousesURL+"/StreetHouses",st)
    .toPromise()
    .then(res=>this.formDataRegister.houseNumbers=res as HouseNumber[]);
  }
  refreshApartmentNumbersFromHouseNumber(hn:HouseNumber){
    this.http.get(`${this.apartmentsURL}/HouseApartments/${hn.addressHouseId}`)
    .toPromise()
    .then(res=>this.formDataRegister.apartmentNumbers=res as ApartmentNumber[]);
  }
}
