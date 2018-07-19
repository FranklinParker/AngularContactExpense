import {ContactPerson} from "./contactPerson";
import {Address} from "./address";
import {ContractorInvoice} from "./ContractorInvoice";

export interface Contractor {
  id?: string;
  companyName: string;
  servicesProvided: string[];
  address: Address;
  contacts: ContactPerson[];
  invoices: ContractorInvoice[];
}
