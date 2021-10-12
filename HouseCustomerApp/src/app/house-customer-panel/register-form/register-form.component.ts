import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApartmentNumber } from 'src/app/models/dto/apartment-number.model';
import { HouseNumber } from 'src/app/models/dto/house-number.model';
import { Street } from 'src/app/models/dto/street.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styles: [
  ]
})
export class RegisterFormComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    this.authService.refreshStreets();
  }

  onSubmit(form:NgForm){
  }
  onChangeStreet(obj:Street){
    this.authService.refreshHouseNumbersFromStreet(obj);
    this.authService.formDataRegister.selectedStreet =obj;
  }
  onChangeHouseNumber(obj:HouseNumber){
    this.authService.refreshApartmentNumbersFromHouseNumber(obj);
    this.authService.formDataRegister.selectedHouseNumber =obj;
  }
  onChangeApartmentNumber(obj:ApartmentNumber){
    this.authService.formDataRegister.selectedApartmentNumber =obj;
  }
}
