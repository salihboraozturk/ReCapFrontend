import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/cardetail/cardetail';
import { Customer } from 'src/app/models/customer/cutomer';
import { Rental } from 'src/app/models/rental/rental';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CarService } from 'src/app/services/car/car.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RentalService } from 'src/app/services/rental/rental.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers: [DatePipe],
})
export class RentalComponent implements OnInit {
  car: CarDetail;
  rentals: Rental[] = [];
  minDate: string | null;
  maxDate: string | null;
  customers: Customer[];
  dataLoaded = false;
  rentDate: Date;
  returnDate: Date;
  customerId: number;
  carId: number;
  rentable: boolean;
  userFindex: number;
  amount:number;
  rental: Rental = {
    carId: 0,
    customerId: 0,
    rentDate: new Date(),
    returnDate: new Date(),
  };

  constructor(
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private customerService: CustomerService,
    private userService: UserService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
        this.getUserDetail();
        //this.CheckStatus(params["carId"])
        this.getCustomers();
      }
    });
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
  }
  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
    });
  }
  getCarDetails(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.car = response.data;
    });
  }
  addRental() {
    let RentalModel = {
      customerId: this.customerId,
      carId: this.car.carId,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
    };
    this.router.navigate(['cars/rental/payment/',JSON.stringify(RentalModel),{amount:this.amount}]);
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }
  amountToBePaid(): number {
    if (this.rentDate && this.returnDate) {
      let returnDate = new Date(this.returnDate.toString());
      let rentDate = new Date(this.rentDate.toString());
      let endDay = +returnDate.getDate().toString();
      let endMonth = +returnDate.getMonth().toString();
      let endYear = +returnDate.getFullYear().toString();
      let startDay = +rentDate.getDate().toString();
      let startMonth = +rentDate.getMonth().toString();
      let startYear = +rentDate.getFullYear().toString();
      let result =
        (endDay -
          startDay +
          (endMonth - startMonth) * 30 +
          (endYear - startYear) * 365 +
          1) *
        this.car.dailyPrice;
      if (result > 0) {
        this.amount=result;
        return result;
      }
    }
    return 0;
  }
  checkdate() {
    if (this.rentDate > this.returnDate) {
      this.returnDate = this.rentDate;
    }
  }
  setCustomerId(customerId: string) {
    this.customerId = +customerId;
  }
  getUserDetail() {
    this.userService
      .getUserById(this.authService.getUserId())
      .subscribe((response) => {
        this.userFindex = response.data.findex;
      });
  }
}
