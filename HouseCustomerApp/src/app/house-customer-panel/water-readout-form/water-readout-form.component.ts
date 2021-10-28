import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDatepicker, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { ConsumerService } from 'src/app/services/consumer.service';
import { WaterReadoutService } from 'src/app/services/water-readout.service';
import { ValidateWaterReading } from 'src/app/validators/water-reading-not-less.validator';

@Component({
  selector: 'app-water-readout-form',
  templateUrl: './water-readout-form.component.html',
  styleUrls: ['./water-readout-form.component.css']
})
export class WaterReadoutFormComponent implements OnInit {

  // private date=new Date();
  private monthNames:string[] = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  public currentMonth:string ="";
  public waterForm: FormGroup =new FormGroup({
    // FormControl({value: 'Nancy', disabled: true}, Validators.required)
    'hotWaterReading':new FormControl(
     null, // {value: '', disabled:this.waterReadoutService.hotWaterReading.currentReadingsDate.getMonth>=new Date().getMonth}
      [
        
        (ac:AbstractControl)=>{ 
          let str=ac.value as string;
          if(str&&str.length!=6)
          {
            str=('000000' + str).slice(-6)
            ac.setValue(str);
          }
          return null;
        },
        ValidateWaterReading.createValidator(this.waterReadoutService),
        Validators.required,
        // NonZero.validate
      ]),
  })
 
  // @ViewChild(NgbDatepicker, {static: true}) datepicker: NgbDatepicker;

  constructor(public i18n: NgbDatepickerI18n,public waterReadoutService:WaterReadoutService,public consumerService:ConsumerService) {}

  ngOnInit(): void {
    this.currentMonth=this.monthNames[new Date().getMonth()];
  }
  get diff() { return this.waterReadoutService.hotWaterReading.lastReadings? parseInt(this.waterForm.value["hotWaterReading"])-this.waterReadoutService.hotWaterReading.currentReadings : ""}

 inputHotWaterIsActive() {return this.waterReadoutService.hotWaterReading.currentReadingsDate.getMonth==new Date().getMonth}
  get hotWaterReading(){return this.waterForm.controls["hotWaterReading"]}

  onSubmit(){

    if(this.consumerService.authorizedConsumer){
      this.waterReadoutService.saveNewHotWaterReading({
        apartmentId:this.consumerService.apartments[0].apartmentId,
        consumerWriterId:this.consumerService.authorizedConsumer?.id,
        lastReadings:this.waterReadoutService.hotWaterReading.currentReadings,
        lastReadingsDate:this.waterReadoutService.hotWaterReading.currentReadingsDate,
        currentReadings:parseInt(this.waterForm.value["hotWaterReading"]),
        currentReadingsDate:new Date()
      })
    }
  }
}
