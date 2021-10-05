import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {DebugElement} from '@angular/core';

import {PlaylistSummaryDTO} from '@ef-class/core';
import {playlistSummaryCollectionMock} from '@ef-class/core/mocks';

import {EfClassImageModule} from '../../../media/image/ef-class-image.module';

import {LessonPlanGridComponent} from './lesson-plan-grid.component';
import {LessonPlanCardComponent} from '../card/lesson-plan-card.component';
import {LessonPlanHeroComponent} from '../hero/lesson-plan-hero.component';

import {EfClassLayoutComponentsModule} from '../../../layout/ef-class-layout-components.module';
import {ResponsiveContainerMockDirective} from '../../../index.mock';
import {ResponsiveContainerDirective} from '../../../responsive/container/responsive-container.directive';
import {EfClassResponsiveComponentsModule} from '../../../responsive/ef-class-responsive-components.module';



describe('LessonPlanGridComponent', () => {

    let component: LessonPlanGridComponent,
        fixture: ComponentFixture<LessonPlanGridComponent>,
        mock: PlaylistSummaryDTO[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                EfClassImageModule,
                EfClassLayoutComponentsModule,
                EfClassResponsiveComponentsModule
            ],
            declarations: [
                LessonPlanHeroComponent,
                LessonPlanCardComponent,
                LessonPlanGridComponent
            ]
        })
        .overrideModule(EfClassResponsiveComponentsModule, {
            remove: {
                declarations: [ResponsiveContainerDirective],
                exports: [ResponsiveContainerDirective]
            },
            add: {
                declarations: [ResponsiveContainerMockDirective],
                exports: [ResponsiveContainerMockDirective]
            }
        })
        .compileComponents();
    }));

    beforeEach(() => {

        mock = <any>playlistSummaryCollectionMock;

        fixture = TestBed.createComponent(LessonPlanGridComponent);

        component = fixture.componentInstance;
        component.dataProvider = mock;
        component.ngOnChanges();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the same amount of items as the supplied dataProvider length', () => {

        const cards: DebugElement[] = fixture.debugElement.queryAll(By.css('.grid-item'));

        expect(cards.length).toEqual(mock.length);
    });

    describe('header', () => {

        it('should display the supplied header value', () => {

            const headerValue = 'Header';

            component.header = headerValue;
            fixture.detectChanges();

            const headerElement = fixture.debugElement.query(By.css('.header')).nativeElement;

            expect(headerElement.textContent).toEqual(headerValue);
        });

        it('should not be displayed when a header value is not supplied', () => {

            const headerElement = fixture.debugElement.query(By.css('.header'));

            expect(headerElement).toBeNull();
        });
    });

    describe('title', () => {

        it('should display the supplied title', () => {

            const titleValue = 'Title';

            component.title = titleValue;
            fixture.detectChanges();

            const titleElement = fixture.debugElement.query(By.css('.lesson-plan-grid > .title')).nativeElement;

            expect(titleElement.textContent).toEqual(titleValue);
        });

        it('should not be displayed when a title value is not supplied', () => {

            const titleElement = fixture.debugElement.query(By.css('.lesson-plan-grid > .title'));

            expect(titleElement).toBeNull();
        });
    });

    describe('hero', () => {

        it('should not be displayed when showHero is false', () => {

            const heroElement = fixture.debugElement.query(By.css('.hero'));

            expect(heroElement).toBeNull();
        });

        it('should be displayed when showHero is true', () => {

            component.showHero = true;
            component.ngOnChanges();
            fixture.detectChanges();

            const heroElement = fixture.debugElement.query(By.css('.hero'));

            expect(heroElement).toBeDefined();
        });

        it('should display one less item than dataprovider length when hero is shown', () => {

            component.showHero = true;
            component.ngOnChanges();
            fixture.detectChanges();

            const cards: DebugElement[] = fixture.debugElement.queryAll(By.css('.grid-item'));

            expect(cards.length).toEqual(mock.length - 1);
        });
    });
});
