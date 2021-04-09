import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand/brand.service';

@Component({
  selector: 'app-brandedit',
  templateUrl: './brandedit.component.html',
  styleUrls: ['./brandedit.component.css']
})
export class BrandeditComponent implements OnInit {
  currentColor: number;
  brands: Brand[];
  brandAddForm: FormGroup;
  brandUpdateForm: FormGroup;
  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.getBrands();
    this.createBrandAddForm();
    this.createBrandUpdateForm();
  }
  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ['', Validators.required],
    });
  }
  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      brandName: ['', Validators.required],
     
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  brandAdd() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.addBrand(brandModel).subscribe((response) => {
        this.toastrService.success(response.messages);
        window.location.reload();
      });
    }
  }
  brandUpdate() {
    if (this.brandUpdateForm.valid) {
      this.brandUpdateForm.value['brandId'] = +this.brandUpdateForm.value['brandId'];
      let brandUpdateModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.updateBrand(brandUpdateModel).subscribe((response) => {
        this.toastrService.success("Başarılı");
        window.location.reload();
      });
    }
  }
}
