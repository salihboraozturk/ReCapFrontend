import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer/cutomer';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44393/api/';
  constructor(private httpClient: HttpClient) {}
  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/getall';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getCustomerByUserId(
    userId: number
  ): Observable<SingleResponseModel<Customer>> {
    let newPath =
      this.apiUrl + 'customers/getcustomerbyuserid?userId=' + userId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }
  update(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiUrl + "customers/customerupdate";
    return this.httpClient.post<ResponseModel>(newPath,customer);
  }
}
