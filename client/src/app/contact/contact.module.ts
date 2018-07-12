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
import { BusinessContactHomeComponent } from './business/components/business-contact-home/business-contact-home.component';
import { BusinessContactEditComponent } from './business/components/business-contact-edit/business-contact-edit.component';
import { BusinessContactListComponent } from './business/components/business-contact-list/business-contact-list.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([ContactEffects]),
    StoreModule.forFeature('contact', fromContact.reducer)

  ],
  declarations: [
    ContactAddEditComponent,
    ContactMainComponent,
    ContactListComponent,
    BusinessContactHomeComponent,
    BusinessContactEditComponent,
    BusinessContactListComponent
  ],
  exports: [
    ContactMainComponent,
    BusinessContactHomeComponent
  ]
})
export class ContactModule {
}
