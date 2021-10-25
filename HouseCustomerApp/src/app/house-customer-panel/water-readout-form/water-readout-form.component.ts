import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { NgbDatepicker, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-water-readout-form',
  templateUrl: './water-readout-form.component.html',
  styleUrls: ['./water-readout-form.component.css']
})
export class WaterReadoutFormComponent implements OnInit {

  private monthNames:string[] = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  public currentMonth:string ="";
  coldWaterReading=new FormControl(
    // null,
    // [
    //   // Validators.required,
    //   (ac:AbstractControl)=>{ ac.value; 
    //     var str="";
    //     for (let index = 0; index < ac.value.length; index++) {
    //       if(ac.value[index]!="0") console.log(str+=ac.value[index]);
    //     }
    //     return null;
    //   },
    //   Validators.minLength(6),
    //   // Validators.maxLength(12)
    //   // NonZero.validate
    // ]
  );
  // @ViewChild(NgbDatepicker, {static: true}) datepicker: NgbDatepicker;

  constructor(public i18n: NgbDatepickerI18n) {}

  ngOnInit(): void {
    const d = new Date();
    this.currentMonth=this.monthNames[d.getMonth()]
  }
  
 
}
