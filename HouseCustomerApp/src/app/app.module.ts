import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HouseCustomerPanelComponent } from './house-customer-panel/house-customer-panel.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginFormComponent } from './house-customer-panel/auth-panel/login-form/login-form.component';
import { WaterReadoutFormComponent } from './house-customer-panel/water-readout-form/water-readout-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterFormComponent } from './house-customer-panel/auth-panel/register-form/register-form.component';
import { AuthPanelComponent } from './house-customer-panel/auth-panel/auth-panel.component';
import { LoginToastComponent } from './toasts/login-toast/login-toast.component';
import { ValidStatusDirective } from './directives/valid-status.directive';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    HouseCustomerPanelComponent,
    AdminPanelComponent,
    LoginFormComponent,
    WaterReadoutFormComponent,
    RegisterFormComponent,
    AuthPanelComponent,
    LoginToastComponent,
    ValidStatusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
