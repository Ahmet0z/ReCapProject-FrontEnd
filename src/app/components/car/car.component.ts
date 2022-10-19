import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';
import { CarImagesService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetails: CarDetail[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  brandFilter: number = 0;
  colorFilter: number = 0;
  cardetailFilter = '';

  userFindeks:number;
  isFindeksEnough:boolean;
  userId:number
  user:User
  x:any
  anyNumberisToBeFindeks:String

  currentCar: Car;
  imageUrl = environment.imageUrl
  
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private imageService: CarImagesService,
    private colorService: ColorService,
    private brandService: BrandService,
    private authService: AuthService,
    private userService:UserService,
    private localStorege:LocalStorageService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllColors();
    this.isUserFindeksEnough()

    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else if (params['carId']) {
        this.getCarDetails(params['carId']);
      } else if(params['brandId'] && params['colorId']){
        this.getCarDetailByColorAndBrand(params['colorId'],params['brandId']);
      } else {
        this.getCars();
      }
    });
  }

  isUserFindeksEnough(){
    if(this.authService.loggedIn()){

      this.userId = this.authService.getUser().id
      
      this.userService.userGetById(this.userId).subscribe(response=>{
        this.toastrService.success((response.data.findeks).toString());
      }, responseError=>{
        console.log(responseError)
      })
    }
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.carDetails = response.data
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCurrentCar(car: Car) {
    this.currentCar = car;
  }

  getCarDetails(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getImagePath(imagePath: string) {
    this.imageService.getImagePath(imagePath);
  }

  getSelectedBrand(brandId: number) {
    if (this.brandFilter == brandId) return true;
    else return false;
  }
  getSelectedColor(colorId: number) {
    if (this.colorFilter == colorId) return true;
    else return false;
  }
  getAllColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getAllBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getCarDetailByColorAndBrand(colorId: number, brandId: number) {
    this.carService.getCarDetailByColorAndBrand(colorId, brandId)
      .subscribe((response) => {
        this.carDetails = response.data;
      });

  }

}
