import {InvoiceLine} from "./InvoiceLines";

export interface ContractorInvoice {
  description: string;
  dateInvoice: Date;
  totalAmount?: number;
  invoiceLines: InvoiceLine[]
}
