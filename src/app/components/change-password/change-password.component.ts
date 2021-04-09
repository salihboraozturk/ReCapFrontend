import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}
userId:number;
  ngOnInit(): void {
    this.createChangePasswordForm();
  }
  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }
  changePassword() {
    if (this.changePasswordForm.valid) {
      let passwordModel = Object.assign(
        { userId: this.authService.getUserId() },
        this.changePasswordForm.value
      );
      this.authService.changePassword(passwordModel).subscribe((response) => {
        this.toastrService.success(response.messages);
      });
    }
  }
}
