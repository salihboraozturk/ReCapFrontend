import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from 'src/app/models/carimage/carImage';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
apiUrl="https://localhost:44393/api/CarImages/getallimagebycarid?carId=";
  constructor(private httpClient:HttpClient) { }
  getCarImage(carId:number):Observable<ListResponseModel<CarImage>>{
  return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl+carId);
  }
}
