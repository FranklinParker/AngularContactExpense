import {Action} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Contact} from "./model/contact";
import {ContactActions, ContactActionTypes} from "./contact.actions";


export interface ContactState extends EntityState<Contact> {
  allContactsLoaded: boolean;

}

export const adapter: EntityAdapter<Contact> =
  createEntityAdapter<Contact>();


export const initialState: ContactState = adapter.getInitialState({
  allContactsLoaded: false
});

export function reducer(state = initialState, action: ContactActions): ContactState {
  switch (action.type) {
    case ContactActionTypes.ContactsLoadedAction:
      return adapter.addAll(action.payload.contacts, {...state, allContactsLoaded: true});
    case ContactActionTypes.NewContactSavedAction:
      console.log(' new contact saved', action.payload);
      return adapter.addOne(action.payload.contact,state);

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
