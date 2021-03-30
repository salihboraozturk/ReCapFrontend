import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validator,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment/payment';
import { Rental } from 'src/app/models/rental/rental';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CardService } from 'src/app/services/card/card.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { RentalService } from 'src/app/services/rental/rental.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  rental: Rental;
  userId: number;
  isChecked = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private cardService: CardService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.createPaymentForm();
        console.log(this.rental)
      }
    });
  }
  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardOwner: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationMonth: ['', Validators.required],
      expirationYear: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }
  addRental() {
    this.rentalService.addRental(this.rental).subscribe((response) => {
      this.toastrService.success(response.messages, 'Başarılı');
      this.saveCard();
    });
  }
  checkPayment() {
    if (this.paymentForm.valid) {
      let paymentModel = Object.assign({}, this.paymentForm.value);
      this.paymentService.checkPayment(paymentModel).subscribe((response) => {
        this.toastrService.success(response.messages, 'Başarılı');
        this.addRental();
        this.checkFindex();
      });
    } else {
      this.toastrService.error('Lütfen formu doğru doldurunuz.');
    }
  }
  saveCard() {
    if (this.isChecked == true) {
      let saveModel = Object.assign(
        { userId: this.authService.getUserId() },
        this.paymentForm.value
      );
      this.cardService.cardSave(saveModel).subscribe((response) => {
        this.toastrService.success(response.messages);
      });
    }
  }
  checkFindex(){
    this.userService.checkFindex(this.authService.getUserId()).subscribe(response=>{
      this.toastrService.info(response.messages);
    })
  }
}
