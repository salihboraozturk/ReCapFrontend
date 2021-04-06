import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car/car';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
cars:Car[]=[];
car:Car;
  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getCar();
  }
getCar(){
  this.carService.getCars().subscribe(response=>{
  this.cars[0]=response.data[0];
  this.cars[1]=response.data[1];
  this.cars[2]=response.data[2];
  })
}
}
