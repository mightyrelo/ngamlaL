import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company-tag',
  templateUrl: './company-tag.component.html',
  styleUrls: ['./company-tag.component.css']
})
export class CompanyTagComponent implements OnInit {

  @Input() content: any;

  constructor() { }

  ngOnInit() {
  }

}
