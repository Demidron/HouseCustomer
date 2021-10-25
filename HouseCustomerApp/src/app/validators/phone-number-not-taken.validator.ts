import { AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

export class ValidatePhoneNumberNotTaken {
  static createValidator(authService: AuthService) {
    return (control: AbstractControl) => {
      return authService.checkPhoneNumber(control.value).toPromise().then(res => {
        return res ? {phoneNumberTaken: true} : null;
      });
    }
  }
}