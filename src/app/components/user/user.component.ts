import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service'; 
import { UserService } from 'src/app/services/user.service';
import { UserUpdateModel } from 'src/app/models/userUpdateModel';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userId:number;
  user:UserUpdateModel;
  cardAddForm:FormGroup;
  userUpdate:boolean;
  passwordChange:boolean;
  cardAdd:boolean;
  rentalList:boolean

  constructor(private formBuilder:FormBuilder, private userService:UserService,
    private toastrService:ToastrService, private router:Router,
    private authService:AuthService,
    private cardService:CardService
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
      },responsError=>{
        console.log(responsError)
        // for (let i = 0; i < responsError.error.Errors.length; i++) {
        //   this.toastrService.error(responsError.error.Errors[i].ErrorMessage,"Hata")
        // }
      })
    }else{
      this.toastrService.error("Form eksik.","Dikkat")
    }
  }
 
  userToUpdate(){
    this.userUpdate = true;
    this.passwordChange = false;
    this.cardAdd = false;
    this.rentalList = false;
  }

  passwordToChange(){
    this.passwordChange = true;
    this.userUpdate = false;
    this.cardAdd = false;
    this.rentalList = false;
  }

  cardToAdd(){
    this.cardAdd = true;
    this.passwordChange = false;
    this.userUpdate = false;
    this.rentalList = false;
  }

  rentalToList(){
    this.rentalList = true;
    this.cardAdd = false;
    this.passwordChange = false;
    this.userUpdate = false;
  }
  
}