import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListClaimsModel } from '../models/listClaimsModel';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { UserOperationClaim } from '../models/userOperationClaim';
import { UserPasswordUpdateModel } from '../models/userPasswordUpdateModel';
import { UserUpdateModel } from '../models/userUpdateModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl=environment.apiUrl + "users/"

  constructor(private httpClient:HttpClient) { }

  updateUser(userUpdateModel:UserUpdateModel):Observable<ResponseModel>{
    let newPath= this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(newPath,userUpdateModel);
  }

  getByUserId(userId:number):Observable<SingleResponseModel<UserUpdateModel>>{
    let newPath = this.apiUrl + "getbyuserid?userId="+userId;
    return this.httpClient.get<SingleResponseModel<UserUpdateModel>>(newPath)
  }

  getUserRoles(userId:number):Observable<SingleResponseModel<ListClaimsModel>>{
    let newPath = this.apiUrl + "getclaimsbyid?userid="+userId
    return this.httpClient.get<SingleResponseModel<ListClaimsModel>>(newPath)
  }

  getUsers():Observable<ListResponseModel<User>>{
    let newPath = this.apiUrl + "getAll";
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  changePassword(userPasswordUpdate:UserPasswordUpdateModel):Observable<ResponseModel>{
    let newPath = this.apiUrl +"changepassword"
    return this.httpClient.post<ResponseModel>(newPath,userPasswordUpdate);
  }

  deleteUserRole(userOperationClaim:UserOperationClaim):Observable<ResponseModel>{
    let newPath = this.apiUrl + "deleteuseroperationclaim";
    return this.httpClient.post<ResponseModel>(newPath,userOperationClaim);
  }
}
