import { Component, OnInit, Input } from '@angular/core';

import { Customer, QuoteItem, Quote, Invoice } from '../customer';

import { QuotationDataService } from '../quotation-data.service';
import { CustomerDataService } from '../customer-data.service';
import { ProductDataService } from '../product-data.service';
import { Product } from '../product';
import { InvoiceDataService } from '../invoice-data.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-customer-content',
  templateUrl: './view-customer-content.component.html',
  styleUrls: ['./view-customer-content.component.css']
})
export class ViewCustomerContentComponent implements OnInit {

  @Input() dbCustomer: Customer;

  //form processing
  public formError  = '';
  public displayForm : boolean = false;

  public formQuoteItem : QuoteItem = {
    product: '',
    quantity: null,
    productAmount: null,
    description: 'd'
  } 


  public newQuotation = {
    quoteItems: [],
    summary: '',
    amount: 0,
    expense: 0,
    profit: 0,
    author: '',
    flagged: false,
    _id: ''
  };

  public counts = [];
  

  private customers: Customer[] = [];

  public products : Product[];
  public currentProduct: Product;

  public newInvoice: Invoice;



  constructor(
    private quoteDataService: QuotationDataService,
    private customerDataService: CustomerDataService,
    private productDataService: ProductDataService,
    private invoiceDataService: InvoiceDataService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  private getUserName() : string {
    if(this.isLoggedIn())
    {
      const {name} = this.authService.getCurrentUser();
     return name ? name : 'Guest'
    }
    return 'Guest';
    
  }

  public readProducts(): void {
    this.productDataService.getProducts(this.getUserName())
      .then(foundProducts => this.products = foundProducts);
  }

  public getProductByName(name: string): Promise<Product> {
    return this.productDataService.getProductByName(name);
  }

  formIsValid(){
    if(!this.formQuoteItem.product || !this.formQuoteItem.quantity){
      return false;
    }
    return true;
  }

  getCustomers() : void {
    this.customerDataService.getCustomers(this.getUserName())
      .then(response => this.customers = response);
  }

  onQuoteSubmit(){
    this.formError = '';
    if(this.formIsValid()) {
      //get last item and set its summary
      this.quoteDataService.addQuote(this.dbCustomer._id, this.newQuotation)
      .then((quotation: Quote) => {
        console.log('quotation saved', quotation);
        let quotes = this.dbCustomer.quotations.slice(0);
        quotes.unshift(quotation);
        this.dbCustomer.quotations = quotes;
        this.resetAndHideQuoteForm();
      });
    } else {
      this.formError = 'No items entered, please try again.';
    }

  }

  //Add qoute item to quotation
  public addItemToQuote() : void {
    
    this.formError = '';

    this.getProductByName(this.formQuoteItem.product)
    .then(foundProduct => {
      this.currentProduct = foundProduct;
      this.formQuoteItem.productAmount = this.currentProduct.selling;
      this.formQuoteItem.description = this.currentProduct.description;
      this.newQuotation.summary += `${this.formQuoteItem.quantity} x ${this.currentProduct.name}, `;
      this.newQuotation.amount += this.formQuoteItem.quantity * this.currentProduct.selling;
      this.newQuotation.profit += this.formQuoteItem.quantity * (this.currentProduct.selling - this.currentProduct.trade);
      this.newQuotation.expense += this.formQuoteItem.quantity * this.currentProduct.trade; 

      this.newQuotation.quoteItems.push({
        product: this.formQuoteItem.product,
        quantity: this.formQuoteItem.quantity,
        productAmount: this.formQuoteItem.productAmount,
        description: this.formQuoteItem.description
      });
     
    }); 

  } 


  public resetAndHideQuoteForm(){
    this.formError = '';
    this.displayForm = false;
    this.formQuoteItem.product = '';
    this.formQuoteItem.quantity = null;
    this.newQuotation.quoteItems.splice(0, this.newQuotation.quoteItems.length);
    this.newQuotation.summary = '';
    this.newQuotation.profit = 0;
    this.newQuotation.expense = 0;
    this.newQuotation.amount = 0;
    this.currentProduct = null;

  }

  //deleting quote
  flagged(customerId: string, quoteId: string) {
    console.log(this.customers.length);
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i]._id == customerId){
        for(let j = 0; j < this.customers[i].quotations.length; j++){
            if(this.customers[i].quotations[j]._id == quoteId){
              this.customers[i].quotations[j].flagged = true;
            }
        }
      }
    }
  }

  isFlagged(customerId: string, quoteId: string) {
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i]._id == customerId){
        for(let j = 0; j < this.customers[i].quotations.length; j++){
            if(this.customers[i].quotations[j]._id == quoteId){
              if(this.customers[i].quotations[j].flagged){
                return true;
              } else return false;
            }
        }
      }
    }
  }

  setFlagOff(customerId: string, quoteId: string) {
    for(let i = 0; i < this.customers.length; i++) {
      if(this.customers[i]._id === customerId) {
        for(let j = 0; j < this.customers[i].quotations.length; j++){
          if(this.customers[i].quotations[j]._id === quoteId) {
            this.customers[i].quotations[j].flagged = false;
          }
        }
      }
    }
  }

  getCustomer(id: string) : void {
    this.customerDataService.getCustomer(id)
        .then(resp => this.dbCustomer = resp);
  }

  deleteQuote(customerId: string, quoteId: string) {
    console.log('deleting...');
    for(let i = 0; i < this.customers.length; i++) {
      if(this.customers[i]._id === customerId) {
        for(let j = 0; j < this.customers[i].quotations.length; j++){
          if(this.customers[i].quotations[j]._id === quoteId) {
            this.quoteDataService.deleteQuote(customerId, quoteId)
             .then(resp => {
              if(!resp){
                console.log('deleted');
                let quotes = this.dbCustomer.quotations.slice(0);
                this.dbCustomer.quotations = quotes;
                this.getCustomer(customerId);       
              }});
          }
        }
      }
    }
  }

  private generateInvoice(cId: string, qId: string, quote: Quote){
    //now we can finally post invoice
    this.invoiceDataService.addInvoice(cId, qId)
      .then(response => {
        console.log(response, ' invoice added...');
        let invoices = this.dbCustomer.invoices.slice(0);
        invoices.unshift(response);
        this.dbCustomer.invoices = invoices;
      });
  }

  public invoice(cusId: string, qId: string) {
    //from qId we can get
    this.quoteDataService.readQuote(cusId, qId)
      .then(response => {
        //from quote we can generate invoice
        this.generateInvoice(cusId, qId, response);
        let url = `/customers/${cusId}`;
        this.router.navigateByUrl(url);
      });
  }

  public flaggedInvoice(customerId: string, invoiceId: string) {
    console.log(this.customers.length);
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i]._id == customerId){
        for(let j = 0; j < this.customers[i].invoices.length; j++){
            if(this.customers[i].invoices[j]._id == invoiceId){
              this.customers[i].invoices[j].flagged = true;
            }
        }
      }
    }
  }
   public isFlaggedInvoice(customerId: string, invoiceId: string) {
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i]._id == customerId){
        for(let j = 0; j < this.customers[i].invoices.length; j++){
            if(this.customers[i].invoices[j]._id == invoiceId){
              if(this.customers[i].invoices[j].flagged){
                return true;
              } else return false;
            }
        }
      }
    }
  }

  public setFlagOffInvoice(customerId: string, invoiceId: string) {
    for(let i = 0; i < this.customers.length; i++) {
      if(this.customers[i]._id === customerId) {
        for(let j = 0; j < this.customers[i].invoices.length; j++){
          if(this.customers[i].invoices[j]._id === invoiceId) {
            this.customers[i].invoices[j].flagged = false;
          }
        }
      }
    }
  }


  public deleteInvoice(customerId: string, invoiceId: string) {
    console.log('deleting...');
    for(let i = 0; i < this.customers.length; i++) {
      if(this.customers[i]._id === customerId) {
        for(let j = 0; j < this.customers[i].invoices.length; j++){
          if(this.customers[i].invoices[j]._id === invoiceId) {
            this.invoiceDataService.deleteInvoice(customerId, invoiceId)
             .then(resp => {
              if(!resp){
                console.log('deleted!');
                let invoices = this.dbCustomer.invoices.slice(0);
                this.dbCustomer.invoices = invoices;
                this.getCustomer(customerId);       
              }});
          }
        }
      }
    }
  }


  ngOnInit() {
    
    this.getCustomers();
    this.readProducts();
    for(let i = 1; i <= 10;i++){
        this.counts[i] = i;
    }
  }

}
