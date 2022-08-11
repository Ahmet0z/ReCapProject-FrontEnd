import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  imgurl = environment.imageUrl;
  inst = "http://10.76.218.134:8080/images/inst.png";
  insta = this.imgurl + "images/inst.png";
  linkedin = this.imgurl + "images/lnkdn.png";
  constructor() { }

  ngOnInit(): void {
  }

}
