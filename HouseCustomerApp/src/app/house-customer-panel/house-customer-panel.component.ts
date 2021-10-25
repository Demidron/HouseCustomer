import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumerService } from '../services/consumer.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-house-customer-panel',
  templateUrl: './house-customer-panel.component.html',
  styleUrls: ['./house-customer-panel.component.css']
})
export class HouseCustomerPanelComponent implements OnInit {

  constructor(public toastService:ToastService, public consumerService:ConsumerService,private router: Router) { }

  get isLogin():boolean {return this.consumerService.authorizedConsumer? true : false;}
  ngOnInit(): void {
    // this.toastService.alerts
  }
  onExit(){
    this.consumerService.authorizedConsumer=null;
    this.router.navigate(['/customer/auth/login'])
  }
}
