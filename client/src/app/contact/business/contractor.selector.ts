import {createSelector} from '@ngrx/store';

import * as fromContractors from './contractor.reducer';


export const selectContractorState = state => state.contractor;


export const isContractorsLoaded = createSelector(
  selectContractorState,
  contractor => contractor.allContractorsLoaded
);

export const getAllContacts = createSelector(
  selectContractorState,
  fromContractors.selectAll
);

export const getSelectedContractor = createSelector(
  selectContractorState,
  contractor => contractor.selectedContractor
);

export const getSelectedInvoice = createSelector(
  selectContractorState,
  contractor => contractor.selectedInvoice

);




export const selectContractorPage =
  (page: number, nbrRecords: number, companyNameFilter?: string) =>
    createSelector(
      getAllContacts,
      contractors => {
        if (!contractors || contractors.length === 0) {
          return {
            contractors: [],
            totalRecords: 0
          }
        }
        if (companyNameFilter) {
          contractors = contractors.filter(contact => contact.companyName.lastIndexOf(companyNameFilter) > -1)
        }


        const start = page * nbrRecords;
        const end = start + nbrRecords;

        return {
          contractors: contractors.slice(start, end),
          totalRecords: contractors.length
        }


      }
    );


