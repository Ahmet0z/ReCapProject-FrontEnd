import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetails } from '../models/rentalDetails';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  totalPrice:number

  apiUrl = environment.apiUrl + "rentals/"
  constructor( private httpClient :HttpClient ) { }

  addRental(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  getRentalDetails():Observable<ListResponseModel<RentalDetails>>{
    let newPath = this.apiUrl + "getrentaldetails"
    return this.httpClient.get<ListResponseModel<RentalDetails>>(newPath)
  }

  getRentalDetailsByUser(userId:number):Observable<ListResponseModel<RentalDetails>>{
    let newPath = this.apiUrl + "getrentalbyuser?userId="+userId
    return this.httpClient.get<ListResponseModel<RentalDetails>>(newPath)
  }

  getRentalDetailsByCar(carId:number):Observable<ListResponseModel<RentalDetails>>{
    let newPath = this.apiUrl + "getrentalbycar?carId="+carId
    return this.httpClient.get<ListResponseModel<RentalDetails>>(newPath)
  }

  getRentalDetailsByCarAndUser(carId:number,userId:number):Observable<ListResponseModel<RentalDetails>>{
    let newPath = this.apiUrl + "getrentalbycaranduser?carId="+ carId +"&userId="+userId
    return this.httpClient.get<ListResponseModel<RentalDetails>>(newPath)
  }
}
