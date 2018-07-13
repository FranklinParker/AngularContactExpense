import { Injectable } from '@angular/core';
import {Contractor} from "../models/contractor";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {createLContainer} from "@angular/core/src/render3/instructions";

@Injectable({
  providedIn: 'root'
})
export class ContractorService {
  postUrl = environment.apiUrl + 'contractor';

  constructor(private http: HttpClient) { }

  /**
   * save a new contractor
   *
   *
   * @param {Contractor} contactor
   * @returns {Promise<void>}
   */
  async saveContractor(contactor: Contractor){
    console.log('saving', JSON.stringify(contactor,null, 2));
    try{
      const result =
        await this.http.post<{ success: boolean, record?: any, numberRecords?: number, message?: string }>
        (this.postUrl, contactor).toPromise();
      console.log('result of save', result);
    }catch (e) {
      console.log('e', e);

    }


  }


}
