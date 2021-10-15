import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl='https://localhost:44317/api/'

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl+'cars/GetAllCar');
  }

  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl + 'cars/getcarswithdetails');
  }

  getCarDetailsByCarId(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl +"cars/getcardetails?id=" + carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
