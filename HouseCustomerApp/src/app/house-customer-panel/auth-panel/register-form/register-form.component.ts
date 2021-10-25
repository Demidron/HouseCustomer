import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Apartment } from 'src/app/models/dto/apartment.model';
import { Consumer } from 'src/app/models/dto/consumer.model';
import { HouseNumber } from 'src/app/models/dto/house-number.model';
import { Street } from 'src/app/models/dto/street.model';
import { Register } from 'src/app/models/register.model';
import { AuthService } from 'src/app/services/auth.service';
import { NamesFields } from "src/app/Enums/names-fields";
import { ValidatePhoneNumberNotTaken } from 'src/app/validators/phone-number-not-taken.validator';
import { ConsumerService } from 'src/app/services/consumer.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { AlertTypes } from 'src/app/Enums/alert-types';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styles: [
  ]
})

export class RegisterFormComponent implements OnInit {
  
  public regForm =this.createForm();
  public formDataRegister:Register=new Register();
  constructor(private authService:AuthService, private fb:FormBuilder, private consumerService:ConsumerService, private router:Router,private toastService:ToastService) { }

  get checkSelectors():boolean {return this.regForm.controls[NamesFields.SELECTEDSTREET].enabled 
    && this.regForm.controls[NamesFields.SELECTEDHOUSENUMBER].enabled
    && this.regForm.controls[NamesFields.SELECTEDAPARTMENTNUMBER].enabled;
  }
  public get namesFields(): typeof NamesFields {
    return NamesFields; 
  }
  get phoneNumber() { return this.regForm.get(NamesFields.PHONENUMBER); }
  get inputSurname() { return this.regForm.get(NamesFields.LASTNAME); }
  get inputName() { return this.regForm.get(NamesFields.NAME); }
  get inputPatronymic() { return this.regForm.get(NamesFields.PATRONYMIC); }
  get selectedStreet() { return this.regForm.get(NamesFields.SELECTEDSTREET); }
  get selectedHouseNumber() { return this.regForm.get(NamesFields.SELECTEDHOUSENUMBER); }
  get selectedApartmentNumber() { return this.regForm.get(NamesFields.SELECTEDAPARTMENTNUMBER); }
  
  ngOnInit(): void {
    
    this.authService.refreshStreets()
    .toPromise()
    .then(res=>this.formDataRegister.streets=res as Street[]);

    this.addSubscribers();
    this.regForm.controls[NamesFields.PHONENUMBER].setAsyncValidators(ValidatePhoneNumberNotTaken.createValidator(this.authService))
  }

  onSubmit(){ 
    this.authService.register({
      id:0,

      name:this.regForm.value[NamesFields.NAME],
      lastName:this.regForm.value[NamesFields.LASTNAME],
      patronymic:this.regForm.value[NamesFields.PATRONYMIC],
      phoneNumber:this.regForm.value[NamesFields.PHONENUMBER]
    }).subscribe((res: any) => {
      let resCon=res as Consumer;
      if(resCon){
        this.authService.addConsumerApartment({consumerId: resCon.id, apartmentId: this.regForm.value[NamesFields.SELECTEDAPARTMENTNUMBER].apartmentId}).subscribe((resCA:any)=>{
          this.consumerService.authorizedConsumer=resCon;
          this.router.navigateByUrl('/customer/water-readout');
          this.toastService.addAlert({type: AlertTypes.SUCCESS,message: "Register success"},2000)
          },
          err => {
            this.toastService.addAlert({type: AlertTypes.DANGER,message: err.message},2000)
          }
        )  
      }
    },
    err => {
      this.toastService.addAlert({type: AlertTypes.DANGER,message: err.message},2000)
    })
  }

  createForm():FormGroup{
    return this.fb.group({
      [NamesFields.PHONENUMBER]: ['', [
        Validators.required,
        (ac:AbstractControl)=>{ if(!ac.value||ac.value.length<3){ ac.setValue("380");return null;}return null},
        Validators.minLength(12),
        Validators.maxLength(12)
      ]],
      [NamesFields.SELECTEDSTREET]: ['',Validators.required],
      [NamesFields.SELECTEDHOUSENUMBER]: [{value:'',disabled: true},Validators.required],
      [NamesFields.SELECTEDAPARTMENTNUMBER]:[{value:'',disabled: true},Validators.required,],
      [NamesFields.LASTNAME]:['',Validators.required],
      [NamesFields.NAME]:['',Validators.required],
      [NamesFields.PATRONYMIC]:['',Validators.required]
    });
  }
  houseNumUpdate(res:HouseNumber[]){
    this.formDataRegister.houseNumbers=res;
    var shn =this.regForm.controls["selectedHouseNumber"]
    shn.setValue(undefined);
    this.formDataRegister.houseNumbers.length>0 ? shn.enable() : shn.disable()
  }
  apartmentNumUpdate(res:Apartment[]){
    this.formDataRegister.apartmentNumbers=res;
    var san =this.regForm.controls["selectedApartmentNumber"];
    san.setValue(undefined);
    this.formDataRegister.apartmentNumbers.length>0 ? san.enable() : san.disable();
  }

  addSubscribers(){
    this.regForm.controls["selectedStreet"].valueChanges.subscribe((obj:Street)=>{
      this.authService.refreshHouseNumbersFromStreet(obj).toPromise()
      .then(res=>{
        this.houseNumUpdate(res as HouseNumber[])
        this.apartmentNumUpdate([]);
      });
    });
    this.regForm.controls["selectedHouseNumber"].valueChanges.subscribe((obj:HouseNumber)=>{
      if(obj){
        this.authService.refreshApartmentNumbersFromHouseNumber(obj)
        .toPromise()
        .then(res=>{
          this.apartmentNumUpdate(res as Apartment[]);
        });
      }
    })
  }
}
