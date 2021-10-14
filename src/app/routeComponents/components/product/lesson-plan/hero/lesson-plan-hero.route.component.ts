import {Component} from '@angular/core';
import {LessonPlanSummaryDs} from "../../../../../product";
import {lessonPlanSummaryDTOMock} from "../../../../../product/index.mock";




@Component({
    selector: 'lesson-plan-hero-route',
    templateUrl: './lesson-plan-hero.route.component.html',
    styleUrls: ['./lesson-plan-hero.route.component.scss']
})
export class LessonPlanHeroRouteComponent {

    public lessonPlan: LessonPlanSummaryDs =  lessonPlanSummaryDTOMock as LessonPlanSummaryDs;
    public editorData: LessonPlanSummaryDs = this.lessonPlan;

    private _isLarge: boolean = false;

    get isLarge(): boolean { return this._isLarge; }

    public onDataChangeHandler(data: any): void {
        this.lessonPlan = data;
    }
}
