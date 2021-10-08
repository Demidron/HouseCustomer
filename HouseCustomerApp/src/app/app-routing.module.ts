import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guargs/auth.guard';
import { HouseCustomerPanelComponent } from './house-customer-panel/house-customer-panel.component';
import { LoginFormComponent } from './house-customer-panel/login-form/login-form.component';
import { RegisterFormComponent } from './house-customer-panel/register-form/register-form.component';
import { WaterReadoutFormComponent } from './house-customer-panel/water-readout-form/water-readout-form.component';

const routes: Routes = [
  {path:'',redirectTo:'customer/water-readout',pathMatch:'full'},
  {path:'customer',redirectTo:'customer/water-readout',pathMatch:'full'},
  {
    path:'customer',component:HouseCustomerPanelComponent,
    children:[
      {path:'login', component:LoginFormComponent},
      {path:'register', component:RegisterFormComponent},    
      {path:'water-readout', component:WaterReadoutFormComponent,canActivate:[AuthGuard]}
    ]
  },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
