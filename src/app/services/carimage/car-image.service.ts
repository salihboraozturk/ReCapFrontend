import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from 'src/app/models/carimage/carImage';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl = 'https://localhost:44393/api/';
  constructor(private httpClient: HttpClient) {}
  getCarImage(carId: number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + 'CarImages/getallimagebycarid?carId=';
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath + carId);
  }
  add(carId: number, file: File): Observable<ResponseModel> {
    let formData = new FormData();
    formData.append('CarId', carId.toString());
    formData.append('formFile', file);
    let newPath = this.apiUrl + 'CarImages/CarImageAdd';
    return this.httpClient.post<ResponseModel>(newPath, formData);
  }
  update(carId:number,imageFile:File,imageId:number):Observable<ResponseModel>{
    const formData = new FormData();
    formData.append("Id",imageId.toString());
    formData.append("carId",carId.toString());
    formData.append("Image",imageFile)

    let newPath = this.apiUrl + "carimages/update";
    return this.httpClient.post<ResponseModel>(newPath,formData);
  }
  
}
