import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {AppRoutingModule} from "../app-routing.module";
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import {AuthModule} from "../auth/auth.module";
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    AuthModule
  ],
  declarations: [
    HeaderComponent,
    SideNavComponent,
    HomeComponent,
    ErrorComponent
  ],
  exports: [
    HeaderComponent,
    SideNavComponent,
    HomeComponent,
    ErrorComponent
  ],

})
export class CoreModule { }
