import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../reducers";
import {LoadAllContractors} from "../../contractor.actions";
import {getSelectedContractor} from "../../contractor.selector";

@Component({
  selector: 'app-business-contact-home',
  templateUrl: './business-contact-home.component.html',
  styleUrls: ['./business-contact-home.component.css']
})
export class BusinessContactHomeComponent implements OnInit {
  selectedTabIndex = 0;
  constructor(private router:Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadAllContractors());
    this.store
      .select(getSelectedContractor).subscribe(contractor=>{
        if(contractor.id){
          this.selectedTabIndex = 1;
        }
    });
  }

}
