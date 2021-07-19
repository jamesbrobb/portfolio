import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ComponentsModule} from "./components/components.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    MarkdownModule.forRoot({loader: HttpClient}),
    BrowserModule,
    AppRoutingModule,
    ComponentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
