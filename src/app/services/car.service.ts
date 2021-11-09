import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = environment.apiUrl
  constructor( private httpClient :HttpClient ) { }

  getCars():Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl +'cars/getcarswithdetails'
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl +'cars/getcardetailsbybrandid?brandId=' + brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl +'cars/getcardetailsbycolorid?colorid=' + colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetails(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl +'cars/getcardetails?id=' + carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarDetailsByCarId(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl +"cars/GetCarDetailByCarId?carId=" + carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarDetailByColorAndBrand(colorId:number, brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl + "cars/getcardetailsbybrandandcolor?brandId="+brandId+ "&colorId=" +colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car);
  }

  updateCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"Cars/update",car);
  }

  deleteCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/delete",car)
  }
}
