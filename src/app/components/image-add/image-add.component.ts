import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImagesService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css']
})
export class ImageAddComponent implements OnInit {

  imageAddForm:FormGroup
  cars:CarDetail[]
  carFilter:number

  constructor(private toastrService:ToastrService, private carImageService:CarImagesService, private formBuilder:FormBuilder, private carService:CarService) { }

  ngOnInit(): void {
    this.createImageAddForm()
    this.getCars()
  }

  createImageAddForm(){
    this.imageAddForm = this.formBuilder.group({
      file:["",Validators.required],
      carId:["",Validators.required]
    });
  }

  add(){
    if(this.imageAddForm.valid){
      let imageModel = Object.assign({}, this.imageAddForm.value)
      this.carImageService.addCarImage(imageModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responsError=>{
        console.log(responsError)
        for (let i = 0; i < responsError.error.Errors.length; i++) {
          this.toastrService.error(responsError.error.Errors[i].ErrorMessage,"Hata")
        }
      })
    }else{
      this.toastrService.error("Form eksik.","Dikkat")
    }
  }

  getCars(){
    this.carService.getCars().subscribe(response=>[
      this.cars = response.data
    ])
  }

  getSelectedCar(carId:number){
    if (this.carFilter==carId) {
      return true;
    }else{
      return false;
    }
  }

}
