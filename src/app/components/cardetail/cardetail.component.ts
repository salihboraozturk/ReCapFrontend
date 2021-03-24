import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetail } from 'src/app/models/cardetail/cardetail';
import { CarImage } from 'src/app/models/carimage/carImage';
import { CarService } from 'src/app/services/car/car.service';
import { CarImageService } from 'src/app/services/carimage/car-image.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css'],
})
export class CardetailComponent implements OnInit {
  carImages: CarImage[] = [];
  carDetail: CarDetail[] = [];
  car: CarDetail;
  rentable:boolean;
  imageUrl = "https://localhost:44393";
  constructor(
    private carImageService: CarImageService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarsByImage(params['carId']);
        this.getCarDetailsById(params['carId']);
      }
    });
  }
  getCarsByImage(carId: number) {
    this.carImageService.getCarImage(carId).subscribe((response) => {
      this.carImages = response.data;

    });
  }
  getCarDetailsById(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.car = response.data[0];
      this.rentable=response.data[0].status
    });
  }

  
}
