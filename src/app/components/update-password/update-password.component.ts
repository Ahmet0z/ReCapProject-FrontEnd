import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorsService } from 'src/app/services/errors.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  updatePasswordForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder, 
    private userService:UserService,
    private toastrService:ToastrService, 
    private router:Router,
    private localStorage:LocalStorageService,
    private errorService:ErrorsService
    ) { }

  ngOnInit(): void {
    this.createupdatePasswordForm();
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
      this.errorService.responseErrorMessages(responseError);
    })
    
  }
  else{
    this.toastrService.warning("Form eksik","Dikkat !")
  }
  }

}
