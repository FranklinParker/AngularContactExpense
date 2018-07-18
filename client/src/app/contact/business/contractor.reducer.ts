import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {ContractorActions, ContractorActionTypes} from "./contractor.actions";
import {Contractor} from "./models/contractor";


export interface ContractorState extends EntityState<Contractor> {
  allContractorsLoaded: boolean;
  selectedContractor: Contractor;

}

export const adapter: EntityAdapter<Contractor> =
  createEntityAdapter<Contractor>();


export const initialState: ContractorState = adapter.getInitialState({
  allContractorsLoaded: false,
  selectedContractor: {
    companyName: undefined,
    servicesProvided: [],
    address: {
      street: undefined,
      city: undefined,
      state: undefined,
      zip: undefined
    },
    contacts: []
  }
});

export function contractorReducer(state = initialState, action: ContractorActions): ContractorState {
  switch (action.type) {
    case ContractorActionTypes.ContractorsLoadedAction:
      return adapter.addAll(action.payload.contractors,
        {...state, allContractorsLoaded: true});
    case ContractorActionTypes.ContractorSelectedAction:
      return { ...state, selectedContractor: action.payload.contractor}
    case ContractorActionTypes.NewContractorSavedAction:
      return adapter.addOne(action.payload.contractor, state);
    case ContractorActionTypes.ContractorSavedAction:
      return adapter.updateOne(action.payload.contractor, state);

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
