import {Component, Inject, InjectionToken, Input, OnChanges, SimpleChanges} from '@angular/core';


export interface GithubConfig {
  root: string;
}

export const githubConfigService = new InjectionToken<GithubConfig>('githubConfigService')



@Component({
  selector: 'page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss']
})
export class PageContainerComponent implements OnChanges {

  @Input('detailsURI') ioDetailsURI: string | undefined;
  @Input('githubLink') ioGithubLink: string | undefined;
  @Input('docURI') ioDocURI: string | string[] | undefined;

  detailsURI: string | undefined;
  githubLink: string | undefined;
  docURIs: string[] | undefined;
  hasLoaded: boolean = false;
  hasError: boolean = false;

  private _githubConfig: GithubConfig;
  private _loadCount = 0;

  constructor(@Inject(githubConfigService) githubConfig: GithubConfig) {
    this._githubConfig = githubConfig;
  }

  ngOnChanges(changes: SimpleChanges) {

    this.detailsURI = this.ioDetailsURI;
    this.githubLink = this.ioGithubLink;

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

  onGithubLinkSelect(): void {
    window.open(`${this._githubConfig.root}${this.githubLink}`);
  }

  private _onLoad(): void {
    this._loadCount++;
    this.hasLoaded = (this._loadCount == this.docURIs?.length);
  }
}
