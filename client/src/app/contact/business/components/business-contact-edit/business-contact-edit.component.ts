import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {ContactPerson} from "../../models/contactPerson";
import {ContractorService} from "../../service/contractor.service";
import {MatSnackBar} from "@angular/material";
import {AppState} from "../../../../reducers";
import {Store, select} from "@ngrx/store";
import {getSelectedContractor} from "../../contractor.selector";
import {tap} from 'rxjs/operators';
import {Contractor} from "../../models/contractor";

@Component({
  selector: 'app-business-contact-edit',
  templateUrl: './business-contact-edit.component.html',
  styleUrls: ['./business-contact-edit.component.css']
})


export class BusinessContactEditComponent implements OnInit {
  form: FormGroup;
  serviceList: string[] = [
    'Electrician',
    'Plumber',
    'House Cleaning'
  ];
  contractor: Contractor;

  constructor(private contractorService: ContractorService,
              private fb: FormBuilder,
              private store: Store<AppState>,
              private snackBar: MatSnackBar) {

    this.form = this.fb.group({
      companyName: ['', Validators.required],
      address: this.fb.group({ // <-- the child FormGroup
        street: '',
        city: '',
        state: '',
        zip: ''
      }),
      contacts: this.fb.array([]),
      servicesProvided: this.fb.array([])
    });

    const servicesProvided: FormArray = this.form.get('servicesProvided') as FormArray;
    this.serviceList.forEach((service) =>
      servicesProvided.push(this.fb.control(service)));
    console.log('servicesProvided', servicesProvided);

  }

  ngOnInit() {
    this.store
      .select(getSelectedContractor).subscribe(contractor => {
      console.log('contractor', contractor);
      this.contractor = contractor;
      this.setContactForm()
    });


  }

  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  private setContactForm(){
    const contactFGs = this.contractor.contacts.map(contact => this.fb.group(contact));
    const contactFormArray = this.fb.array(contactFGs);
    this.form.setControl('contacts', contactFormArray);

    const addressGroup: FormGroup = this.fb.group(this.contractor.address);
    this.form.setControl('address', addressGroup);

  }



  onAddNew() {
    const contact: ContactPerson = {
      name: 'Jay Jones',
      description: 'Helpfull',
      email: '',
      phone: ''
    };
    const formCntl = this.fb.group(contact);
    (this.form.get('contacts') as FormArray).push(formCntl);
  }

  async onSave() {
    const result = await this.contractorService.saveContractor(this.form.value);
    if (result.success) {

      // this.store.dispatch(new NewContactratorSaved({ contact: result.record}));
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
