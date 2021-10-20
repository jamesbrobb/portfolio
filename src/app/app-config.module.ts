import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnalyticsActionsService, GAConfigService} from './ng/core';
import {githubConfigService} from "./components/page-container/page-container.component";
import {environment} from "../environments/environment";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{
    provide: AnalyticsActionsService,
    useValue: {
      page: {
        trackType: 'page',
        properties: {
          page_title: '{%title%}',
          page_path: '{%path%}',
          page_location: '{%href%}'
        }
      },
      test: {
        for: {
          me: {
            type: 'minkyPinky',
            trackType: 'event',
            properties: {
              event_category: '{%prop1%}',
              event_label: '{%prop2%}'
            }
          }
        }
      }
    }
  }, {
    provide: githubConfigService,
    useValue: environment.configuration.githubConfig
  }, {
    provide: GAConfigService,
    useValue: environment.configuration.analyticsConfig
  }]
})
export class AppConfigModule { }
