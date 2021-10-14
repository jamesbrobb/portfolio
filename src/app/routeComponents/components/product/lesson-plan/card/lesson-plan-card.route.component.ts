import {Component} from '@angular/core';
import {LessonPlanSummaryDs} from "../../../../../product";
import {lessonPlanSummaryDTOMock} from "../../../../../product/index.mock";



@Component({
    selector: 'lesson-plan-card-route',
    templateUrl: './lesson-plan-card.route.component.html',
    styleUrls: ['./lesson-plan-card.route.component.scss']
})
export class LessonPlanCardRouteComponent {

    public lessonPlan: LessonPlanSummaryDs = lessonPlanSummaryDTOMock as LessonPlanSummaryDs;
    public editorData: LessonPlanSummaryDs = this.lessonPlan;

    private _isLarge: boolean = false;

    get isLarge(): boolean { return this._isLarge; }

    public onSizeChangeHandler(event: Event): void {
        this._isLarge = !!parseInt((<HTMLInputElement>event.target).value);
    }

    public onDataChangeHandler(data: any): void {
        this.lessonPlan = data;
    }
}
