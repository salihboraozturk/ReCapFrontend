import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../../models/brand/brand';
import { BrandResponseModel } from 'src/app/models/brand/brandResponseModel';


@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44393/api/brands/getall';
  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<BrandResponseModel> {
    return this.httpClient.get<BrandResponseModel>(this.apiUrl);
  }
}
