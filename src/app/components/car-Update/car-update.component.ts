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
  imageUpdateForm:FormGroup;
  car: Car;
  brands: Brand[];
  colors: Color[];
  carId: number;
  carImages: CarImage[];
  apiUrl = 'https://localhost:44393/';
  defaultImage="https://localhost:44393/Images/defaultcar.png";
  imageFile:File;
  currentCarImageId:number;
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
        this.carId = parseInt(params["carId"])
        this.getBrands();
        this.getColors();
        this.getCarDetails(this.carId)
        this.createCarUpdateForm();
        this.createImageUpdateForm();
        this.getCarImagesByCarId();

      }
    });
  }
  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      carId:[this.carId],
      brandId:["",Validators.required],
      carName:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      minFindex:["",Validators.required]
    })
  }
  update(){
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
      this.carUpdateForm.patchValue({
        carName:this.car.carName,
        modelYear:this.car.modelYear,
        description:this.car.description,
        dailyPrice:this.car.dailyPrice,
        minFindex:this.car.minFindex
      })
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
  createImageUpdateForm(){
    this.imageUpdateForm = this.formBuilder.group({
      carId:[this.carId],
      file:["",Validators.required]
    })
  }

  uploadFile(event:any){
    this.imageFile = event.target.files[0]
  }

  getCarImagesByCarId(){
    this.carImageService.getCarImage(this.carId).subscribe(response => {
      this.carImages = response.data;
    })
  }

  updateImage(){

    if (this.imageUpdateForm.valid) {
      this.carImageService.update(this.carId,this.imageFile,this.currentCarImageId).subscribe(response => {
        this.toastrService.success(response.messages,"Başarılı")
      })
    }
  }

  setCurrentCarImageId(image:CarImage){
    this.currentCarImageId = image.id;
  }

  getCurrentImageClass(image:CarImage){
    if (this.currentCarImageId === image.id) {
      return "border border-danger";
    }
    return "";
  }
}
