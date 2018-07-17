import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent} from "@angular/material";
import {Contact} from "../../../model/contact";
import {Contractor} from "../../models/contractor";
import {AppState} from "../../../../reducers";
import {Store} from "@ngrx/store";
import {selectContactPage} from "../../../contact.selector";
import {selectContractorPage} from "../../contractor.selector";
import {ContractorSelected} from "../../contractor.actions";

@Component({
  selector: 'app-business-contact-list',
  templateUrl: './business-contact-list.component.html',
  styleUrls: ['./business-contact-list.component.css']
})
export class BusinessContactListComponent implements OnInit {
  filterAll:String;
  filterCompanyName: string;
  isLoading = false;
  totalRecords = 10;
  rowsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  selectedId: string;
  contractorList: Contractor[] = [];
  dataSource = new MatTableDataSource<Contractor>([]);
  displayedColumns = ['companyName','servicesProvided'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private store:Store<AppState>) { }

  ngOnInit() {
    this.getNewPage(0,5);
  }

  onFilterAllContractors(){

  }

  /***
   * filter the cont list
   *
   * @param {string} filter
   */
  applyAnyFilter(filter: string){
    this.filterCompanyName = null;
    this.dataSource.data = this.contractorList;
    this.dataSource.filter = filter;

  }

  /**
   * change page
   *
   *
   * @param {PageEvent} pageData
   */
  onChangedPage(pageData: PageEvent) {
    this.filterAll = null;
    this.contractorList = null;
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.rowsPerPage = pageData.pageSize;
    this.getNewPage(pageData.pageIndex, pageData.pageSize);

  }

  private getNewPage(pageIndex: number, pageSize: number,filterLastName?: string){
    this.store.select(
      selectContractorPage(pageIndex ,pageSize, filterLastName))
      .subscribe((contractorPage)=>{
        console.log('selectContractorPage', contractorPage);
        this.contractorList = contractorPage.contractors;
        this.dataSource.data = this.contractorList;
        this.totalRecords = contractorPage.totalRecords;

      });

  }

  /**
   * used to highlight a row
   *
   * @param {contractor} contact
   */
  rowClicked(contractor:Contractor){
    this.selectedId = contractor.id;
  }

  /**
   * clicked a row to edit
   *
   * @param {Contact} contact
   */
  edit(contractor: Contractor){
    this.store.dispatch(new ContractorSelected({contractor}));
  }



}
