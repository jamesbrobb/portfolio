import {InjectionToken, NgModule, Optional, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AnalyticsActions,
  AnalyticsService,
  AnalyticsAdaptor,
  AnalyticsHook
} from "../../../core";
import {AnalyticsEventDirective} from "./components/analytics-event.directive";



export const AnalyticsActionsService = new InjectionToken<AnalyticsActions>('AnalyticsActionsService');
export const AnalyticsAdaptorService = new InjectionToken<AnalyticsAdaptor>('AnalyticsAdaptorService');

/*
  usage

  {
    provide: AnalyticsHooksService,
    useValue:[...some analytics hooks],
    multi: true
  }
 */
export const AnalyticsHooksService = new InjectionToken<AnalyticsHook[]>('AnalyticsHooksService');

const ANALYTICS_SERVICE_PROVIDER: Provider = {
  provide: AnalyticsService,
  useFactory: (
      actions: AnalyticsActions,
      adaptor: AnalyticsAdaptor,
      hooks: AnalyticsHook[]): AnalyticsService => {

    if (Array.isArray(hooks)) {
      hooks = ([] as AnalyticsHook[]).concat(...hooks)
    }

    return new AnalyticsService(actions, adaptor, hooks);
  },
  deps: [
    AnalyticsActionsService,
    AnalyticsAdaptorService,
    [new Optional(), AnalyticsHooksService]
  ]
}

const COMPONENTS = [
  AnalyticsEventDirective
];


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ANALYTICS_SERVICE_PROVIDER
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AnalyticsModule {}
