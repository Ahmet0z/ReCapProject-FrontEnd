import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ListClaimsModel } from 'src/app/models/listClaimsModel';
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
  userRoles:UserOperationClaim[]

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
    },
    responseError=>{
      console.log(responseError)
    }
    )
  }

}
