import { Component, OnInit } from '@angular/core';
import {  FormGroup,FormBuilder,FormControl,Validators,} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {

  brandAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService,
    private errorService:ErrorsService
  ) {}

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      // ürün eklerken, formda olmasını istediğimiz alanları buraya yazıyoruz.
      brandName:["",Validators.required]
    });
  }

  add(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({}, this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(response=>{
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
