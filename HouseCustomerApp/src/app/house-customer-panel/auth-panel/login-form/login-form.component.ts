import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertTypes } from 'src/app/Enums/alert-types';
import { NamesFields } from 'src/app/Enums/names-fields';
import { Consumer } from 'src/app/models/dto/consumer.model';
import { AuthService } from 'src/app/services/auth.service';
import { ConsumerService } from 'src/app/services/consumer.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: [
  ]
})

export class LoginFormComponent implements OnInit {
  

  constructor(public toastService: ToastService, private router: Router, public authService:AuthService, private consumerService:ConsumerService ) {}

  public exForm: FormGroup =new FormGroup({
    'phoneNumber':new FormControl(
      null,
      [
        Validators.required,
        (ac:AbstractControl)=>{ if(!ac.value||ac.value.length<3){ ac.setValue("380");return null;}return null},
        Validators.minLength(12)
      ]),
  })

  ngOnInit(): void {
    // this.exForm.controls[NamesFields.PHONENUMBER].setAsyncValidators(ValidatePhoneNumberNotTaken.createValidator(this.authService))
  }
  onSubmit(){
    this.consumerService.loginConsumer(this.exForm.value[NamesFields.PHONENUMBER]);
  }

  get phoneNumber() { return this.exForm.get(NamesFields.PHONENUMBER); }
}
