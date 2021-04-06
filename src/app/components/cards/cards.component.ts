import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card/card';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CardService } from 'src/app/services/card/card.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
cards:Card[]=[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private cardService: CardService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCardsByUser();
  }
getCardsByUser(){
  this.cardService.getCardsByUserId(this.authService.getUserId()).subscribe(response=>{
    this.cards=response.data;
  })
}
delete(card:Card){
  this.cardService.delete(card).subscribe(response=>{
    this.toastrService.success("Kart silindi.");
    window.location.reload();

  })
}
}
