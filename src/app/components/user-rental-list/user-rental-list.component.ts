import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { RentalDetails } from 'src/app/models/rentalDetails';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-rental-list',
  templateUrl: './user-rental-list.component.html',
  styleUrls: ['./user-rental-list.component.css']
})
export class UserRentalListComponent implements OnInit {

  rentals:RentalDetails[]
  cars:Car[]
  carFilter:number = 0
  isFiltered:boolean
  userId:number


  constructor(
    private rentalService:RentalService,
    private carService:CarService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.getUserId();
    this.getRentalDetails();
    this.getCars();
  }
  getUserId(){
    this.userId = this.authService.getUser().id
    console.log(this.userId)
  }
  getRentalDetails(){
    this.rentalService.getRentalDetailsByUser(this.userId).subscribe(response=>{
      this.rentals = response.data
    })
  }

  getRentalDetailsByUserAndCar(){
    if(this.carFilter == 0){
      this.getRentalDetails();
      this.isFiltered = false;
    }else{
      this.rentalService.getRentalDetailsByCarAndUser(this.carFilter, this.userId).subscribe(response=>{
        this.rentals = response.data
        this.isFiltered = true
       })
    }
    
  }

  getCars(){
    this.carService.getAllCars().subscribe(response =>{
      this.cars=response.data;
    })
  }

  getSelectedCar(carId:number){
    if(this.carFilter == carId) return true;
    return false;
  }

  deleteFilter(){
    this.isFiltered=false;
    this.getCars()
    this.getRentalDetails()
  }

}
