import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertTypes } from 'src/app/Enums/alert-types';
import { NamesFields } from 'src/app/Enums/names-fields';
import { Consumer } from 'src/app/models/dto/consumer.model';
import { AuthService } from 'src/app/services/auth.service';
import { ConsumerService } from 'src/app/services/consumer.service';
import { ToastService } from 'src/app/services/toast.service';
import { ValidatePhoneNumberNotTaken } from 'src/app/validators/phone-number-not-taken.validator';
// import { WaterReadoutFormComponent } from '../../water-readout-form/water-readout-form.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: [
  ]
})

export class LoginFormComponent implements OnInit {
  

  constructor(public toastService: ToastService, private router: Router, public authService:AuthService, private consumerService:ConsumerService ) {

   }
  public exForm: FormGroup =new FormGroup({
    'phoneNumber':new FormControl(
      null,
      [
        Validators.required,
        (ac:AbstractControl)=>{ if(!ac.value||ac.value.length<3){ ac.setValue("380");return null;}return null},
        Validators.minLength(12),
        // Validators.maxLength(12)
        // NonZero.validate
      ]),
  })

  ngOnInit(): void {
    // this.exForm.controls[NamesFields.PHONENUMBER].setAsyncValidators(ValidatePhoneNumberNotTaken.createValidator(this.authService))
  }
  onSubmit(){
    this.authService.login(this.exForm.value[NamesFields.PHONENUMBER]).subscribe((res: any) => {
      if((res as Consumer[]).length>0){
        this.consumerService.authorizedConsumer=res[0];
        this.router.navigateByUrl('/customer/water-readout');
        this.toastService.addAlert({type: AlertTypes.SUCCESS,message: "Login success"},2000)
      }
      else{
        this.toastService.addAlert({type: AlertTypes.DANGER,message: "Consumer not found"},2000)
      }
    },
    (err) => {
      console.log(err);
      this.toastService.alerts.push({type: AlertTypes.DANGER,message: err.message})
    })

    
    // this.toastService.alerts.push({type: 'success',message: 'Login success'})
    // this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
  }
  //  validation(ac:AbstractControl){
  //   if(ac.value.length==12){
  //     this.authService.checkPhoneNumber(ac.value).subscribe((res: any) => {
  //         if (res.success) {
  //           console.log(res);
  //         } 
  //       },
  //       (err: string) => {
  //         this.toastService.alerts.push({type: 'success',message: err})
  //       })
  //   }

  //   return null
  
  // }
  get phoneNumber() { return this.exForm.get('phoneNumber'); }
}
