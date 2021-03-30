import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/cardetail/cardetail';
import { Color } from 'src/app/models/color/color';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44393/api/';
  constructor(private httpClient: HttpClient) {}
  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getallcardetails';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrand(brandId: number) {
    let newPath = this.apiUrl + 'cars/getcarsdetails?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId: number) {
    let newPath = this.apiUrl + 'cars/getcarsdetails?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByFilter(brandId: number, colorId: number) {
    let newPath =
      this.apiUrl +
      `cars/getcarsdetails?brandId=${brandId}+&colorid=${colorId}`;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetailsById(carId: number): Observable<SingleResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getcardetail?carId=' + carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }
  add(car: Car): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/caradd';
    return this.httpClient.post<SingleResponseModel<Car>>(newPath, car);
  }
  update(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cars/update';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
}
