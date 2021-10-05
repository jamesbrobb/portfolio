/*import {CommonModule} from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DebugElement} from '@angular/core';

import {By} from '@angular/platform-browser';
import {PlaylistSummaryDTO} from '@ef-class/core';
import {playlistSummaryMock} from '@ef-class/core/mocks';

import { LessonPlanHeroComponent } from './lesson-plan-hero.component';
import {EfClassImageModule} from '../../../media/image/ef-class-image.module';

import {ResponsiveContainerMockDirective} from '../../../index.mock';
import {ResponsiveContainerDirective} from '../../../responsive/container/responsive-container.directive';
import {EfClassResponsiveComponentsModule} from '../../../responsive/ef-class-responsive-components.module';



describe('LessonPlanCardComponent', () => {

    let component: LessonPlanHeroComponent,
        fixture: ComponentFixture<LessonPlanHeroComponent>,
        mock: PlaylistSummaryDTO,
        titleElement: HTMLElement,
        tagElements: DebugElement[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                EfClassImageModule,
                EfClassResponsiveComponentsModule
            ],
            declarations: [
                LessonPlanHeroComponent
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

        mock = <any>playlistSummaryMock;

        fixture = TestBed.createComponent(LessonPlanHeroComponent);

        component = fixture.componentInstance;
        component.dataProvider = mock;
        component.ngOnChanges({});

        fixture.detectChanges();

        titleElement = fixture.debugElement.query(By.css('.title')).nativeElement;
        tagElements = fixture.debugElement.queryAll(By.css('.tag'));
    });

    it('should render the component', () => {
        expect(component).toBeDefined();
    });

    it('should display skills', () => {

        expect(
            mock.skills.map((skill: string) => skill.trim())
                .every((skill: string) => {
                        return tagElements.some((skillElement: DebugElement) => {
                            return skillElement.nativeElement.textContent.trim() === skill;
                        });
                    }
                )).toEqual(true);
    });

    it('should display title', () => {
        expect(titleElement.textContent).toEqual(mock.title);
    });
});*/
