import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MListComponent } from './m-list/m-list.component';
import { AppendSPipe } from './append-s.pipe';
import { FrameworkComponent } from './framework/framework.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MPageComponent } from './m-page/m-page.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { MDetailsPageComponent } from './m-details-page/m-details-page.component';
import { MDetailsContentComponent } from './m-details-content/m-details-content.component';
import { MostRecentFirstPipe } from './most-recent-first.pipe';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';


@NgModule({
  declarations: [
    MListComponent,
    AppendSPipe,
    FrameworkComponent,
    NavBarComponent,
    FooterComponent,
    HomePageComponent,
    MPageComponent,
    PageHeaderComponent,
    SideBarComponent,
    HomeContentComponent,
    MDetailsPageComponent,
    MDetailsContentComponent,
    MostRecentFirstPipe,
    RegisterPageComponent,
    LoginPageComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
