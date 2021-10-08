import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {WordSenseDS, WordSenseParser} from '@ef-class/core';
import {wordSenseDTOCollectionMock} from '@ef-class/core/mocks';

import { LessonPlanVocabularyComponent } from './lesson-plan-vocabulary.component';
import {SvgRegistry} from '../../../common/svg';
import {SvgRegistryMock} from '../../../common/svg/registry/svg-registry.mock';
import {IconRegistryMock} from '../../../common/icons/registry/icon-registry.mock';
import {IconRegistry} from '../../../common/icons';
import {EfClassLessonPlanComponentsModule} from '../ef-class-lesson-plan-components.module';
import {DebugElement} from '@angular/core';



describe('LessonPlanVocabularyComponent', () => {

    let component: LessonPlanVocabularyComponent,
        fixture: ComponentFixture<LessonPlanVocabularyComponent>,
        dataProvider: WordSenseDS[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                EfClassLessonPlanComponentsModule
            ],
            providers: [
                {
                    provide: IconRegistry,
                    useClass: IconRegistryMock
                }, {
                    provide: SvgRegistry,
                    useClass: SvgRegistryMock
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {

        dataProvider = WordSenseParser.fromDTOArrayToDSArray(<any>wordSenseDTOCollectionMock);

        fixture = TestBed.createComponent(LessonPlanVocabularyComponent);

        component = fixture.componentInstance;
        component.dataProvider = dataProvider;
        component.ngOnChanges();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the count', () => {

        const countElement: HTMLElement = fixture.debugElement.query(By.css('.count')).nativeElement;

        expect(countElement.textContent.indexOf(dataProvider.length.toString())).toEqual(1);
    });

    it('should display the correct number of word senses', () => {

        const words: DebugElement[] = fixture.debugElement.queryAll(By.css('.word-sense'));

        expect(words.length).toEqual(dataProvider.length);
    });
});
