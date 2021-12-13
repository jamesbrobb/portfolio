import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnalyticsActionsService, GAConfigService} from './ng/core';
import {githubConfigService} from "./components/page-container/page-container.component";
import {environment} from "../environments/environment";
import analytics from "../assets/json/analytics.json";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{
    provide: AnalyticsActionsService,
    useValue: analytics
  }, {
    provide: githubConfigService,
    useValue: environment.configuration.githubConfig
  }, {
    provide: GAConfigService,
    useValue: environment.configuration.analyticsConfig
  }]
})
export class AppConfigModule { }
