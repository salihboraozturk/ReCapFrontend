import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {
  brands: Brand[] = [];
  colors: Color[] = [];
  currentBrand: number;
  currentColor: number;
  constructor(private carService:CarService, private brandService: BrandService,
    private colorService: ColorService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
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
  getCurrentBrand(brand: Brand) {
    if (brand.brandId == this.currentBrand) {
      return true;
    } else {
      return false;
    }
  }
  getCurrentColor(color: Color) {
    if (color.colorId == this.currentColor) {
      return true;
    } else {
      return false;
    }
  }
  IsCurrentBrandNull() {
    if (this.currentBrand) {
      return true;
    } else {
      return false;
    }
  }
  IsCurrentColorNull() {
    if (this.currentColor) {
      return true;
    } else {
      return false;
    }
  }
  GetRouterLink(){
    if( this.currentBrand && this.currentColor){
      return "/cars/filter/brand/"+this.currentBrand +"/color/" +this.currentColor;
    }
    else if(this.currentBrand){
      return "/cars/filter/brand/" +this.currentBrand;
    }
    else if(this.currentColor){
      return "/cars/filter/color/" +this.currentColor;
    }
    else{
      return "/cars";
    }
  }
}
