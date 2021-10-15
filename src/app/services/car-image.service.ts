import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class CarImagesService {
  private apiUrl = "https://localhost:44317/api/";
  constructor(private httpClient: HttpClient) { }

  getImagePath(imagePath: string) {
    return this.apiUrl + imagePath
  }

  getCarImage(carId:number){
    let newPath = this.apiUrl +"carImages/getallbycarid?carId=" + carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}