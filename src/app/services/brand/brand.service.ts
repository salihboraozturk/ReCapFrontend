import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../../models/brand/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';


@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44393/api/brands';
  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + '/getall';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  addBrand(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/brandadd';
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }
  updateBrand(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/brandupdate';
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }
}
