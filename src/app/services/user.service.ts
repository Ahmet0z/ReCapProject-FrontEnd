import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { UserPasswordUpdateModel } from '../models/userPasswordUpdateModel';
import { UserUpdateModel } from '../models/userUpdateModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl=environment.apiUrl

  constructor(private httpClient:HttpClient) { }

  updateUser(userUpdateModel:UserUpdateModel):Observable<ResponseModel>{
    let newPath= this.apiUrl + "users/update"
    return this.httpClient.post<ResponseModel>(newPath,userUpdateModel);
  }

  getByUserId(userId:number):Observable<SingleResponseModel<UserUpdateModel>>{
    let newPath = this.apiUrl + "users/getbyuserid?userId="+userId;
    return this.httpClient.get<SingleResponseModel<UserUpdateModel>>(newPath)

  }

  getUserRoles(userId:number):Observable<ListResponseModel<OperationClaim>>{
    let newPath = this.apiUrl + "users/getclaimsbyuser?userid="+userId
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath)
  }

  changePassword(userPasswordUpdate:UserPasswordUpdateModel):Observable<ResponseModel>{
    let newPath = this.apiUrl +"users/changepassword"
    return this.httpClient.post<ResponseModel>(newPath,userPasswordUpdate);
  }
}
