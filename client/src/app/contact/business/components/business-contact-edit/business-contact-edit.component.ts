import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {Address} from "../../models/address";

@Component({
  selector: 'app-business-contact-edit',
  templateUrl: './business-contact-edit.component.html',
  styleUrls: ['./business-contact-edit.component.css']
})



export class BusinessContactEditComponent implements OnInit {
  form: FormGroup;

  addressLines: Address[] = [{
    street: 'main st',
    city: 'boston'
  }];

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {


    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      addresses: this.fb.array([])
    });
    this.setAddresses();
  }

  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  setAddresses() {
    const addressFGs = this.addressLines.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.form.setControl('addresses', addressFormArray);
  }

  onAddNew(){
    const address:Address ={
      street: 'new st',
        city: 'new city'
    };
    const formCntl = this.fb.group(address);
    (this.form.get('addresses') as FormArray).push(formCntl);
  }

  onSave() {
    console.log('form', this.form.value);
  }


}
