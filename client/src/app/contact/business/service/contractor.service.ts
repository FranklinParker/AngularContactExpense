import { Injectable } from '@angular/core';
import {Contractor} from "../models/contractor";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {createLContainer} from "@angular/core/src/render3/instructions";
import {SaveResult} from "../../../shared/models/SaveResult";
import {map} from "rxjs/operators";
import {Contact} from "../../model/contact";

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
  async saveContractor(contactor: Contractor): Promise<SaveResult>{
    console.log('saving', JSON.stringify(contactor,null, 2));
    try{
      const result =
        await this.http.post<{ success: boolean, record?: any, numberRecords?: number, message?: string }>
        (this.postUrl, contactor).toPromise();
      console.log('result of save', result);
      return result;
    }catch (e) {
      console.log('e', e);
      return {
        success: false,
        message: ' Save Failed'
      }


    }


  }

  /**
   * get contractor records and number of records
   *
   * @returns {Promise<any>}
   */
  async getAllContractors(): Promise<any> {

    const url = this.postUrl;
    try {
      const data: { numberRecords: number, contractor: Contractor[] } = await
        this.http.get<{ success: boolean, records: any, numberRecords: number }>(url)
          .pipe(map(contractorData => {
            console.log('contractorData', contractorData);
            return {
              numberRecords: contractorData.numberRecords,
              contractor: contractorData.records.map(record => {
                return {
                  id: record._id,
                  contractorName: record.companyName,
                  servicesProvided: record.servicesProvided,
                  address: record.address,
                  contacts: record.contacts
                };
              })
            };
          })).toPromise();
      return data.contractor;

    } catch (e) {
      console.log('error getting contractors', e);
      return [];
    }


  }



}
