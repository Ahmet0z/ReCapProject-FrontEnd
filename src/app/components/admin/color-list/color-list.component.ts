import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  colors: Color[] = [];
  color: Color;
  colorUpdateForm: FormGroup;


  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.getColors();
    this.createColorUpdateForm();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      
    });
  }

  getColor(color: Color) {
    this.color = color;
    this.colorUpdateForm.patchValue({
      colorId: this.color.colorId,
      colorName: this.color.colorName
    });
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: [''],
      colorName: ['', Validators.required],
    });
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
   
      this.colorService.updateColor(colorModel).subscribe(
        (response) => {
          
          this.toastrService.success(response.message, 'Güncellendi');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          
        },
        (responseError) => {
          console.log(responseError)
          this.toastrService.error('Güncellenemedi');
        }
      );
    }
  }

  removeColor(color: Color) {
    this.colorService.deleteColor(color).subscribe(
      (response) => {
        this.toastrService.success('Silindi');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      },
      (responseError) => {
        this.toastrService.error(responseError.errors, 'Renk Silinemedi');
      }
    );
  }



}
