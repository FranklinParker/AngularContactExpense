import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-business-contact-home',
  templateUrl: './business-contact-home.component.html',
  styleUrls: ['./business-contact-home.component.css']
})
export class BusinessContactHomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onGoto(location: string){
    this.router.navigate([location]);
  }

}
