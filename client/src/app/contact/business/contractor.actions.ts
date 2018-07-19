import {Action} from '@ngrx/store';
import {Update} from "@ngrx/entity";
import {Contractor} from "./models/contractor";
import {ContractorInvoice} from "./models/ContractorInvoice";

export enum ContractorActionTypes {
  LoadAllContractorAction = '[LoadAllContractorAction] Load Contacts',
  ContractorsLoadedAction = '[ContractorsLoaded] Contractor Loaded',
  ContractorSelectedAction = '[ContractorSelected] Contractor selected',
  ContractorSavedAction = '[ContractorSaved] Contractor',
  NewContractorSavedAction = '[NewContractorSavedAction] Save new',
  InvoiceSelectedAction = '[InvoiceSelectedAction] select invoice',

}

export class LoadAllContractors implements Action {
  readonly type = ContractorActionTypes.LoadAllContractorAction;

}

export class ContractorsLoaded implements Action {
  readonly type = ContractorActionTypes.ContractorsLoadedAction;

  constructor(public payload: { contractors: Contractor[] }) {

  }
}


export class ContractorSelected implements Action {
  readonly type = ContractorActionTypes.ContractorSelectedAction;

  constructor(public payload: { contractor: Contractor }) {

  }
}

export class ContractorSaved implements Action {
  readonly type = ContractorActionTypes.ContractorSavedAction;

  constructor(public payload: { contractor: Update<Contractor> }) {

  }
}


export class NewContractorSaved implements Action {
  readonly type = ContractorActionTypes.NewContractorSavedAction;

  constructor(public payload: { contractor: Contractor }) {

  }
}

export class InvoiceSelected implements Action {
  readonly type = ContractorActionTypes.InvoiceSelectedAction;

  constructor(public payload: { invoice: ContractorInvoice }) {

  }
}

export type ContractorActions = LoadAllContractors
  | ContractorsLoaded
  | ContractorSaved
  | NewContractorSaved
  | ContractorSelected
  | InvoiceSelected;
