import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss']
})
export class PageContainerComponent implements OnChanges {

  @Input('docURI') ioDocURI: string | undefined;

  docURI: string | undefined;

  ngOnChanges(changes: SimpleChanges) {
    this.docURI = this.ioDocURI;
  }

  onError($event: string): void {
    console.warn('error:', $event);
  }
}
