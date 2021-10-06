import {
    TestBed,
    async,
    ComponentFixture
} from '@angular/core/testing';

import { HtmlRendererComponent } from './html-renderer.component';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {SecurityContext} from '@angular/core';


/******************************************************
 *
 * HtmlRendererComponent Spec
 *
 ******************************************************/

describe('EfClassHtmlRendererComponent', () => {

    let helper;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HtmlRendererComponent
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        helper = new Helper('<h1>foo</h1> <h2>bar</h2>');
    });

    it('renders the text provided by the [ html-renderer ] Input in the DOM', async(() => {
        expect(helper.textContent).toBe('foo bar');
    }));

    it('renders a url as a link', async(() => {

        helper = new Helper('<p>http://google.com</p>');

        expect(helper.safeHtml).toBe('<p><a href="http://google.com" target="_blank">http://google.com</a></p>');
    }));
});

/******************************************************
 *
 * Helper
 *
 ******************************************************/

class Helper {

    private _fixture: ComponentFixture < HtmlRendererComponent > ;
    private _component: HtmlRendererComponent;

    constructor(htmlInput?: string) {

        this._fixture = TestBed.createComponent(HtmlRendererComponent);
        this._component = this._fixture.componentInstance;

        this.html = htmlInput;
        this._component.ngOnChanges();
        this._fixture.detectChanges();
    }

    get component(): HtmlRendererComponent {
        return this._component;
    }

    get elementsRendered(): any {
        return this._fixture.debugElement.children;
    }

    get textContent(): string {
        return this._fixture.nativeElement.textContent.trim();
    }

    set html(value: string) {
        if (!value) {
            return;
        }
        this._component.html = value;
    }

    get safeHtml(): string {

        const sanitizer: DomSanitizer = TestBed.get(DomSanitizer);

        return sanitizer.sanitize(SecurityContext.HTML, this._component.safeHTML);
    }

    detectChanges(): void {
        this._fixture.detectChanges();
    }
}
