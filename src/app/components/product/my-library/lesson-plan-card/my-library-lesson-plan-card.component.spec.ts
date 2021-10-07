import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {playlistSummaryMock} from '@ef-class/core/mocks';
import {PlaylistSummaryDTO} from '@ef-class/core';

import { MyLibraryLessonPlanCardComponent } from './my-library-lesson-plan-card.component';
import {EfClassMyLibraryComponentsModule} from '../ef-class-my-library-components.module';



describe('MyLibraryLessonPlanCardComponent', () => {

    let component: MyLibraryLessonPlanCardComponent,
        fixture: ComponentFixture<MyLibraryLessonPlanCardComponent>,
        mock: PlaylistSummaryDTO,
        titleElement: HTMLElement,
        tagElements: DebugElement[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                EfClassMyLibraryComponentsModule
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {

        mock = <any>playlistSummaryMock;

        fixture = TestBed.createComponent(MyLibraryLessonPlanCardComponent);

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
});
