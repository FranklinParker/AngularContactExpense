import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {ContactPerson} from "../../models/contactPerson";
import {ContractorService} from "../../service/contractor.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-business-contact-edit',
  templateUrl: './business-contact-edit.component.html',
  styleUrls: ['./business-contact-edit.component.css']
})


export class BusinessContactEditComponent implements OnInit {
  form: FormGroup;
  serviceList: string[] =[
    'Electrician',
    'Plumber',
    'House Cleaning'
  ];



  contactList: ContactPerson[] = [{
    name: 'Joe Brown',
    description: 'Repair'
  }];

  constructor(private contractorService: ContractorService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {

    this.form = this.fb.group({
      companyName: ['', Validators.required],
      street: ['', Validators.required],
      contacts: this.fb.array([]),
      servicesProvided : this.fb.array([])
    });

    const servicesProvided: FormArray = this.form.get('servicesProvided') as FormArray;
    this.serviceList.forEach((service)=>
      servicesProvided.push(this.fb.control(service)));
    console.log('servicesProvided', servicesProvided);

  }

  ngOnInit() {


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

  onAddNew() {
    const contact: ContactPerson = {
      name: 'Jay Jones',
      description: 'Helpfull'
    };
    const formCntl = this.fb.group(contact);
    (this.form.get('contacts') as FormArray).push(formCntl);
  }

  async onSave() {
    const result = await this.contractorService.saveContractor(this.form.value);
    if (result.success) {

      // this.store.dispatch(new NewContactSaved({ contact: result.record}));
      this.snackBar.open('New Contact Saved!', '', {
        duration: 5000
      });
    } else {
      this.snackBar.open(result.message, 'Error Saving Contact', {
        duration: 9000
      });
    }
  }


}
