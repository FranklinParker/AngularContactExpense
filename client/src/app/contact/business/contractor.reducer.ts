import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {ContractorActions, ContractorActionTypes} from "./contractor.actions";
import {Contractor} from "./models/contractor";


export interface ContractorState extends EntityState<Contractor> {
  allContractorsLoaded: boolean;

}

export const adapter: EntityAdapter<Contractor> =
  createEntityAdapter<Contractor>();


export const initialState: ContractorState = adapter.getInitialState({
  allContractorsLoaded: false
});

export function contractorReducer(state = initialState, action: ContractorActions): ContractorState {
  switch (action.type) {
    case ContractorActionTypes.ContractorsLoadedAction:
      console.log('contractors', action.payload.contractors);
      return adapter.addAll(action.payload.contractors,
        {...state, allContractorsLoaded: true});
    case ContractorActionTypes.NewContractorSavedAction:
      console.log(' new contractor saved', action.payload);
      return adapter.addOne(action.payload.contractor,state);
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
