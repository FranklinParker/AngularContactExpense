import { Action } from '@ngrx/store';
import {Contact} from "./model/contact";
import {Update} from "@ngrx/entity";

export enum ContactActionTypes {
  LoadAllContactsAction = '[LoadAllContactsAction] Load Contacts',
  ContactsLoadedAction = '[ContactsLoaded] Contacts Loaded',
  ContactSavedAction = '[ContactSaved] Contact',
  NewContactSavedAction = '[NewContactSavedAction] Save new'

}

export class LoadAllContacts implements Action {
  readonly type = ContactActionTypes.LoadAllContactsAction;

}

export class ContactsLoaded implements Action {
  readonly type = ContactActionTypes.ContactsLoadedAction;
  constructor(public payload: { contacts:Contact[]}){

  }
}


export class ContactSaved implements Action {
  readonly type = ContactActionTypes.ContactSavedAction;
  constructor(public payload: { contact:  Update<Contact>}){

  }
}


export class NewContactSaved implements Action {
  readonly type = ContactActionTypes.NewContactSavedAction;
  constructor(public payload: { contact:  Contact}){

  }
}



export type ContactActions = LoadAllContacts
  | ContactsLoaded
  | ContactSaved
  | NewContactSaved;
