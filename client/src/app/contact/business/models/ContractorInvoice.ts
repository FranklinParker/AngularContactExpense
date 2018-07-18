import {InvoiceLine} from "./InvoiceLines";

export interface ContractorInvoice {
  description: string;
  dateInvoice: Date;
  invoiceLines: InvoiceLine[]



}
