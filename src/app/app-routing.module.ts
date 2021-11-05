import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardetaillistComponent } from './components/admin/cardetaillist/cardetaillist.component';
import { UserComponent } from './components/admin/user/user.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/getcars/:carId", component:CarComponent},
  {path:"cars/getimages/:carId", component:CarComponent},
  {path:"cars/details/:carId", component:CarDetailComponent},
  {path:"cars/brand/:brandId/color/:colorId", component:CarComponent},
  {path:"rent/:carId", component:RentalComponent, canActivate:[LoginGuard]},
  {path:"cardetails/payment", component:PaymentComponent, canActivate:[LoginGuard]},
  {path:"customerDetail", component:UserComponent, canActivate:[LoginGuard]},
  {path:"brands/add", component:BrandAddComponent, canActivate:[AdminGuard]},
  {path:"colors/add", component:ColorAddComponent, canActivate:[AdminGuard]},
  {path:"cars/add", component:CarAddComponent, canActivate:[AdminGuard]},
  {path:"adminPanel", component:CardetaillistComponent, canActivate:[AdminGuard]},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
