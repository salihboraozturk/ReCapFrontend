import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/models/payment/payment';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl = 'https://localhost:44393/api/payments';
  constructor(private httpClient: HttpClient) {}
  addPayment(payment: Payment) {
    let newPath = this.apiUrl + '/paymentadd';
    this.httpClient.post(newPath, payment).subscribe();
  }
  checkPayment(payment:Payment):Observable<ResponseModel>{
    let newPath = this.apiUrl +"/checkpaymentsuccess";
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }
}
