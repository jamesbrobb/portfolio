import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AnalyticsActions,
  AnalyticsService,
  AnalyticsAdaptor
} from "../../../core";
import {AnalyticsEventDirective} from "./components/analytics-event.directive";



export const AnalyticsActionsService = new InjectionToken<AnalyticsActions>('AnalyticsActionsService');
export const AnalyticsAdaptorService = new InjectionToken<AnalyticsAdaptor>('AnalyticsAdaptorService');


export function analyticsServiceFactory(
  actions: AnalyticsActions,
  adaptor: AnalyticsAdaptor): AnalyticsService {

  return new AnalyticsService(actions, adaptor);
}

const COMPONENTS = [
  AnalyticsEventDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: AnalyticsService,
      useFactory: analyticsServiceFactory,
      deps: [
        AnalyticsActionsService,
        AnalyticsAdaptorService
      ]
    }
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AnalyticsModule {}
