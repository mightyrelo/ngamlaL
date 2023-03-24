import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {

  @Input() content: any;

  constructor() { }

  ngOnInit() {
  }

}
