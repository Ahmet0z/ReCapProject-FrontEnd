import { Component, OnInit } from '@angular/core';
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
  userRoles:any

  constructor(
    private userService:UserService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(response => {
      this.users = response.data;
      })
  }

  getUserRoles(userId:number){
    this.userService.getUserRoles(userId).subscribe(response =>{
      this.userRoles = response
    })
  }

  deleteUserRole(userOperationClaim:UserOperationClaim){
    this.userService.deleteUserRole(userOperationClaim).subscribe(response=>{
      console.log(response)
    },
    responseError=>[
      console.log(responseError)
    ])
  }

}
