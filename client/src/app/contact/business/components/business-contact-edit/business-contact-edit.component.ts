import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {Address} from "../../models/address";
import {ContactPerson} from "../../models/contactPerson";

@Component({
  selector: 'app-business-contact-edit',
  templateUrl: './business-contact-edit.component.html',
  styleUrls: ['./business-contact-edit.component.css']
})



export class BusinessContactEditComponent implements OnInit {
  form: FormGroup;

  contactList: ContactPerson[] = [{
    name: 'Joe Brown',
    desription: 'Repair'
  }];

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {


    this.form = this.fb.group({
      companyName: ['', Validators.required],
      street: ['', Validators.required],
      contacts: this.fb.array([])
    });
    this.setContacts();
  }

  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  setContacts() {
    const contactFGs = this.contactList.map(address => this.fb.group(address));
    const contactFormArray = this.fb.array(contactFGs);
    this.form.setControl('contacts', contactFormArray);
  }

  onAddNew(){
    const contact:ContactPerson ={
      name: 'Jay Jones',
      desription: 'Helpfull'
    };
    const formCntl = this.fb.group(contact);
    (this.form.get('contacts') as FormArray).push(formCntl);
  }

  onSave() {
    console.log('form', this.form.value);
  }


}
