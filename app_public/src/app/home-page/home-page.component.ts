import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'Home',
      strapline: 'This is the home page'
    },
    sideBar: {
      main: 'Introduction to app Introduction to app Introduction to app Introduction to app Introduction to app Introduction to app Introduction to app Introduction to app Introduction to app Introduction to app Introduction to app ',
      sub: 'Call to action regarding app Call to action regarding app Call to action regarding app Call to action regarding app Call to action regarding app Call to action regarding app Call to action regarding app Call to action regarding app '
    }
  };


  constructor() { }

  ngOnInit() {
  }

}
