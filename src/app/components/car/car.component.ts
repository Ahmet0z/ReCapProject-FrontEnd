import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImagesService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
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

  currentCar: Car;
  dataLoaded = false;
  imageUrl = environment.imageUrl
  
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private imageService: CarImagesService,
    private colorService: ColorService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllColors();

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

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.carDetails = response.data,
      this.dataLoaded = true
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCurrentCar(car: Car) {
    this.currentCar = car;
  }

  getCarDetails(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
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
