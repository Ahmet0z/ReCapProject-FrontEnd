import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(
    private toastrService: ToastrService,
  ) { }


  responseErrorMessages(responseError:any){
    if(responseError.error.Errors){
      for(let i =0; i<responseError.error.Errors.length; i++){
        this.toastrService.error(responseError.error.Errors[i].ErrorMessage);
      }
    }else{
      this.toastrService.error(responseError.error)
    }
  }

}
