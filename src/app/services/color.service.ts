import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = 'https://localhost:44317/api/'
  constructor( private httpClient :HttpClient ) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl + "colors/getall"
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  getByColorId(colorId:number):Observable<SingleResponseModel<Color>>{
    let newPath = this.apiUrl + "colors/getbyid?colorId"+colorId
    return this.httpClient.get<SingleResponseModel<Color>>(newPath)
  }

  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"colors/add",color)
  }

  updateColor(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"colors/update",color)
  }

  deleteColor(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"colors/delete",color)
  }
}
