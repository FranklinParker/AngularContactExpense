import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactAddEditComponent} from './components/contact-add-edit/contact-add-edit.component';
import {SharedModule} from "../shared/shared.module";
import { ContactMainComponent } from './components/contact-main/contact-main.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import {EffectsModule} from "@ngrx/effects";
import { ContactEffects } from './contact.effects';
import { StoreModule } from '@ngrx/store';
import * as fromContact from './contact.reducer';
import * as fromContractor from './business/contractor.reducer';

import { BusinessContactHomeComponent } from './business/components/business-contact-home/business-contact-home.component';
import { BusinessContactEditComponent } from './business/components/business-contact-edit/business-contact-edit.component';
import { BusinessContactListComponent } from './business/components/business-contact-list/business-contact-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ContractorEffects} from "./business/contractor.effects";
import { AddInvoiceComponent } from './business/components/add-invoice/add-invoice.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([ContactEffects,ContractorEffects]),
    StoreModule.forFeature('contact', fromContact.reducer),
    StoreModule.forFeature('contractor', fromContractor.contractorReducer),


  ],
  declarations: [
    ContactAddEditComponent,
    ContactMainComponent,
    ContactListComponent,
    BusinessContactHomeComponent,
    BusinessContactEditComponent,
    BusinessContactListComponent,
    AddInvoiceComponent
  ],
  exports: [
    ContactMainComponent,
    BusinessContactHomeComponent
  ],
  entryComponents: [
    AddInvoiceComponent
  ]
})
export class ContactModule {
}
