import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  totalPrice:number

  apiUrl = 'https://localhost:44317/api/rentals/'
  constructor( private httpClient :HttpClient ) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "getrentaldetails";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath); 
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}
