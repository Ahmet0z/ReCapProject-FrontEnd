import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService, private localStroageService:LocalStorageService, private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["", Validators.required],
      password:["", Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      let loginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.localStroageService.saveToken(response.data.token)
        setTimeout(() => {
          window.location.reload();
        }, 1000);    
        this.router.navigate(["/cars"])
        this.toastrService.info(response.message)  
      },responseError=>{
          this.toastrService.error(responseError.error.message,"Hata")
          console.log(responseError)
      })
    }
  }

}
