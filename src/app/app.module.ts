import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { ColorPipePipe } from './pipes/color-pipe.pipe';
import { BrandPipePipe } from './pipes/brand-pipe.pipe';
import { CardetailPipePipe } from './pipes/cardetail-pipe.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CardetaillistComponent } from './components/admin/cardetaillist/cardetaillist.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { JwtModule } from '@auth0/angular-jwt';
import { UserComponent } from './components/admin/user/user.component';
import { InformationComponent } from './components/information/information.component';
import { ImageAddComponent } from './components/image-add/image-add.component';
import { FooterComponent } from './components/footer/footer.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { CardAddComponent } from './components/card-add/card-add.component';
import { MainComponent } from './components/admin/main/main.component';
import { BrandListComponent } from './components/admin/brand-list/brand-list.component';
import { ColorListComponent } from './components/admin/color-list/color-list.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { RentalListComponent } from './components/admin/rental-list/rental-list.component';



export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    NaviComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CarDetailComponent,
    ColorPipePipe,
    BrandPipePipe,
    CardetailPipePipe,
    PaymentComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    CardetaillistComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    InformationComponent,
    ImageAddComponent,
    FooterComponent,
    UpdateUserComponent,
    UpdatePasswordComponent,
    CardAddComponent,
    MainComponent,
    BrandListComponent,
    ColorListComponent,
    UserListComponent,
    RentalListComponent,
  ],
  imports: [
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:4200/"]
      },
    }),
  ],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
