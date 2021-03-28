import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/car-Add/car-add.component';
import { CarUpdateComponent } from './components/car-Update/car-update.component';

import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';
import { AuthService } from './services/auth/auth.service';

const routes: Routes = [
  { path: '', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/brand/:brandId/color/:colorId', component: CarComponent },
  {
    path: 'cars/filter/brand/:brandId/color/:colorId',
    component: CarComponent,
  },
  { path: 'cars/filter/brand/:brandId', component: CarComponent },
  { path: 'cars/filter/color/:colorId', component: CarComponent },
  { path: 'cars/cardetail/:carId', component: CardetailComponent },
  { path: 'rental/:carId', component: RentalComponent,canActivate:[LoginGuard]},
  { path: 'cars/rental/payment/:rental', component: PaymentComponent,canActivate:[LoginGuard] },
  { path: 'cars/add', component: CarAddComponent,canActivate:[LoginGuard]},
  { path: 'cars/update/:carId', component: CarUpdateComponent,canActivate:[LoginGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
