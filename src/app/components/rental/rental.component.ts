import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  customerId: number;
  rentDate: Date;
  returnDate: Date;
  state: number = 1;
  rentals: Rental;
  message: string;
  minDate?: string = '';
  maxDate?: string = '';
  totalPrice = this.rentalService.totalPrice

  @Input() carforRent: Car;

  constructor(private activatedRoute: ActivatedRoute, private paymentService:PaymentService, private datePipe:DatePipe, private rentalService:RentalService, private router:Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        console.log(params['carId']);
      }
    });
  }

  createNewRental(){
    let rental:Rental={
      carId:this.carforRent.id,
      customerId:1,
      rentDate:this.rentDate,
      returnDate:this.returnDate
    }
    this.rentals = rental;
    this.paymentService.rentals =rental;
   }

  totalAmount(){
    let differance = new Date(this.returnDate).getTime() -  new Date(this.rentDate).getTime();
    let price = new Date(differance).getDate();
    this.paymentService.totalPrice = price * this.carforRent.dailyPrice;
  }

  payment(){
    let rental:Rental={
      carId:this.carforRent.id,
      customerId:1,
      rentDate:this.rentDate,
      returnDate:this.returnDate
    }
    this.rentals = rental;
    if (this.rentals?.rentDate !== undefined) {
      this.paymentService.rentals =rental;
      var myModal = document.querySelector('.modal-backdrop')
      var x = document.getElementsByTagName("BODY")[0];
      x.classList.remove("modal-open")
      myModal.remove()
      this.router.navigate(["cardetails/payment"])
      window.scrollTo(0,0)
    }
    else{
      console.log("Rent date lazım")
    }
  }

  minDateChange(date: any) {
    this.minDate = date.target.value;
    this.maxDate = this.datePipe.transform(
      new Date(
        new Date(this.minDate).setFullYear(new Date().getFullYear() + 1)
      ),
      'yyyy-MM-dd'
    );
  }

}
