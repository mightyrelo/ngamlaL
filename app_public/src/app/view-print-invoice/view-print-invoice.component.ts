import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import {switchMap} from 'rxjs/operators';

import { CompanyDataService } from '../company-data.service';
import { CustomerDataService } from '../customer-data.service';
import { InvoiceDataService } from '../invoice-data.service';
import { Company } from '../company';
import { Customer, Invoice } from '../customer';


@Component({
  selector: 'app-view-print-invoice',
  templateUrl: './view-print-invoice.component.html',
  styleUrls: ['./view-print-invoice.component.css']
})
export class ViewPrintInvoiceComponent implements OnInit {

  

  public company : Company;
  public customer : Customer;
  public invoice: Invoice;

  public foundId : string;
  
  constructor(
    private companyDataService : CompanyDataService,
    private invoiceDataService: InvoiceDataService,
    private customerDataService: CustomerDataService,
    private route: ActivatedRoute

  ) { }

 

  private getCompany() : void {
    this.companyDataService.readCompany('63563a51f2aebf78da7348a7') //  63ad639ce44e1cd8465b1858
      .then(resp => {this.company = resp; console.log(this.company)});
  }

 
  ngOnInit() : void {
 
      this.getCompany();
      console.log('company', this.company);
      this.route.paramMap
      .pipe(
      switchMap((params: ParamMap) => {
        let id = params.get('customerId');
        this.foundId = id;
        return this.customerDataService.getCustomer(id);
      })
      )
      .subscribe((newCustomer: Customer) => {
        console.log('customer', this.customer);
        this.customer = newCustomer;
        this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            let iId = params.get('invoiceId');
            return this.invoiceDataService.readInvoice(this.foundId, iId);
          })
        )
        .subscribe((inv: Invoice) => {         
          this.invoice = inv;
          console.log('inv', this.invoice);
        })
      })
  }


}
