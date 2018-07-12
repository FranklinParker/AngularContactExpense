import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    TextMaskModule
  ],
  declarations: []
})
export class SharedModule {
}
