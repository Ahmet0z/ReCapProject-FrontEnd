import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands: Brand[] = [];
  brand: Brand;
  brandUpdateForm: FormGroup;


  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private brandService:BrandService
  ) { }

  ngOnInit(): void {
    this.getBrands();
    this.createBrandUpdateForm();

  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getBrandforUpdate(brand: Brand) {
    this.brand = brand;

    this.brandUpdateForm.patchValue({
      brandId: this.brand.brandId,
      brandName:this.brand.brandName
    });
  }
  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: [''],
      brandName: ['', Validators.required],
    });
  }
  updateBrand() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.updateBrand(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarıyla Güncellendi');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          
        },
        (responseError) => {
          this.toastrService.error(responseError.errors, "Hata");
        }
      );
    }
  }

  removeBrand(brand: Brand) {
    this.brandService.deleteBrand(brand).subscribe(
      (response) => {
        this.toastrService.success('Başarıyla Silindi');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      },
      (responseError) => {
        this.toastrService.error(responseError.errors, 'Marka Silinemedi');
      }
    );
  }


}
