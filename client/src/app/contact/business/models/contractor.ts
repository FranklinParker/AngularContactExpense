import {ContactPerson} from "./contactPerson";
import {Address} from "./address";

export interface Contractor {
  companyName: string;
  servicesProvided: string[];
  address: Address;
  contacts: ContactPerson[];
}
