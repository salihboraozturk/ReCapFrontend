import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/cardetail/cardetail';
import { CarImage } from 'src/app/models/carimage/carImage';
import { Color } from 'src/app/models/color/color';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { CarImageService } from 'src/app/services/carimage/car-image.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  imagePath:string;
  filterCar = '';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService:CarImageService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
  
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getCarsByFilter(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.reload();
        this.getCars();
        
      }
    });
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCarsByFilter(brandId: number, colorId: number) {
    this.carService
      .getCarsByFilter(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
      });
  }
  setPreviewImages(cars:CarDetail[]){
    cars.forEach(car => {
      this.carImageService.getCarImage(car.carId).subscribe((response) => {
        car.imagePath = "https://localhost:44393/" + response.data[0].imagePath;
      });
    });
  }
  reload(){
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }
  checkAdmin(){
    return this.authService.checkAdmin();
  }
}
