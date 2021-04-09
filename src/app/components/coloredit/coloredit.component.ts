import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color/color';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-coloredit',
  templateUrl: './coloredit.component.html',
  styleUrls: ['./coloredit.component.css'],
})
export class ColoreditComponent implements OnInit {
  currentColor: number;
  colors: Color[];
  colorAddForm: FormGroup;
  colorUpdateForm: FormGroup;
  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.getColors();
    this.createColorAddForm();
    this.createColorUpdateForm();
  }
  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
  }
  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: ['', Validators.required],
      colorName: ['', Validators.required],
     
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  colorAdd() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.addColor(colorModel).subscribe((response) => {
        this.toastrService.success(response.messages);
        window.location.reload();
      });
    }
  }
  colorUpdate() {
    if (this.colorUpdateForm.valid) {
      this.colorUpdateForm.value['colorId'] = +this.colorUpdateForm.value['colorId'];
      let colorUpdateModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.updateColor(colorUpdateModel).subscribe((response) => {
        this.toastrService.success("Başarılı");
        window.location.reload();
      });
    }
  }

}
