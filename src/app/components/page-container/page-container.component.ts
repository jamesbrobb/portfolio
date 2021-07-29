import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss']
})
export class PageContainerComponent implements OnChanges {

  @Input('docURI') ioDocURI: string | string[] | undefined;
  @Input('noExample') ioNoExample: boolean | undefined;

  docURIs: string[] | undefined;
  noExample: boolean | undefined;
  hasLoaded: boolean = false;
  hasError: boolean = false;

  private _loadCount = 0;

  ngOnChanges(changes: SimpleChanges) {

    this.noExample = !!this.ioNoExample;

    this.hasLoaded = false;
    this.hasError = false;
    this._loadCount = 0;

    let dURIs: string[] = [];

    if(!this.ioDocURI) {
      return;
    }

    if(typeof this.ioDocURI === 'string') {
      dURIs = [this.ioDocURI];
    }

    if(Array.isArray(this.ioDocURI)) {
      dURIs = this.ioDocURI;
    }

    this.docURIs = dURIs;
  }

  onLoad($event: string): void {
    this._onLoad();
  }

  onError($event: string): void {
    this._onLoad();
    this.hasError = true;
  }

  private _onLoad(): void {
    this._loadCount++;
    this.hasLoaded = (this._loadCount == this.docURIs?.length);
  }
}
