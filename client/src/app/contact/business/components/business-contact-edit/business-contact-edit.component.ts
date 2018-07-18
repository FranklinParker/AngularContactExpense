import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {ContactPerson} from "../../models/contactPerson";
import {ContractorService} from "../../service/contractor.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {AppState} from "../../../../reducers";
import {Store, select} from "@ngrx/store";
import {getSelectedContractor} from "../../contractor.selector";
import {tap} from 'rxjs/operators';
import {Contractor} from "../../models/contractor";
import {ContractorSaved, NewContractorSaved} from "../../contractor.actions";
import {Update} from "@ngrx/entity";
import {AddInvoiceComponent} from "../add-invoice/add-invoice.component";

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
  servicesProvided: string [];

  constructor(private contractorService: ContractorService,
              private fb: FormBuilder,
              private store: Store<AppState>,
              private snackBar: MatSnackBar,
              private matDialog: MatDialog) {

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

  }

  ngOnInit() {
    this.store
      .select(getSelectedContractor).subscribe(contractor => {
      this.contractor = contractor;
      this.setContractorForm()
    });


  }

  /**
   * add new Invoice for this contractor
   *
   */
  onAddInvoice(){
    this.matDialog.open(AddInvoiceComponent,{
      data: {
        contractor: this.contractor
      },
      disableClose: true
    });
  }

  onViewInvoices(){
    alert('view invoices');
  }
  /**
   * get all contacts
   *
   * @returns {FormArray}
   */

  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  private setContractorForm(){
    const companyNameCntrl:FormControl = this.fb.control(this.contractor.companyName);
    this.form.setControl('companyName', companyNameCntrl);

    const contactFGs = this.contractor.contacts.map(contact => this.fb.group(contact));
    const contactFormArray = this.fb.array(contactFGs);
    this.form.setControl('contacts', contactFormArray);

    const addressGroup: FormGroup = this.fb.group(this.contractor.address);
    this.form.setControl('address', addressGroup);
    this.servicesProvided = this.contractor.servicesProvided;

  }

  /**
   *
   *
   *
   * @param {string} a
   * @param {string} b
   * @returns {boolean}
   */
  selectedServiceProvided(a: string,b:string){
    return a === b;
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
    if (this.contractor.id) {
      await this.updateContractor();
    } else {
      await this.saveNewContractor();

    }
  }

  /**
   *
   *
   * @returns {Promise<void>}
   */
  private async saveNewContractor(){
    const contractor: Contractor = this.form.value;
    contractor.servicesProvided = this.servicesProvided;

    const result = await this.contractorService.saveContractor(contractor);
    if (result.success) {

      this.store.dispatch(new NewContractorSaved({ contractor: result.record}));
      this.snackBar.open('New Contractor Saved!', '', {
        duration: 5000
      });
    } else {
      this.snackBar.open(result.message, 'Error Saving Contractor', {
        duration: 9000
      });
    }
  }

  /**
   *
   *
   * @returns {Promise<void>}
   */
  private async updateContractor(){
    const contractor: Contractor = this.form.value;
    contractor.servicesProvided = this.servicesProvided;
    contractor.id = this.contractor.id;
    const result = await this.contractorService.updateExistingContractor(contractor);
    if (result.success) {
      const contractorUpdate: Update<Contractor> = {
        id: this.contractor.id,
        changes: contractor
      };
      this.store.dispatch(new ContractorSaved({ contractor: contractorUpdate}));
      this.snackBar.open('Contractor Updated!', '', {
        duration: 5000
      });
    } else {
      this.snackBar.open(result.message, 'Error Saving Contractor', {
        duration: 9000
      });
    }
  }


}
