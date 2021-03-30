import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental/rental';
import { ResponseModel } from 'src/app/models/responseModel';
@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44393/api/rentals';
  constructor(private httpClient: HttpClient) {}
  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + '/getrentaldetails';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  addRental(rental: Rental):Observable<ResponseModel> {
    let newPath = this.apiUrl + '/rentaladd';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
}
