import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ComponentsModule} from "./components/components.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AnalyticsModule} from "./ng/core/analytics/analytics.module";
import {GoogleAnalyticsModule} from "./ng/core/analytics/trackers/google-analytics/google-analytics.module";
import {AppConfigModule} from "./app-config.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    MarkdownModule.forRoot({loader: HttpClient}),
    BrowserModule,
    AppConfigModule,
    AnalyticsModule,
    GoogleAnalyticsModule,
    AppRoutingModule,
    ComponentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
