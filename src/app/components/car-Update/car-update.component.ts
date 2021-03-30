import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { CarImage } from 'src/app/models/carimage/carImage';
import { Color } from 'src/app/models/color/color';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car/car.service';
import { BrandService } from 'src/app/services/brand/brand.service';
import { ColorService } from 'src/app/services/color/color.service';
import { CarImageService } from 'src/app/services/carimage/car-image.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  car: Car;
  brands: Brand[];
  colors: Color[];
  carId: number;
  carImages: CarImage[];
  apiUrl = 'https://localhost:44373/images/';
  defaultImage="https://localhost:44393/Images\defaultcar.png"
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = parseInt(params['carId']);
        this.getCarDetails(this.carId);
        this.getBrands();
        this.getColors();
        this.createCarUpdateForm();
      }
    });
  }
  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      carId:[this.carId],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
    })
  }
  update(){
    console.log(this.carUpdateForm)
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({},this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(response => {
        this.toastrService.success(response.messages,"Başarılı")
      },responseError => {
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama hatası");
          }
        }
      })
    }else{
      this.toastrService.error("Form bilgileri hatalı","Hata")
    }
  }
  getCarDetails(carId:number){
    this.carService.getCarDetailsById(carId).subscribe(response => {
      this.car = response.data;
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands=response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors=response.data;
    })
  }
}
