import { Injectable } from '@angular/core';
import { AlertTypes } from '../Enums/alert-types';
import { WaterReading } from '../models/dto/water-reading.model';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class WaterReadoutService {

  public hotWaterReading:WaterReading=new WaterReading();
  public coldWaterReading:WaterReading=new WaterReading();
  constructor(private authService:AuthService,private toastService:ToastService) { }

  saveNewHotWaterReading(wr:WaterReading){ 
    this.authService.enterNewHotWaterReading(wr).subscribe(res=>{
      this.hotWaterReading=res as WaterReading;
      this.toastService.showToast('Readings entered', { classname: 'bg-success text-light', delay: 10000 });
    },err=>{
      console.log(err.message);
      
    })
  }
  saveNewColdWaterReading(wr:WaterReading){
  
  }
  public updateHotWaterReading(apartmentId:number){
    this.authService.getLastHotWaterReadingByApartmentId(apartmentId).subscribe((res: any) =>{
      console.log(res);
      this.hotWaterReading=res as WaterReading;
    },
    err => {
      console.log(err.message);
      this.toastService.addAlert({type: AlertTypes.DANGER,message: err.message},2000)
    })
  }
}
