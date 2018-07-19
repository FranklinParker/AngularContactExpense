import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from "@angular/material";
import {Contractor} from "../../models/contractor";
import {ContractorInvoice} from "../../models/ContractorInvoice";
import {AppState} from "../../../../reducers";
import {Store} from "@ngrx/store";
import {getSelectedContractor} from "../../contractor.selector";
import {InvoiceSelected} from "../../contractor.actions";
import {AddInvoiceComponent} from "../add-invoice/add-invoice.component";

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.css']
})
export class ViewInvoicesComponent implements OnInit {
  contractor: Contractor;
  dataSource = new MatTableDataSource<ContractorInvoice>(null);
  displayedColumns = ['invoiceDate', 'description', 'total'];


  constructor(@Inject(MAT_DIALOG_DATA)
              public data: { contractor: Contractor },
              public dialogRef: MatDialogRef<any>,
              private store: Store<AppState>,
              private matDialog: MatDialog) {

  }

  ngOnInit() {
    this.store.select(getSelectedContractor)
      .subscribe((contractor: Contractor) => {
          this.contractor = contractor;
          this.dataSource.data = this.contractor.invoices;
          this.calcInvoiceTotals();
        }
      );

  }

  onClose() {
    this.dialogRef.close();
  }

  /**
   * select invoice to edit
   *
   *
   * @param {ContractorInvoice} invoice
   */
  onEdit(invoice: ContractorInvoice){
    this.store.dispatch( new InvoiceSelected({invoice}));
    this.dialogRef.close();
    this.matDialog.open(AddInvoiceComponent, {
      data: { isAddNew: false },
      width: '85%',
      disableClose: true
    });
  }

  private calcInvoiceTotals() {
    this.contractor.invoices.forEach(invoice => {
      let total = 0;
      invoice.invoiceLines.forEach(invoiceLine => {
        total += invoiceLine.amount;
      });
      invoice.totalAmount = total;
    })

  }


}
