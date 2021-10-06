import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HouseCustomerPanelComponent } from './house-customer-panel/house-customer-panel.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginFormComponent } from './house-customer-panel/login-form/login-form.component';
import { WaterReadoutFormComponent } from './house-customer-panel/water-readout-form/water-readout-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HouseCustomerPanelComponent,
    AdminPanelComponent,
    LoginFormComponent,
    WaterReadoutFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
