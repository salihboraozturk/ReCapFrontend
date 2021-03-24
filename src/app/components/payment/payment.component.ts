import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/models/payment/payment';
import { Rental } from 'src/app/models/rental/rental';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  cardNumber: string;
  cardOwner: string;
  cvv: string;
  expirationMonth: string;
  expirationYear: string;
  expirationDate: string;
  rental: Rental;
  constructor(
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params["rental"]);
      }
    });
  }
  addRental() {
    this.expirationDate = this.expirationMonth + this.expirationYear;
    let payment: Payment = {
      cardNumber: this.cardNumber,
      cardOwner: this.cardOwner,
      cvv: this.cvv,
      expirationDate: this.expirationDate,
    };
    console.log(payment);
    console.log(this.rental);
   this.rentalService.addRental(this.rental);
   this.paymentService.addPayment(payment);
  }
}
