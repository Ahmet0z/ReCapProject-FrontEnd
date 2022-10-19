import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { User } from 'src/app/models/user';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users:User[]=[];
  user:User;
  userId:number
  roles:OperationClaim[]
  allRoles:OperationClaim[]
  userRoles:UserOperationClaim[]
  userRoleAddForm:FormGroup

  constructor(
    private userService:UserService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.createRoleAddForm();
    this.getAllRoles();
  }

  getUsers(){
    this.userService.getUsers().subscribe(response => {
      this.users = response.data;
      })
  }

  getAllRoles(){
    this.userService.getAllRoles().subscribe(response =>{
      this.allRoles = response.data
    })
  }

  getUser(userId:number){
    this.userId = userId;
  }

  getUserRoles(userId:number){
    this.userService.getUserRoles(userId).subscribe(response =>{
      this.userRoles = response.data.userOperationClaim
      this.roles = response.data.operationClaim
    })
  }

  deleteUserRole(operationClaim:OperationClaim){
    let userOperationClaim = this.userRoles.find(u=> u.userId == this.userId && u.operationClaimId == operationClaim.id);

    this.userService.deleteUserRole(userOperationClaim).subscribe(response=>{
      this.toastrService.success(response.message)
      var table = document.getElementById("userRoleTable");
      var deleted = document.getElementById("deleted-"+operationClaim.id);
      table.removeChild(deleted)
    },
    responseError=>{
      for(var i =0; i<responseError.error.length; i++)
      {
        this.toastrService.error(responseError.error.message,"Hata!")
      }
    }
    )
  }

  createRoleAddForm(){
    this.userRoleAddForm = this.formBuilder.group({
      userId: ["",Validators.required],
      operationClaimId: ["",Validators.required]
    });

    
  }

  roleForm(){
    this.userRoleAddForm.patchValue({
      operationClaimId:0,
      userId: this.userId 
    })
  }

  addUserRole(){
    if(this.userRoleAddForm.valid){
      let roleModel = Object.assign({}, this.userRoleAddForm.value);
      this.userService.addUserRole(roleModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı")
      },responseError => {
        console.log(responseError)
      })
    }  
    else{
      this.toastrService.error("Form eksik.","Dikkat")
    }
  }
  
  add(){
    console.log(this.userRoleAddForm.value)
  }

}
