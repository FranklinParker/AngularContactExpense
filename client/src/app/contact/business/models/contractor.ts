import {ContactPerson} from "./contactPerson";

export interface Contractor {
  companyName: string;
  servicesProvided: string[];
  contacts: ContactPerson[];
}
