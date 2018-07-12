import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Contact} from "../model/contact";
import {Subject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  getUrl = environment.apiUrl + 'contact';
  postUrl = environment.apiUrl + 'contact';
  contactList: Contact[] = [];
  private contactListSubject = new Subject<{ numberRecords: number, contacts: Contact[] }>();


  constructor(private http: HttpClient) {
  }

  /**
   * get contact records and number of records
   *
   * @returns {Promise<any>}
   */
  async getContacts(currentPage?: number, pageSize?: number): Promise<any> {

    const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;
    console.log('queryParams', queryParams);
    const url = this.getUrl + queryParams;
    try {
      const data: { numberRecords: number, contacts: Contact[] } = await
        this.http.get<{ success: boolean, records: any, numberRecords: number }>(url)
          .pipe(map(contactData => {
            return {
              numberRecords: contactData.numberRecords,
              contacts: contactData.records.map(record => {
                return {
                  id: record._id,
                  lastName: record.lastName,
                  firstName: record.firstName,
                  phone: record.phone,
                  email: record.email
                };
              })

            };
          })).toPromise();
      this.contactList = data.contacts;
      this.contactListSubject.next(
        {
          numberRecords: data.numberRecords,
          contacts: this.contactList
        });
    } catch (e) {
      console.log('error getting contacts', e);
    }


  }

  /**
   * get contact records and number of records
   *
   * @returns {Promise<any>}
   */
  async getAllContacts(): Promise<any> {

    const url = this.getUrl;
    try {
      const data: { numberRecords: number, contacts: Contact[] } = await
        this.http.get<{ success: boolean, records: any, numberRecords: number }>(url)
          .pipe(map(contactData => {
            return {
              numberRecords: contactData.numberRecords,
              contacts: contactData.records.map(record => {
                return {
                  id: record._id,
                  lastName: record.lastName,
                  firstName: record.firstName,
                  phone: record.phone,
                  email: record.email
                };
              })
            };
          })).toPromise();
      return data.contacts;

    } catch (e) {
      console.log('error getting contacts', e);
      return [];
    }


  }

  /**
   * listens to changes in the contact list subject
   *
   * @returns {Observable<Contact[]>}
   */
  getContactListObservable() {
    return this.contactListSubject.asObservable();
  }


  /**
   *
   * save a new contact
   *
   * @param {Contact} contact
   * @returns {Promise<any>}
   */
  async saveNewContact(contact: Contact): Promise<{ success: boolean, message?: string,record?:Contact }> {
    try {
      const result =
        await this.http.post<{ success: boolean, record?: any, numberRecords?: number, message?: string }>
        (this.postUrl, contact)
          .pipe(map(result => {
            if (result.success) {
              return {
                success: result.success,
                numberRecords: result.numberRecords,
                record: {
                  id: result.record._id,
                  firstName: result.record.firstName,
                  lastName: result.record.lastName,
                  email: result.record.email,
                  phone: result.record.phone
                }

              };
            } else {
              return {
                success: result.success,
                message: result.message

              };
            }

          })).toPromise();
      console.log('contact new save result', result);
      if (result.success) {
        this.contactList.push(result.record);
        this.contactListSubject.next(
          {
            numberRecords: result.numberRecords,
            contacts: this.contactList
          });
      }
      return result;
    } catch (e) {
      console.log('error saving contact-add-edit', e);
      return {
        success: false,
        message: 'System Error Saving Record'
      };

    }
  }


  /**
   *
   * updates an existing contact
   *
   * @param {Contact} contact
   * @returns {Promise<any>}
   */
  async updateExistingContact(contact: Contact): Promise<{ success: boolean, message?: string }> {
    try {
      const result = await this.http.put<any>(this.postUrl,
        contact
      )
        .pipe(map(result => {
          return result;
        })).toPromise();
      console.log('contact update save result', result);
      return result;
    } catch (e) {
      console.log('error saving contact', e);
      return {
        success: false,
        message: 'System Error Saving Record'
      };

    }
  }
}
