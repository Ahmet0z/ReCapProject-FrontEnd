import { HttpClient } from '@angular/common/http';
import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user';
import { CustomerService } from './customer.service';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  decodedTokenKey: any;
  user: User;

  apiUrl = environment.apiUrl + 'Auth/';

  constructor(private httpClient: HttpClient, private customerService: CustomerService, 
    private localStorageService: LocalStorageService, private jwtHelper: JwtHelperService,
    private userService:UserService, private router:Router, private toastrService:ToastrService
    ) {}

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'Login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      loginModel
    );
  }

  register(registerModel: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'Register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }

  decodedToken(token: any) {
    return this.jwtHelper.decodeToken(token);
  }

  decodeJWTToken(token:any){
    return Object.values(jwtDecode(token));
  }

  isAuthenticated() {
    if (this.localStorageService.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(){
    let isAdmin=false;
    if(this.loggedIn()){
      this.getUser()
      this.user.roles?.toString().split(",").map(role=> {
        if(role.toLocaleLowerCase().indexOf("admin")!== -1){
           isAdmin=true;
        }

      })
    }
    return isAdmin;
  }
  loggedIn() {
    if (this.localStorageService.getToken()) {
      return true
    } else {
      return false;
    }
  }

  getUser() {
    let decodedToken = this.decodedToken(this.localStorageService.getToken());
    if (decodedToken) {
      if (this.loggedIn()) {
        let tokenInfoName = Object.keys(decodedToken).filter((u) =>
          u.endsWith('/name')
        )[0];
        let userName = String(decodedToken[tokenInfoName]);
        let name = userName.split(' ');

        let tokenInfoId = Object.keys(decodedToken).filter((x) =>
          x.endsWith('/nameidentifier')
        )[0];
        let userId = Number(decodedToken[tokenInfoId]);

        let claimInfo = Object.keys(decodedToken).filter((x) =>
          x.endsWith('/role')
        )[0];
        let roles = decodedToken[claimInfo];

        let emailInfo = decodedToken.email;
        this.user = {
          id: userId,
          firstName: name[0],
          lastName: name[name.length-1],
          email: emailInfo,
          roles: roles,
        };

      }
    }
    return this.user;
  }

  getUserById(userId:number){
    this.userService.getByUserId(userId).subscribe(response=>{
      this.user.id = response.data.userId;
      this.user.firstName = response.data.firstName;
      this.user.lastName = response.data.lastName;
      this.user.email = response.data.email;
    })
  }

  logOut(){
    this.localStorageService.removeToken()
    setTimeout(() => {
      window.location.reload();
    }, 0);
    this.router.navigate(["/cars"])
    this.toastrService.info("","Çıkış başarılı")
  }

}
