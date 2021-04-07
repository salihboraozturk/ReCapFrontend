import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/color/color';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = 'https://localhost:44393/api/colors';
  constructor(private httpClient: HttpClient) {}
  getColors(): Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl + '/getall';
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }
  addColor(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/coloradd';
    return this.httpClient.post<ResponseModel>(newPath, color);
  }
  updateColor(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/colorupdate';
    return this.httpClient.post<ResponseModel>(newPath, color);
  }
}
