import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/cardetail/cardetail';
import { Customer } from 'src/app/models/customer/cutomer';
import { Rental } from 'src/app/models/rental/rental';
import { CarService } from 'src/app/services/car/car.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers:[DatePipe]
})
export class RentalComponent implements OnInit {
  cars: CarDetail[]=[];
  rentals: Rental[] = [];
  minDate:string|null;
  maxDate:string|null;
  customers:Customer[];
  dataLoaded=false;
  rentDate:Date;
  returnDate:Date;
  customerId:number;
  carId:number;
  rentable:boolean;
  firstDateSelected:boolean= false;
  rental:Rental = {
    carId:0,
    customerId:0,
   rentDate:new Date(),
   returnDate:new Date()     
  };
  
  constructor(
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private customerService:CustomerService,
    private datePipe:DatePipe,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['carId']){
        this.getCarDetails(params['carId']);
        //this.CheckStatus(params["carId"])
        this.getCustomers();
      }
    })
    this.minDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");
    this.maxDate=this.datePipe.transform(new Date(new Date().setFullYear(new Date().getFullYear() + 1)),"yyyy-MM-dd");
  }
  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
    });
  }
  getCarDetails(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.cars = response.data;
      this.carId=carId;
    });
  }
  addRental(){
    let RentalModel ={
      customerId:this.customerId,
      carId:this.carId,
      rentDate:this.rentDate,
      returnDate:this.returnDate
    };
    this.router.navigate(["cars/rental/payment/",JSON.stringify(RentalModel)]);
  }
  getCustomers(){
    this.customerService.getCustomers().subscribe(response => {
      this.customers=response.data;
    })
  }
  onChangeEvent(event: any){
    this.minDate = event.target.value
    this.firstDateSelected = true
  }
  setCustomerId(customerId:string){
    this.customerId = +customerId
    console.log(this.customerId)
  }
}
