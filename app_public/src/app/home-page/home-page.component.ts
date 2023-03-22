import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'Ngamla - ',
      strapline: 'App for Man on the Move!'
    },
    viewBar: {
      main: 'Azishe Ngamla!',
      sub: ''
    }
  };


  constructor() { }

  ngOnInit() {
  }

}
