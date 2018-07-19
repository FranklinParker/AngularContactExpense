import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {ContractorActions, ContractorActionTypes} from "./contractor.actions";
import {Contractor} from "./models/contractor";
import {ContractorInvoice} from "./models/ContractorInvoice";


export interface ContractorState extends EntityState<Contractor> {
  allContractorsLoaded: boolean;
  selectedContractor: Contractor;
  selectedInvoice: ContractorInvoice;

}

export const adapter: EntityAdapter<Contractor> =
  createEntityAdapter<Contractor>();

export const BLANK_CONTRACTOR: Contractor={
  companyName: undefined,
  servicesProvided: [],
  address: {
    street: undefined,
    city: undefined,
    state: undefined,
    zip: undefined
  },
  contacts: [],
  invoices: []
};

export const initialState: ContractorState = adapter.getInitialState({
  allContractorsLoaded: false,
  selectedContractor: BLANK_CONTRACTOR,
  selectedInvoice: undefined
});

export function contractorReducer(state = initialState, action: ContractorActions): ContractorState {
  switch (action.type) {
    case ContractorActionTypes.ContractorsLoadedAction:
      return adapter.addAll(action.payload.contractors,
        {...state, allContractorsLoaded: true});
    case ContractorActionTypes.BlankContractorSelectedAction:
      return { ...state, selectedContractor: BLANK_CONTRACTOR}

    case ContractorActionTypes.ContractorSelectedAction:
      return { ...state, selectedContractor: action.payload.contractor}
    case ContractorActionTypes.NewContractorSavedAction:
      return adapter.addOne(action.payload.contractor, state);
    case ContractorActionTypes.ContractorSavedAction:
      return adapter.updateOne(action.payload.contractor, state);
    case ContractorActionTypes.InvoiceSelectedAction:
      return { ...state, selectedInvoice: action.payload.invoice};
    default:
      return state;
  }
}


export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal

} = adapter.getSelectors();
