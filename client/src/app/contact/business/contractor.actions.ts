import { Action } from '@ngrx/store';
import {Update} from "@ngrx/entity";
import {Contractor} from "./models/contractor";

export enum ContractorActionTypes {
  LoadAllContractorAction = '[LoadAllContractorAction] Load Contacts',
  ContractorsLoadedAction = '[ContractorsLoaded] Contractor Loaded',
  ContractorSavedAction = '[ContractorSaved] Contractor',
  NewContractorSavedAction = '[NewContractorSavedAction] Save new'

}

export class LoadAllContractors implements Action {
  readonly type = ContractorActionTypes.LoadAllContractorAction;

}

export class ContractorsLoaded implements Action {
  readonly type = ContractorActionTypes.ContractorsLoadedAction;
  constructor(public payload: { contractors:Contractor[]}){

  }
}


export class ContractorSaved implements Action {
  readonly type = ContractorActionTypes.ContractorSavedAction;
  constructor(public payload: { contractor:  Update<Contractor>}){

  }
}


export class NewContractorSaved implements Action {
  readonly type = ContractorActionTypes.NewContractorSavedAction;
  constructor(public payload: { contractor:  Contractor}){

  }
}



export type ContractorActions = LoadAllContractors
  | ContractorsLoaded
  | ContractorSaved
  | NewContractorSaved;
