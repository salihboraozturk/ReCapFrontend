import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ColorComponent } from './components/color/color.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandPipePipe } from './pipes/brand/brand-pipe.pipe';
import { CarPipePipe } from './pipes/car/car-pipe.pipe';
import { ColorPipePipe } from './pipes/color/color-pipe.pipe';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CarFilterComponent } from './components/car-filter/car-filter/car-filter.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car-Add/car-add/car-add.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    CardetailComponent,
    BrandPipePipe,
    CarPipePipe,
    ColorPipePipe,
    CarFilterComponent,
    PaymentComponent,
    CarAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
