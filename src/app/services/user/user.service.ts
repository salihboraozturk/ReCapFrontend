import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44393/api/';
  constructor(private httpClient: HttpClient) {}
  updateInfo(user: User): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'users/userupdateinfo';
    return this.httpClient.post<ResponseModel>(newPath, user);
  }
  getUserById(userId: number): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getuserbyid?id=' + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  checkFindex(userId:number):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'users/checkfindex?userId='+userId;
    return this.httpClient.get<ResponseModel>(newPath);
  }
}
