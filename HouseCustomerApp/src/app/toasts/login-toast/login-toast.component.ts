import { Component, TemplateRef } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login-toast',
  templateUrl: './login-toast.component.html',
  styleUrls: ['./login-toast.component.css'],
  host: { '[class.ngb-toasts]': 'true' },
})
export class LoginToastComponent {

  constructor(public toastService: ToastService) {}

  isTemplate(toast:any) {
    return toast.textOrTpl instanceof TemplateRef;
  }

}
