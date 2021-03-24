import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from 'src/app/models/payment/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
apiUrl="https://localhost:44393/api/payments";
  constructor(private httpClient:HttpClient) { }
  addPayment(payment:Payment){
   let newPath=this.apiUrl+"/paymentadd";
   this.httpClient.post(newPath,payment).subscribe();
  }
}
