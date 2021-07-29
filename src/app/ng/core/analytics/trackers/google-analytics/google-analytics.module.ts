import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnalyticsAdaptorService} from "../../analytics.module";
import {
  AnalyticsAdaptor,
  GaAnalyticsAdaptor,
  GaAnalyticsConfig
} from "../../../../../core";


const config: GaAnalyticsConfig = {
  trackerId: 'G-EJZC3TV0QZ',
  trackerName: '',
  cookieDomain: ''
}

export function createAnalyticsAdaptor(): AnalyticsAdaptor {
  return new GaAnalyticsAdaptor((window as any)?.gtag, config);
}



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{
    provide: AnalyticsAdaptorService,
    useFactory: createAnalyticsAdaptor,
    deps: []
  }]
})
export class GoogleAnalyticsModule { }
