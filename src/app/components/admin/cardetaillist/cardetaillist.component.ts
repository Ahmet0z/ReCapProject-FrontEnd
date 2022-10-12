import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail'; 
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-cardetaillist',
  templateUrl: './cardetaillist.component.html',
  styleUrls: ['./cardetaillist.component.css'],
})
export class CardetaillistComponent implements OnInit {
  cardetails: CarDetail[] = [];
  carDetail: CarDetail;
  colors: Color[] = [];
  brands: Brand[] = [];
  car: Car;
  cars: Car[] = [];
  carUpdateForm: FormGroup;

  constructor(
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private carService:CarService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getCarDetails();
    this.getCars();
    this.getColors();
    this.createCarforUpdateForm();

  }

  getCar(carId:number){
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data;
    })
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getCarDetails() {
    this.carService.getCars().subscribe((response) => {
      this.cardetails = response.data;
      
    });
  }
  getCarDetailByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetail = response.data[0];
    });
  }

  getCarUpdate(car:Car){
    this.car = car;
    
    this.carUpdateForm.patchValue({
      id:this.car.id,
      brandId:this.car.brandId,
      colorId:this.car.colorId,
      dailyPrice:this.car.dailyPrice,
      modelYear:this.car.modelYear,
      carName:this.car.carName,
      findeks:this.car.findeks,
      description:this.car.description,
      plate:this.car.plate
    })
  }

  createCarforUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
     carId: [''],
     brandId:[''],
     colorId:[''],
     carName:['',Validators.required],
     modelYear:['',Validators.required],
     dailyPrice:['',Validators.required],
     description:['',Validators.required],
     findeks:['',Validators.required],
     plate:['',Validators.required]
    })
  }

  updateCar(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({},this.carUpdateForm.value);
      console.log(this.carUpdateForm.value)
       this.carService.updateCar(carModel).subscribe(response=>{
         console.log(response)
         this.toastrService.success(response.message,"Güncellendi");
         setTimeout(() => {
          window.location.reload();
        }, 1000);
         
       },responseError=>{
         console.log(responseError)
         this.toastrService.error(responseError.error.message);
       }
       )
    }
  }

  removeCar(car: Car) {
    this.carService.deleteCar(car).subscribe(
      (response) => {
        this.toastrService.success('Silindi');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      },
      (responseError) => {
        this.toastrService.error(responseError.errors, 'Arac Silinemedi');
      }
    );
  }
}