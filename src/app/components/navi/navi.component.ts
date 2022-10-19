import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private authService:AuthService) { }
  ngOnInit(): void {
    this.isAdmin()
    this.getUser()
    this.isAuthenticated()
  }
  user:User
  isUserAdmin:boolean
  isUserAuthenticated:boolean

  isAdmin(){
    if (this.authService.isAdmin()) {
      this.isUserAdmin = true
    }else{
      this.isUserAdmin = false
    }
  }

  isAuthenticated(){
    if (this.authService.loggedIn()) {
      this.isUserAuthenticated = true
    }else{
      this.isUserAuthenticated=false
    }
  }

  getUser(){
    this.user = this.authService.getUser()
  }

  logout(){
    this.authService.logOut()
  }
}
