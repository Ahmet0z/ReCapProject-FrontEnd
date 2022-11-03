import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.css']
})
export class CardAddComponent implements OnInit {

  cardAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private cardService:CardService,
    private errorService:ErrorsService
    ) { }

  ngOnInit(): void {
    this.createCardAddForm();
  }

  createCardAddForm(){
    this.cardAddForm = this.formBuilder.group({
    userId:[this.authService.user.id],
    ownerName:["",Validators.required],
    creditCardNumber:["",Validators.required],
    expirationDate:["",Validators.required],
    securityCode:["",Validators.required],

    })
  }

  addCard(){
    if (this.cardAddForm.valid) {
      
      let cardModel=Object.assign({},this.cardAddForm.value)
      this.cardService.add(cardModel).subscribe(response=>{
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
