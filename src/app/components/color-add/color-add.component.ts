import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators,} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {
  colorAddForm:FormGroup;

  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private errorService:ErrorsService
  ) {}

  ngOnInit(): void {
    this.createBrandAddForm()
  }
  createBrandAddForm() {
    this.colorAddForm = this.formBuilder.group({
      // ürün eklerken, formda olmasını istediğimiz alanları buraya yazıyoruz.
      colorName:["",Validators.required]
    });
  }

  add(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({}, this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response=>{
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
