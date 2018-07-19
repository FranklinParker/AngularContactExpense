import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from "@angular/material";
import {Contractor} from "../../models/contractor";
import {ContractorInvoice} from "../../models/ContractorInvoice";
import {InvoiceLine} from "../../models/InvoiceLines";

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {


  invoice: ContractorInvoice ={
    dateInvoice: null,
    description: null,
    invoiceLines:[
    ]

  };

  dataSource = new MatTableDataSource<InvoiceLine>(null);
  displayedColumns = ['amount','itemDescription','delete'];
  constructor(@Inject(MAT_DIALOG_DATA)
              public data: {contractor: Contractor},
              public dialogRef: MatDialogRef<any>) { }

  ngOnInit() {
    console.log('contractor', this.data.contractor);
    this.dataSource.data = this.invoice.invoiceLines;
  }

  /**
   * Close the dialog
   *
   *
   */
  onClose(){
    this.dialogRef.close();
  }

  onAddInvoiceLine(){
    this.invoice.invoiceLines.push({
      itemDescription: 'Description',
      amount: 0
    });
    this.dataSource.data = this.invoice.invoiceLines;
  }

}
