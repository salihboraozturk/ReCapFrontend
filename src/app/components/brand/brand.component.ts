import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BrandService } from 'src/app/services/brand/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: Brand;
  clearBrand: Brand;
  filterBrand = '';
  constructor(
    private brandService: BrandService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getBrands();
  this.checkAdmin();
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  setCurrentBrands(brand: Brand) {
    this.currentBrand = brand;
  }
  getCurrentStyle(brand: Brand) {
    if (this.currentBrand == brand) {
      return 'background-color:#f5ca29;';
    } else {
      return 'background-color: #3f3f3f; color:white;';
    }
  }

  getAllBrandStyle() {
    if (!this.currentBrand) {
      return 'background-color:#f5ca29; color:#3f3f3f';
    } else {
      return 'background-color: #3f3f3f; color:white;';
    }
  }
  setClearBrand() {
    this.currentBrand = this.clearBrand;
  }
  checkAdmin() {
   return this.authService.checkAdmin();
  }
}
