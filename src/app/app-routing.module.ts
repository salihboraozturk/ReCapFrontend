import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/car-Add/car-add/car-add.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:'',component:CarComponent},
  {path: 'cars', component: CarComponent },
  {path: 'cars/brand/:brandId', component: CarComponent },
  {path: 'cars/color/:colorId', component: CarComponent },
  {path: 'cars/brand/:brandId/color/:colorId', component: CarComponent },
  {path:'cars/filter/brand/:brandId/color/:colorId',component:CarComponent},
  {path:'cars/filter/brand/:brandId',component:CarComponent},
  {path:'cars/filter/color/:colorId',component:CarComponent},
  {path: 'cars/cardetail/:carId', component: CardetailComponent },
  {path: 'rental/:carId', component: RentalComponent },
  {path:"cars/rental/payment/:rental",component:PaymentComponent},
  {path:"carAdd",component:CarAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
