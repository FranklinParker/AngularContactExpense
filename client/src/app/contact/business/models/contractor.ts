import {ContactPerson} from "./contactPerson";
import {Address} from "./address";

export interface Contractor {
  id?: string;
  companyName: string;
  servicesProvided: string[];
  address: Address;
  contacts: ContactPerson[];
}
