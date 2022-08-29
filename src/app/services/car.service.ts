import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = environment.apiUrl + 'cars/'
  constructor( private httpClient :HttpClient ) { }

  getCarById(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + 'get';
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getCars():Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl +'getcarswithdetails'
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl +'getcardetailsbybrandid?brandId=' + brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl +'getcardetailsbycolorid?colorid=' + colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetails(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl +'getcardetails?id=' + carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarDetailsByCarId(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl +"GetCarDetailByCarId?carId=" + carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarDetailByColorAndBrand(colorId:number, brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl + "getcardetailsbybrandandcolor?brandId="+brandId+ "&colorId=" +colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",car);
  }

  updateCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",car);
  }

  deleteCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"delete",car)
  }
}
