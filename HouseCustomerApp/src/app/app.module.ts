import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HouseCustomerPanelComponent } from './house-customer-panel/house-customer-panel.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginFormComponent } from './house-customer-panel/login-form/login-form.component';
import { WaterReadoutFormComponent } from './house-customer-panel/water-readout-form/water-readout-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterFormComponent } from './house-customer-panel/register-form/register-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HouseCustomerPanelComponent,
    AdminPanelComponent,
    LoginFormComponent,
    WaterReadoutFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
