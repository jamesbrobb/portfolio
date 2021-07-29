import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnalyticsActionsService} from './ng/core';



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
  }]
})
export class AppConfigModule { }
