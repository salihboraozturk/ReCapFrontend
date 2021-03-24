import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
carAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private carService:CarService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createCarAddForm();
  }
createCarAddForm(){
  this.carAddForm=this.formBuilder.group({
    brandId:["",Validators.required],
    colorId:["",Validators.required],
    modelYear:["",Validators.required],
    dailyPrice:["",Validators.required],
    carName:["",Validators.required],
    description:["",Validators.required]
 })
}
add(){
  if (this.carAddForm.valid) {
    
    let carModel = Object.assign({},this.carAddForm.value)
    this.carService.add(carModel).subscribe(response => {
      this.toastrService.success(response.messages,"Başarılı")
    },responseError => {
      if (responseError.error.ValidationErrors.length>0) {
        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama hatası");
        }
      }
    })
  }else{
    this.toastrService.error("Formunuz eksik","Hata");
  }
}
}
