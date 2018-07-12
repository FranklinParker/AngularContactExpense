import {Component, OnInit} from '@angular/core';
import {Contact} from "../../model/contact";
import {ContactService} from "../../service/contact.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../reducers";
import {ContactActionTypes, LoadAllContacts} from "../../contact.actions";
import {selectContactPage} from "../../contact.selector";

@Component({
  selector: 'app-contact-main',
  templateUrl: './contact-main.component.html',
  styleUrls: ['./contact-main.component.css']
})
export class ContactMainComponent implements OnInit {
  contact: Contact = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null
  };
  selectedTabIndex = 0;

  constructor(private contactService: ContactService,
              private store: Store<AppState>) {
  }

  async ngOnInit() {
    this.store.dispatch(new LoadAllContacts());

    //await this.contactService.getContacts(1, 5);

  }

  /**
   * a contact is selected go to edit tab
   *
   *
   * @param {Contact} contact
   */
  onEditContact(contact: Contact){
    this.contact = contact;
    this.selectedTabIndex = 1;
  }

  /**
   *
   *
   */
  onSetToNewContact(){
    this.contact = {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null

    }
    console.log('reset contact',  this.contact)
  }

}
