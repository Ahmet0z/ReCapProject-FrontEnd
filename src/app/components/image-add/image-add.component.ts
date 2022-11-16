import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { ImageCar } from 'src/app/models/imageCar';
import { CarImagesService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css'],
})
export class ImageAddComponent implements OnInit {
  imageAddForm: FormGroup;
  cars: CarDetail[];
  carFilter: number;
  imageModel:CarImage
  x:any
  fileName:string

  constructor(
    private toastrService: ToastrService,
    private carImageService: CarImagesService,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private http:HttpClient,
    private errorService:ErrorsService
  ) {}

  ngOnInit(): void {
    this.createImageAddForm();
    this.getCars();
  }

  createImageAddForm() {
    this.imageAddForm = this.formBuilder.group({
      file: ['', Validators.required],
      carId:['']
    });

    this.imageAddForm.patchValue({
      carId:0
    })
  }

  // public uploadFile = (files:any) =>{
  //   if(files.length === 0){
  //     return;
  //   }
  //   let fileToUpload = <File>files[0];
  //   const formData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name)

  //   console.log(formData)
  //   console.log(fileToUpload)
  //   //this.imageModel = formData
  //   //this.carImageService.addCarImage(this.imageModel)


  // }

  onFileSelected(event:any){
    const file:File = event.target.files[0];

    console.log(event)
    console.log(event.target)
    console.log(event.target.files)
   // console.log(file)
        if (file) {
          //Dosya bilgileri
          
            this.fileName = file.name;

            const formData1 = new FormData();

            formData1.append("thumbnail", file);
        }
  }

  add(event:any) {
    
    const file:File = event.target.files[0];

        if (file) {
            this.fileName = file.name;
        }

    if (this.imageAddForm.valid) {
      this.imageModel = Object.assign({}, this.imageAddForm.value);
      this.carImageService.addCarImage(this.imageModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError =>{
        this.errorService.responseErrorMessages(responseError)
      })
    } else {
      this.toastrService.error('Form eksik.', 'Dikkat');
    }
  }

  getCars() {
    this.carService
      .getCars()
      .subscribe((response) => [(this.cars = response.data)]);
  }

  getSelectedCar(carId: number) {
    if (this.carFilter == carId) {
      return true;
    } else {
      return false;
    }
  }
}
