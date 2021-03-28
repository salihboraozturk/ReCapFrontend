import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { CarImageService } from 'src/app/services/carimage/car-image.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  brands: Brand[];
  colors: Color[];
  imageAddForm: FormGroup;
  imageFile: File;
  carId: number;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private carImageService: CarImageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
    this.createCarImageAddForm();
  }
  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      carName: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  add() {
    if (this.carAddForm.valid) {
      const carModel = Object.assign({}, this.carAddForm.value);
      console.log(carModel);
      this.carService.add(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.messages, 'Başarılı');
          this.carId = response.data.carId;
          this.addImage();
        },
        (responseError) => {
          if (responseError.error.error.length > 0) {
            for (let i = 0; i < responseError.error.error.length; i++) {
              this.toastrService.error(
                responseError.error.error[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Hata');
    }
  }
  createCarImageAddForm() {
    this.imageAddForm = this.formBuilder.group({
      carId: [this.carId],
      file: ['', Validators.required],
    });
  }

  uploadFile(event: any) {
    this.imageFile = event.target.files[0];
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  addImage() {
    if (this.imageAddForm.valid) {
      this.carImageService
        .add(this.carId, this.imageFile)
        .subscribe((response) => {
          this.toastrService.success(response.messages, 'Başarılı');
        });
    }
  }
}
