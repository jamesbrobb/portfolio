import {Directive, HostListener, Input} from '@angular/core';
import {AnalyticsEvent, AnalyticsService} from "../../../../core/";



@Directive({
    selector: '[analyticsEvent]'
})
export class AnalyticsEventDirective {

    @Input() analyticsEvent: AnalyticsEvent | undefined;

    @HostListener('click')
    onClick() {
      this._send();
    }

    private _service: AnalyticsService;

    constructor(service: AnalyticsService) {

        this._service = service;
    }

    private _send = (): void => {

        if (!this.analyticsEvent) {
            return;
        }

        this._service.track(this.analyticsEvent);
    }
}
