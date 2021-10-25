import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './guargs/auth.guard';
import { AuthPanelComponent } from './house-customer-panel/auth-panel/auth-panel.component';
import { HouseCustomerPanelComponent } from './house-customer-panel/house-customer-panel.component';
import { LoginFormComponent } from './house-customer-panel/auth-panel/login-form/login-form.component';
import { RegisterFormComponent } from './house-customer-panel/auth-panel/register-form/register-form.component';
import { WaterReadoutFormComponent } from './house-customer-panel/water-readout-form/water-readout-form.component';

const routes: Routes = [
  {path:'',redirectTo:'customer/water-readout',pathMatch:'full'},
  {path:'customer',redirectTo:'customer/water-readout',pathMatch:'full'},
  {path:'customer/auth',redirectTo:'customer/auth/login',pathMatch:'full'},
  {
    path:'customer',component:HouseCustomerPanelComponent,
    children:[
      {
        path:'auth',component:AuthPanelComponent,
        children:[
          {path:'login', component:LoginFormComponent},
          {path:'register', component:RegisterFormComponent}
        ]
      },
      {path:'water-readout', component:WaterReadoutFormComponent,canActivate:[AuthGuard]},//,canActivate:[AuthGuard]
    ]
  
  },
 
  {path:'admin',component:AdminPanelComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
