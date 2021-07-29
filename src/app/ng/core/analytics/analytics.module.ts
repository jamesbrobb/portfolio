import {InjectionToken, NgModule, Optional} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AnalyticsActions,
  AnalyticsService,
  AnalyticsAdaptor, AnalyticsHook
} from "../../../core";
import {AnalyticsEventDirective} from "./components/analytics-event.directive";



export const AnalyticsActionsService = new InjectionToken<AnalyticsActions>('AnalyticsActionsService');
export const AnalyticsAdaptorService = new InjectionToken<AnalyticsAdaptor>('AnalyticsAdaptorService');
export const AnalyticsHooksService = new InjectionToken<AnalyticsHook[]>('AnalyticsHooksService')


export function analyticsServiceFactory(
  actions: AnalyticsActions,
  adaptor: AnalyticsAdaptor,
  hooks: AnalyticsHook[]): AnalyticsService {

  if (Array.isArray(hooks)) {
    hooks = ([] as AnalyticsHook[]).concat(...hooks)
  }

  return new AnalyticsService(actions, adaptor, hooks);
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
        AnalyticsAdaptorService,
        [new Optional(), AnalyticsHooksService]
      ]
    }
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AnalyticsModule {}
