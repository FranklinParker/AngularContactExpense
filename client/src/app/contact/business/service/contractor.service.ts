import { Injectable } from '@angular/core';
import {Contractor} from "../models/contractor";

@Injectable({
  providedIn: 'root'
})
export class ContractorService {

  constructor() { }

  saveContractor(contactor: Contractor){
    console.log('saving', JSON.stringify(contactor,null, 2));

  }
}
