import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Contact} from "../../model/contact";
import {ContactService} from "../../service/contact.service";
import {MatSnackBar} from "@angular/material";
import {Store} from "@ngrx/store";
import {AppState} from "../../../reducers";
import {ContactSaved, NewContactSaved} from "../../contact.actions";
import {Update} from "@ngrx/entity";

@Component({
  selector: 'app-contact',
  templateUrl: './contact-add-edit.component.html',
  styleUrls: ['./contact-add-edit.component.css']
})
export class ContactAddEditComponent implements OnInit {
  @Input() contact: Contact;
  @Output() setToNewContactEvent = new EventEmitter();
  mask: any[] = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  constructor(private contactService: ContactService,
              private snackBar: MatSnackBar,
              private store: Store<AppState>) {
  }

  get headerMessage() {
    return this.contact.id === null ? "Adding New Contact" : "Editing Contact";
  }

  /***
   * returns true if editing an existing record
   *
   *
   * @returns {boolean}
   */
  get isEditing(): boolean {
    return !!this.contact.id;
  }

  ngOnInit() {
  }

  /**
   * save a contact-add-edit
   *
   * @param {NgForm} form
   * @returns {Promise<void>}
   */
  async onSubmit(form: NgForm) {
    if (this.contact.id === null) {
      await this.saveNewContact();
    }else {
      await this.updateExistingContact();
    }
  }

  /**
   * sets to editing a new contact
   *
   *
   */
  onSetToNewContact() {
    this.setToNewContactEvent.emit();
  }

  /**
   * saves a new contact
   *
   * @returns {Promise<void>}
   */

  private async saveNewContact() {
    const result: { success: boolean, message?: string, record?: Contact } = await this.contactService.saveNewContact(this.contact);
    if (result.success) {

      this.store.dispatch(new NewContactSaved({ contact: result.record}));
      this.snackBar.open('New Contact Saved!', '', {
        duration: 5000
      });
    } else {
      this.snackBar.open(result.message, 'Error Saving Contact', {
        duration: 9000
      });
    }
  }

  /**
   * Updates an existing contact
   *
   * @returns {Promise<void>}
   */
  private async updateExistingContact() {
    const result: { success: boolean, message?: string } = await this.contactService.updateExistingContact(this.contact);
    if (result.success) {
      this.snackBar.open('Contact Updated!', '', {
        duration: 5000
      });
    } else {
      this.snackBar.open(result.message, 'Error Saving Contact', {
        duration: 9000
      });
    }
  }
}
