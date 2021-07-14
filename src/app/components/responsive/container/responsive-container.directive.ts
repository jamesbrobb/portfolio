import {Directive, ElementRef, EventEmitter, OnDestroy, Output} from '@angular/core';
import {BaseResponsiveContainer} from "./responsive-container";
import {ResizeObserverService} from "../resize-observer.service";



@Directive({
  selector: '[responsiveContainer]'
})
export class ResponsiveContainerDirective extends BaseResponsiveContainer implements OnDestroy {

  @Output() resizeNotification = new EventEmitter();

  constructor(elementRef: ElementRef, service: ResizeObserverService) {
    super(elementRef.nativeElement, service);
  }

  protected _resizeNotification(contentRect: DOMRectReadOnly, element: Element): void {
    this.resizeNotification.emit({contentRect, element});
  }

  public ngOnDestroy(): void {
    this.destroy();
  }
}
