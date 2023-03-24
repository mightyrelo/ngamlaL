import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {switchMap} from 'rxjs/operators';

import { CompanyDataService } from '../company-data.service';
import { CustomerDataService } from '../customer-data.service';
import { QuotationDataService } from '../quotation-data.service';
import { Company } from '../company';
import { Customer, Quote } from '../customer';


@Component({
  selector: 'app-view-print',
  templateUrl: './view-print.component.html',
  styleUrls: ['./view-print.component.css']
})
export class ViewPrintComponent implements OnInit {

  public company : Company;
  public customer : Customer;
  public quote: Quote;

  public foundId : string;
  
  constructor(
    private companyDataService : CompanyDataService,
    private quoteDataService: QuotationDataService,
    private customerDataService: CustomerDataService,
    private route: ActivatedRoute

  ) { }

  public printQuote(cusId: string, qId: string) : void {
    this.getCompany();
    this.getCustomer(cusId);
    this.getQuote(cusId, qId);
  }

  private getCompany() : void {
    this.companyDataService.readCompany('63ad639ce44e1cd8465b1858')// 63563a51f2aebf78da7348a7
       .then(resp => {this.company = resp; console.log(this.company)});
  }

  private getCustomer(id: string) : void {
    this.customerDataService.getCustomer(id)
      .then(resp => {this.customer = resp; console.log(this.customer)});
  }

  private getQuote(cusId: string, qId: string) : void {
    this.quoteDataService.readQuote(cusId, qId)
      .then(rsp => {this.quote = rsp;});
  }

  ngOnInit() : void {
      this.getCompany();
      this.route.paramMap
      .pipe(
      switchMap((params: ParamMap) => {
        let id = params.get('customerId');
        this.foundId = id;
        return this.customerDataService.getCustomer(id);
      })
      )
      .subscribe((newCustomer: Customer) => {
        this.customer = newCustomer;
        this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            let qId = params.get('quotationId');
            return this.quoteDataService.readQuote(this.foundId, qId);
          })
        )
        .subscribe((quote: Quote) => {         
          this.quote = quote;
        })
      })
  }

}
