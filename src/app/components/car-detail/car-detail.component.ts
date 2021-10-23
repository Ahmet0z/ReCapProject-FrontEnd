import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImagesService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {

  carImage:CarImage[]=[];
  cardetails:CarDetail;
  myNumbers:number[]=[0,1,2,3,4]
  imageUrl = "http://192.168.1.22:8080";
  //imageUrl = "http://172.20.10.7:8080"

  constructor(
    private carService: CarService,
    private carImageService: CarImagesService,
    private activatedRoute: ActivatedRoute,
    private carDetailService:CarDetailService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarImage(params["carId"])
        this.getCarDetails(params["carId"])
      }
    });
  }

  getCarImage(carId:number){
    this.carImageService.getCarImage(carId).subscribe(response=>{
      this.carImage = response.data;
      console.log(this.carImage);
      console.log(response)
    })
  }

  // getCarDetailByCarId(carId:number){
  //   this.carDetailService.getCarDetailsByCarId(carId).subscribe(response=>{
  //     this.cardetails = response.data[0];
  //   })
  //}

  getImagePath(image:string){
    return this.imageUrl + image;
  }

  getCarDetails(carId:number){
    this.carService.getCarDetails(carId).subscribe(response=>{
      this.cardetails = response.data[0]
      console.log(response)
    })
  }
}
