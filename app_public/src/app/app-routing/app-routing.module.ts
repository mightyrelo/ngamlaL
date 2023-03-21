import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import { HomePageComponent } from '../home-page/home-page.component';
import { MDetailsPageComponent } from '../m-details-page/m-details-page.component';
import { MPageComponent } from '../m-page/m-page.component';
import { MListComponent } from '../m-list/m-list.component';
import { MDetailsContentComponent } from '../m-details-content/m-details-content.component';
import { RegisterPageComponent } from '../register-page/register-page.component';
import { LoginPageComponent } from '../login-page/login-page.component';

const routes : Routes = 
  [{
    path: '',
    component: HomePageComponent
  }, {
    path: 'ms',
    component: MPageComponent
  }, {
    path: 'ms/:mId',
    component: MDetailsPageComponent
  }, {
    path: 'ms/:mId/sms/new',
    component: MDetailsPageComponent, 
}, {
  path: 'ms/:mId/del',
  component: MListComponent, 
}, {
  path: 'ms/:mId/sms/:smId/del',
  component: MDetailsContentComponent, 
}, {
  path: 'register',
  component: RegisterPageComponent, 
}, {
  path: 'login',
  component: LoginPageComponent, 
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
