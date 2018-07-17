import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  ContractorActionTypes,
  ContractorsLoaded,
  LoadAllContractors} from "./contractor.actions";
import {filter,  mergeMap, withLatestFrom} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {isContractorsLoaded} from "./contractor.selector";
import {ContractorService} from "./service/contractor.service";


@Injectable()
export class ContractorEffects {
  @Effect()
  contactLoad$ = this.actions$.pipe(
    ofType<LoadAllContractors>(ContractorActionTypes.LoadAllContractorAction),
    withLatestFrom(this.store.pipe(select(isContractorsLoaded))),
    filter(([action, isContractorsLoaded]) => {
      return !isContractorsLoaded;
    }),
    mergeMap(async () => {
      const contractors = await this.contractorService.getAllContractors();
      return new ContractorsLoaded({contractors: contractors});

    })
  );
  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private contractorService: ContractorService) {}
}
