import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { BrandeditComponent } from './components/brandedit/brandedit.component';
import { CarAddComponent } from './components/car-Add/car-add.component';
import { CarUpdateComponent } from './components/car-Update/car-update.component';

import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CardsComponent } from './components/cards/cards.component';
import { ColoreditComponent } from './components/coloredit/coloredit.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { AuthService } from './services/auth/auth.service';
import { CardService } from './services/card/card.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
  {
    path: 'rental/:carId',
    component: RentalComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cars/rental/payment/:rental',
    component: PaymentComponent,
    canActivate: [LoginGuard],
  },
  { path: 'cars/add', component: CarAddComponent, canActivate: [LoginGuard,AdminGuard] },
  {
    path: 'cars/update/:carId',
    component: CarUpdateComponent,
    canActivate: [LoginGuard,AdminGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'cards', component: CardsComponent, canActivate: [LoginGuard] },
  { path: 'home', component: HomeComponent },
  {path:'coloredit',component:ColoreditComponent, canActivate: [LoginGuard,AdminGuard]},
  {path:'brandedit',component:BrandeditComponent, canActivate: [LoginGuard,AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
