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
      {
        itemDescription: 'test',
        amount: 50
      }
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

  onClose(){
    this.dialogRef.close();
  }

}
