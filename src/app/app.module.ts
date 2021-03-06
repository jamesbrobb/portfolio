import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ComponentsModule} from "./components/components.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AnalyticsModule, GoogleAnalyticsModule} from "./ng/core/";
import {AppConfigModule} from "./app-config.module";
import {IconsModule} from "./components/common/icons";
import {environment} from "../environments/environment";
import {SvgModule} from "./components/common/svg";

const config = environment.configuration;


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    MarkdownModule.forRoot({loader: HttpClient}),
    BrowserModule,
    AppConfigModule,
    AnalyticsModule,
    GoogleAnalyticsModule,
    AppRoutingModule,
    ComponentsModule,
    IconsModule.forRoot(config.icons),
    SvgModule.forRoot(config.svgs)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
