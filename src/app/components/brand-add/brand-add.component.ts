import { Component, OnInit } from '@angular/core';
import {  FormGroup,FormBuilder,FormControl,Validators,} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

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
    private toastrService:ToastrService
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
        }, 1000);
        this.toastrService.success(response.message,"Başarılı")
      },responsError=>{
        for (let i = 0; i < responsError.error.Errors.length; i++) {
          this.toastrService.error(responsError.error.Errors[i].ErrorMessage,"Hata")
        }
      })
    }else{
      this.toastrService.error("Form eksik.","Dikkat")
    }
  }
}
