import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../reducers";
import {LoadAllContractors} from "../../contractor.actions";

@Component({
  selector: 'app-business-contact-home',
  templateUrl: './business-contact-home.component.html',
  styleUrls: ['./business-contact-home.component.css']
})
export class BusinessContactHomeComponent implements OnInit {

  constructor(private router:Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadAllContractors());
  }

  onGoto(location: string){
    this.router.navigate([location]);
  }

}
