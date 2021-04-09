import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { CarDetail } from 'src/app/models/cardetail/cardetail';
import { CarImage } from 'src/app/models/carimage/carImage';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CarService } from 'src/app/services/car/car.service';
import { CarImageService } from 'src/app/services/carimage/car-image.service';
import { UserService } from 'src/app/services/user/user.service';

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
  carId:number;
  userFindex:number;
  apiUrl = "https://localhost:44393";
  constructor(
    private carImageService: CarImageService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private userService:UserService,
    private authService:AuthService,
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
      this.car = response.data;
      this.rentable=response.data.status;
      this.carId=response.data.carId;
    
    });
  }


  getCurrentImageClass(image:CarImage){
    if (image == this.carImages[0]) {
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }

  getButtonClass(image:CarImage){
    if (image == this.carImages[0]) {
      return "active"
    } else {
      return ""
    }
  }
}
