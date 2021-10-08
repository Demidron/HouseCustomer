import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConsumerService } from '../services/consumer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router,private consumerService:ConsumerService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.consumerService.authorizedConsumer==null){
      this.router.navigate(['/customer/login'])
      return false;
    }
    else 
    {
      this.router.navigate(['/customer/water-readout'])
      return true;
    };
  }
  
}
