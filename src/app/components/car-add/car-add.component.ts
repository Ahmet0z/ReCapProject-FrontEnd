import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators,} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup
  brands: Brand[] = [];
  colors: Color[] = [];
  brandFilter: number;
  colorFilter: number;

  constructor(
    private toastrService:ToastrService, 
    private formBuilder:FormBuilder, 
    private carService:CarService, 
    private colorService:ColorService, 
    private brandService:BrandService,
    private errorService:ErrorsService
    ) { }

  ngOnInit(): void {
    this.createCarAddForm(),
    this.getAllBrands(),
    this.getAllColors()
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      carName:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      findeks:["",Validators.required],
      plate:["",Validators.required]
    })
    
    this.carAddForm.patchValue({
      brandId:0,
      colorId:0
    })
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

  getSelectedBrand(brandId: number) {
    if (this.brandFilter == brandId) return true;
    else return false;
  }

  getSelectedColor(colorId: number) {
    if (this.colorFilter == colorId) return true;
    else return false;
  }

  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({}, this.carAddForm.value)
      this.carService.add(carModel).subscribe(response=>{
        setTimeout(() => { 
          window.location.reload();      
        }, 0);
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        this.errorService.responseErrorMessages(responseError);
      })
    }else{
      this.toastrService.error("Form eksik.","Dikkat")
    }
  }

}
