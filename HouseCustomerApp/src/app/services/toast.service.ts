import { Injectable, TemplateRef } from '@angular/core';

interface Alert {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];
  alerts: Alert[]=[];
  constructor() {
    
  }
  showToast(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }
  addAlert(alert:Alert, delay?:number){
    this.alerts.push(alert);
    if(delay)
      setTimeout(() => this.closeAlert(alert), delay);
  }
  closeAlert(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
  removeToast(toast:any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

}
