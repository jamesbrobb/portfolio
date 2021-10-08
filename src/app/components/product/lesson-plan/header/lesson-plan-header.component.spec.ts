import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {LessonPlanDS, LessonPlanParser, AssetService, AssetServiceConfiguration} from '@ef-class/core';
import {lessonPlanDTOMock} from '@ef-class/core/mocks';

import { LessonPlanHeaderComponent } from './lesson-plan-header.component';
import {EfClassLessonPlanComponentsModule} from '../ef-class-lesson-plan-components.module';
import {IconRegistry} from '../../../common/icons';
import {IconRegistryMock} from '../../../common/icons/registry/icon-registry.mock';
import {SvgRegistry} from '../../../common/svg';
import {SvgRegistryMock} from '../../../common/svg/registry/svg-registry.mock';
import {ResponsiveContainerDirective} from '../../../responsive/container/responsive-container.directive';
import {EfClassResponsiveComponentsModule} from '../../../responsive/ef-class-responsive-components.module';
import {ResponsiveContainerMockDirective} from '../../../responsive/container/responsive-container.directive.mock';



describe('LessonPlanHeaderComponent', () => {

    let component: LessonPlanHeaderComponent,
        fixture: ComponentFixture<LessonPlanHeaderComponent>,
        dataProvider: LessonPlanDS;

    const assetConfig: AssetServiceConfiguration = {
        baseUrl: '',
        paths: {}
    };

    const parser: LessonPlanParser = new LessonPlanParser(new AssetService(assetConfig));

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                EfClassLessonPlanComponentsModule,
                EfClassResponsiveComponentsModule
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

        dataProvider = parser.fromDTOToDS(lessonPlanDTOMock as any);

        fixture = TestBed.createComponent(LessonPlanHeaderComponent);

        component = fixture.componentInstance;
        component.dataProvider = dataProvider;
        component.ngOnChanges();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
