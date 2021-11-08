import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service'; 
import { UserService } from 'src/app/services/user.service';
import jwtDecode from 'jwt-decode';
import { User } from 'src/app/models/user';
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
  updateUserForm:FormGroup;
  updatePasswordForm:FormGroup;
  cardAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private userService:UserService,
    private toastrService:ToastrService, private router:Router,
    private authService:AuthService,
    private localStorage:LocalStorageService,
    private cardService:CardService
    ) { }

  ngOnInit(): void {
    this.updateForm();
    this.getUserById();
    this.createupdatePasswordForm();
    this.createCardAddForm();
  }

  createCardAddForm(){
    this.cardAddForm = this.formBuilder.group({
    userId:[this.authService.user.userId],
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
        }, 1000);
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
 
  getUserById(){
    let token = this.localStorage.getToken()
    let id:number=Number(Object.values(jwtDecode(token))[0])
    this.userId=id;
    this.userService.getByUserId(id).subscribe(response=>{
      this.user = response.data;  
    })

  }

  updateForm(){
    this.updateUserForm = this.formBuilder.group({
      userId:[''],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required]

    })
  }

  updateUser(){
    if (this.updateUserForm.valid) {
      let userModel = Object.assign({},this.updateUserForm.value)
      let token = this.localStorage.getToken()
      let id:number=Number(Object.values(jwtDecode(token))[0])
      userModel.userId = id;
      this.userService.updateUser(userModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.localStorage.removeToken();
        this.router.navigate(["/login"])    
      },responseError=>{
        console.log(responseError)
        this.toastrService.error("güncellenmedi")
      })
      
    }
    else{
      this.toastrService.warning("Form eksik","dikkat!")
    }
  }
  
  createupdatePasswordForm(){
    this.updatePasswordForm =this.formBuilder.group({
      email:["",Validators.required],
      oldPassword:["",Validators.required],
      newPassword:["",Validators.required]
    })

  }

  updatePassword(){
    console.log(this.updatePasswordForm.value)
  if (this.updatePasswordForm.valid) {
    let updatePassword = Object.assign({},this.updatePasswordForm.value)
    this.userService.changePassword(updatePassword).subscribe(response=>{
      this.toastrService.success(response.message,"başarılı")
      this.localStorage.removeToken();
      this.router.navigate(["/login"])
    },responseError=>{
      this.toastrService.error("güncellenmedi")
    })
    
  }
  else{
    this.toastrService.warning("Form eksik","Dikkat !")
  }
  }
  
}