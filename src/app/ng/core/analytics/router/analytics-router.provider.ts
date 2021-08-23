import {APP_BOOTSTRAP_LISTENER, ComponentRef, Provider} from "@angular/core";
import {AnalyticsService, AnalyticsTrackingTypes} from "../../../../core";
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs/operators";
import {DOCUMENT} from "@angular/common";



export const ANALYTICS_ROUTER_PROVIDER: Provider = {
  provide: APP_BOOTSTRAP_LISTENER,
  multi: true,
  useFactory: analyticsRouterListenerFactory,
  deps: [
    Router,
    AnalyticsService,
    DOCUMENT
  ]
}


export function analyticsRouterListenerFactory(
  router:Router,
  analyticsService: AnalyticsService,
  document: Document) {

  return (component: ComponentRef<any>) => {
    router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: unknown): void => {
        const rEvt: RouterEvent = event as RouterEvent;

        analyticsService.track({
          actionId: AnalyticsTrackingTypes.page,
          propertyValueMap: {
            title: document.title,
            path: rEvt.url,
            href: document.location.href
          }
        })
      });
  }
}
