import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card/card';

import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  apiUrl = 'https://localhost:44393/api';
  constructor(private httpClient: HttpClient) {}
  cardSave(card: Card): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/cards/cardadd';
    return this.httpClient.post<ResponseModel>(newPath, card);
  }
  getCardsByUserId(userId: number): Observable<ListResponseModel<Card>> {
    let newPath = this.apiUrl + '/cards/getcardsbyuserid?userId=' + userId;
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }
  delete(card: Card): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/cards/deletecard';
    return this.httpClient.post<ResponseModel>(newPath, card);
  }
}
