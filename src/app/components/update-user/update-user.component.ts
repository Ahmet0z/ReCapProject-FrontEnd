import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserUpdateModel } from 'src/app/models/userUpdateModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userId:number;
  user:UserUpdateModel;
  updateUserForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder, private userService:UserService,
    private toastrService:ToastrService, private router:Router,
    private localStorage:LocalStorageService, private authService:AuthService

  ) { }

  ngOnInit(): void {
    this.updateForm();
    this.getUserById();
  }
  getUserById(){
  let token = this.localStorage.getToken()
  let id:number = Number(this.authService.decodeJWTToken(token)[0])
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
    let id:number = Number(this.authService.decodeJWTToken(token)[0])
    userModel.userId = id;
    this.userService.updateUser(userModel).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı")
      this.localStorage.removeToken();
      this.router.navigate(["/login"])    
    },responseError=>{
      console.log(responseError)
      this.toastrService.error("güncellenmedi")
    })}
  else{
    this.toastrService.warning("Form eksik","dikkat!")
  }
}
}
