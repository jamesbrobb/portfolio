import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {By} from '@angular/platform-browser';

import {PageHeaderComponent} from './page-header.component';
import {FallbackImageComponent} from "../../../media/image/fallback/fallback-image.component";
import {ImageComponent} from "../../../media/image/image/image.component";
import {ColorOverlayComponent} from "../../../common/overlay/color/color-overlay.component";
import {ResponsiveContainerDirectiveMock} from "../../../responsive/container/responsive-container.directive.mock";



describe('PageHeaderComponent', () => {

    let component: PageHeaderComponent,
        fixture: ComponentFixture<PageHeaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule
            ],
            declarations: [
                PageHeaderComponent,
                FallbackImageComponent,
                ImageComponent,
                ColorOverlayComponent,
                ResponsiveContainerDirectiveMock
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(PageHeaderComponent);

        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should render the component', () => {
        expect(component).toBeDefined();
    });

    it('should display the supplied title', () => {

        const titleText = 'Title';

        component.ioTitle = titleText;
        component.ngOnChanges();

        fixture.detectChanges();

        const titleElement = fixture.debugElement.query(By.css('.title')).nativeElement;

        expect(titleElement.textContent).toEqual(titleText);
    });
});
