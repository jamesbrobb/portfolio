import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss']
})
export class PageContainerComponent implements OnChanges {

  @Input('docURI') ioDocURI: string | undefined;

  docURI: string | undefined;
  hasLoaded: boolean = false;
  hasError: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    this.docURI = this.ioDocURI;
  }

  onLoad($event: string): void {
    this.hasLoaded = true;
  }

  onError($event: string): void {
    this.hasError = true;
    console.warn('error:', $event);
  }
}
