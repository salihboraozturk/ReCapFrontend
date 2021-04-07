import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { ColorComponent } from './components/color/color.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandPipePipe } from './pipes/brand/brand-pipe.pipe';
import { CarPipePipe } from './pipes/car/car-pipe.pipe';
import { ColorPipePipe } from './pipes/color/color-pipe.pipe';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { PaymentComponent } from './components/payment/payment.component';

import { from } from 'rxjs';
import { CarAddComponent } from './components/car-Add/car-add.component';
import { CarUpdateComponent } from './components/car-Update/car-update.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CardsComponent } from './components/cards/cards.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ColoreditComponent } from './components/coloredit/coloredit.component';
import { BrandeditComponent } from './components/brandedit/brandedit.component';


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
    CarUpdateComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ChangePasswordComponent,
    CardsComponent,
    FooterComponent,
    HomeComponent,
    ColoreditComponent,
    BrandeditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
