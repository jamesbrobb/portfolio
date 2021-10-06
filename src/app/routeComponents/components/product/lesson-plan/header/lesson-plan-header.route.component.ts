import { Component } from '@angular/core';
import {LessonPlanDS, LessonPlanDTO, LessonPlanParser} from "../../../../../product/lesson-plan";
import {lessonPlanMock} from "../../../../../product/lesson-plan/index.mock";



@Component({
    selector: 'app-lesson-plan-header.route',
    templateUrl: './lesson-plan-header.route.component.html',
    styleUrls: ['./lesson-plan-header.route.component.scss']
})
export class LessonPlanHeaderRouteComponent {

    public lessonPlan: LessonPlanDS;
    //public editorData: LessonPlanDTO | undefined;

    private _parser: LessonPlanParser;

    constructor(parser: LessonPlanParser) {
        this._parser = parser;
        this.lessonPlan = this._parser.fromDTOToDS(lessonPlanMock as LessonPlanDTO);
    }
}
