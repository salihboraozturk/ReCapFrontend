import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { Customer } from 'src/app/models/customer/cutomer';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userUpdateForm: FormGroup;
  customerUpdateForm: FormGroup;
  user: User;
  customer: Customer;
  findex:number;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private customerService: CustomerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createUserForm();
    this.createCustomerForm();
    this.getUser();
    this.getCustomer();
  }
  createUserForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
  createCustomerForm() {
    this.customerUpdateForm = this.formBuilder.group({
      companyName: ['', Validators.required],
    });
  }
  userUpdate() {
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign(
        { userId: this.user.userId },
        this.userUpdateForm.value
      );
      this.userService.updateInfo(userModel).subscribe((response) => {
        this.toastrService.success(response.messages);
      });
    }
  }
  customerUpdate() {
    if (this.customerUpdateForm.valid) {
      let customerModel = Object.assign(
        { customerId: this.customer.customerId },
        { userId: this.user.userId },
        this.customerUpdateForm.value
      );
      this.customerService.update(customerModel).subscribe((response) => {
        this.toastrService.success(response.messages);
      });
    }
  }
  getUser() {
    this.userService
      .getUserById(this.authService.getUserId())
      .subscribe((response) => {
        this.user = response.data;
        this.findex=this.user.findex;
        this.userUpdateForm.patchValue(response.data);
      });
  }
  getCustomer() {
    this.customerService
      .getCustomerByUserId(this.authService.getUserId())
      .subscribe((response) => {
        this.customer = response.data;
        this.customerUpdateForm.patchValue(response.data);
      });
  }
}
