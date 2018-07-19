import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatTableDataSource} from "@angular/material";
import {ContractorService} from "../../service/contractor.service";
import {Contractor} from "../../models/contractor";
import {InvoiceLine} from "../../models/InvoiceLines";
import {ContractorInvoice} from "../../models/ContractorInvoice";

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.css']
})
export class ViewInvoicesComponent implements OnInit {
  contractor: Contractor;
  dataSource = new MatTableDataSource<ContractorInvoice>(null);
  displayedColumns = ['invoiceDate','description','total'];
  constructor(@Inject(MAT_DIALOG_DATA)
              public data: {contractor: Contractor},
              public dialogRef: MatDialogRef<any>) {
    this.contractor = data.contractor;
    this.dataSource.data = this.contractor.invoices;
  }

  ngOnInit() {
    this.calcInvoiceTotals();
  }

  onClose(){
    this.dialogRef.close();
  }

  private calcInvoiceTotals(){
    this.contractor.invoices.forEach(invoice=>{
      let total = 0;
      invoice.invoiceLines.forEach(invoiceLine=>{
        total+= invoiceLine.amount;
      });
      invoice.totalAmount = total;
    })

  }


}
