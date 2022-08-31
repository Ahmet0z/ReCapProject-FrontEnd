import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { RentalDetails } from 'src/app/models/rentalDetails';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {

  rentals:RentalDetails[]
  cars:Car[]
  carFilter:number = 0
  isFiltered:boolean


  constructor(
    private rentalService:RentalService,
    private carService:CarService
  ) { }

  ngOnInit(): void {
    this.getRentalDetails();
    this.getCars();
  }

  getRentalDetails(){
    this.rentalService.getRentalDetails().subscribe(response=>{
      this.rentals = response.data
    })
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

  getRentalsByCar(){
    this.rentalService.getRentalDetailsByCar(this.carFilter).subscribe(response=>{
      this.rentals = response.data
      this.isFiltered=true
    })
  }

  deleteFilter(){
    this.isFiltered=false;
    this.getCars()
    this.getRentalDetails()
  }
}
