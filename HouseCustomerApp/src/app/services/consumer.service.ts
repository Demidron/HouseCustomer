import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertTypes } from '../Enums/alert-types';
import { Apartment } from '../models/dto/apartment.model';
import { Consumer } from '../models/dto/consumer.model';
import { WaterReading } from '../models/dto/water-reading.model';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';
import { WaterReadoutService } from './water-readout.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  private consumerKey:string='consumer';
  public apartments:Apartment[]=[];
  public selectedApartment:Apartment=new Apartment();

  constructor(private authService:AuthService,private toastService:ToastService,private router:Router, private waterReadoutService:WaterReadoutService) {
    if(this.authorizedConsumer){
      this.updateApartments(this.authorizedConsumer.id);
    }
  }

  get authorizedConsumer(): Consumer | null{
    var str=localStorage.getItem(this.consumerKey) ;
    return str? JSON.parse(str) as Consumer : null;
  }
  set authorizedConsumer(consumer:Consumer | null){
    consumer ? localStorage.setItem(this.consumerKey,JSON.stringify(consumer))
    : localStorage.removeItem(this.consumerKey);
  }

  registerConsumer(consumer:Consumer, apartmentId:number){
    this.authService.register(consumer).subscribe((res: any) => {
      let resCon=res as Consumer;
      // if(resCon){
        this.authService.addConsumerApartment({consumerId: resCon.id, apartmentId: apartmentId}).subscribe((resCA:any)=>{
          this.authorizedConsumer=resCon;
          this.router.navigateByUrl('/customer/water-readout');
          this.toastService.addAlert({type: AlertTypes.SUCCESS,message: "Register success"},2000)
          this.updateApartments(resCon.id);
        },
        err => {
          this.toastService.addAlert({type: AlertTypes.DANGER,message: err.message},2000)
        })  
      // }
    },
    err => {
      console.log(err.message);
      this.toastService.addAlert({type: AlertTypes.DANGER,message: err.message},2000)
    })
  }
  loginConsumer(phoneNumber:string){
    this.authService.login(phoneNumber).subscribe((res: any) => {
      // if(res as Consumer){
        let resCon=res as Consumer;
        this.authorizedConsumer=resCon;
        this.router.navigateByUrl('/customer/water-readout');
        this.toastService.addAlert({type: AlertTypes.SUCCESS,message: "Login success"},2000)
        this.updateApartments(resCon.id)
      // }
      // else{
      //   this.toastService.addAlert({type: AlertTypes.DANGER,message: "Consumer not found"},2000)
      // }
    },
    (err) => {
      console.log(err);
      this.toastService.alerts.push({type: AlertTypes.DANGER,message: err.message})
    })
  }
  logoutConsumer(){
    this.authorizedConsumer=null;
    this.waterReadoutService.hotWaterReading=new WaterReading();
    this.selectedApartment=new Apartment();
    this.apartments=[];
    this.router.navigate(['/customer/auth/login'])
  }
  private updateApartments(consumerId:number){
    this.authService.getApartmentsByConsumerId(consumerId).subscribe((res: any) =>{
      let aparts=res as Apartment[];
      this.apartments=aparts;
      this.selectedApartment=aparts[0];
      this.waterReadoutService.updateHotWaterReading(aparts[0].apartmentId)
    },
    err => {
      console.log(err.message);
      this.toastService.addAlert({type: AlertTypes.DANGER,message: err.message},2000)
    })
  }


}
