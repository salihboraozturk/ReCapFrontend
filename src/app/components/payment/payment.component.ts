import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validator,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card/card';
import { Payment } from 'src/app/models/payment/payment';
import { Rental } from 'src/app/models/rental/rental';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CarService } from 'src/app/services/car/car.service';
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
  cards: Card[];
  currentCard: Card;
  paymentModel: Payment;
  amount:number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private cardService: CardService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.amount = JSON.parse(params['amount']);
        this.createPaymentForm();
        this.getCardsByUserId();
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
    if (this.currentCard) {
      this.paymentModel = Object.assign({}, this.currentCard);
    } else {
      this.paymentModel = Object.assign({}, this.paymentForm.value);
    }
    if (this.currentCard || this.paymentForm.valid) {
      this.paymentService
        .checkPayment(this.paymentModel)
        .subscribe((response) => {
          this.toastrService.success(response.messages, 'Başarılı');
          this.addRental();
          this.checkFindex();
          this.router.navigate(['/cars']);
        });
    }
    else{
      this.toastrService.error("Lütfen formu doldurunuz!")
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
  getCardsByUserId() {
    this.cardService
      .getCardsByUserId(this.authService.getUserId())
      .subscribe((response) => {
        this.cards = response.data;
      });
  }
  setCurrentCard(card: Card) {
    this.currentCard = card;
  }

  checkFindex() {
    this.userService
      .checkFindex(this.authService.getUserId())
      .subscribe((response) => {
        this.toastrService.info(response.messages);
      });
  }
}
