import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { LoginModel } from 'src/app/models/login/loginModel';
import { RegisterModel } from 'src/app/models/register/registerModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/token/tokenModel';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChangePasswordModel } from 'src/app/models/changePasswordModel/changePasswordModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userId: number;
  apiUrl = 'https://localhost:44393/api/';
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.setUserId();
  }

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = 'https://localhost:44393/api/auth/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      loginModel
    );
  }
  register(
    registerModel: RegisterModel
  ): Observable<SingleResponseModel<TokenModel>> {
    let newPath = 'https://localhost:44393/api/auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      registerModel
    );
  }
  changePassword(changePasswordModel: ChangePasswordModel):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'auth/changepassword';
    return this.httpClient.post<ResponseModel>(newPath, changePasswordModel);
  }
  isAuthenticated() {
    if (this.localStorageService.get('token')) {
      return true;
    } else {
      return false;
    }
  }
  setUserId() {
    if (this.localStorageService.get('token')) {
      var decoded = this.jwtHelper.decodeToken(
        this.localStorageService.get('token')
      );
      var propUserId = Object.keys(decoded).filter((x) =>
        x.endsWith('/nameidentifier')
      )[0];
      this.userId = Number(decoded[propUserId]);
    }
  }
  getUserId(): number {
    return this.userId;
  }
}
