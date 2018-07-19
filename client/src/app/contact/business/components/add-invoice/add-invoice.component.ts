import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatTableDataSource} from "@angular/material";
import {Contractor} from "../../models/contractor";
import {ContractorInvoice} from "../../models/ContractorInvoice";
import {InvoiceLine} from "../../models/InvoiceLines";
import {ContractorService} from "../../service/contractor.service";

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
  contractor: Contractor;


  dataSource = new MatTableDataSource<InvoiceLine>(null);
  displayedColumns = ['amount','itemDescription','delete'];
  constructor(@Inject(MAT_DIALOG_DATA)
              public data: {contractor: Contractor},
              public dialogRef: MatDialogRef<any>,
              private contractorService: ContractorService,
              private snackBar: MatSnackBar) {
    this.contractor = data.contractor;
  }

  ngOnInit() {
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
  /***
   *
   *
   */
  onAddInvoiceLine(){
    this.invoice.invoiceLines.push({
      itemDescription: 'Description',
      amount: 0
    });
    this.dataSource.data = this.invoice.invoiceLines;
  }

  /**
   *
   *
   */
  async onSave(){
    this.contractor.invoices.push(this.invoice);
    console.log('contractor', this.contractor);
    const result = await this.contractorService.updateExistingContractor(this.contractor);
    console.log('result', result);

    if (result.success) {
      this.snackBar.open('Invoice Saved!', '', {
        duration: 5000
      });
    } else {
      this.snackBar.open(result.message, 'Error Saving Contractor', {
        duration: 9000
      });
    }

  }

  /**
   * delete invoice line
   *
   *
   * @param {InvoiceLine} invoiceLine
   */
  deleteItem(invoiceLine:InvoiceLine){
    const idx = this.invoice.invoiceLines.indexOf(invoiceLine);

    if(idx!=-1){
      this.invoice.invoiceLines.splice(idx,1);
      this.dataSource.data = this.invoice.invoiceLines;
    }
  }



}
