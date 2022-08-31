import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandListComponent } from './components/admin/brand-list/brand-list.component';
import { CardetaillistComponent } from './components/admin/cardetaillist/cardetaillist.component';
import { ColorListComponent } from './components/admin/color-list/color-list.component';
import { MainComponent } from './components/admin/main/main.component';
import { RentalListComponent } from './components/admin/rental-list/rental-list.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { UserComponent } from './components/admin/user/user.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ImageAddComponent } from './components/image-add/image-add.component';
import { InformationComponent } from './components/information/information.component';
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
  {path:"image/add", component:ImageAddComponent, canActivate:[AdminGuard]},
  {path:"adminPanel", component:MainComponent, canActivate:[AdminGuard]},
  {path:"cardetaillist", component:CardetaillistComponent, canActivate:[AdminGuard]},
  {path:"colorlist",component:ColorListComponent, canActivate:[AdminGuard]},
  {path:"brandlist",component:BrandListComponent, canActivate:[AdminGuard]},
  {path:"userlist",component:UserListComponent, canActivate:[AdminGuard]},
  {path:"rentallist", component:RentalListComponent, canActivate:[AdminGuard]},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"aboutUs", component:InformationComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
