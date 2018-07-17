import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../reducers";
import {LoadAllContractors} from "../../contractor.actions";
import {Contractor} from "../../models/contractor";
import {getSelectedContractor} from "../../contractor.selector";

@Component({
  selector: 'app-business-contact-home',
  templateUrl: './business-contact-home.component.html',
  styleUrls: ['./business-contact-home.component.css']
})
export class BusinessContactHomeComponent implements OnInit {
  contractor: Contractor = {
    companyName: 'test',
    servicesProvided: [],
    address: {
      street: 'main st',
      city: 'ny',
      state: 'ny',
      zip: '99999'
    },
    contacts: [
      { name: 'joe',
        description: 'test',
        email: 'email',
        phone: '8888'
      }
    ]

  };
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

  onGoto(location: string){
    this.router.navigate([location]);
  }

}
