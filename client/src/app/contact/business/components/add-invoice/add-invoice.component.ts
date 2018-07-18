import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Contractor} from "../../models/contractor";

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: {contractor: Contractor},
              public dialogRef: MatDialogRef<any>) { }

  ngOnInit() {
    console.log('contractor', this.data.contractor);
  }

  onClose(){
    this.dialogRef.close();
  }

}
