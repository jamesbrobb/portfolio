import {Component, Input, OnChanges} from '@angular/core';
import {LessonPlanDS} from "../../../../product/lesson-plan";




@Component({
    selector    : 'lesson-plan-info',
    templateUrl : './lesson-plan-info.component.html',
    styleUrls   : ['./lesson-plan-info.component.scss']
})
export class LessonPlanInfoComponent implements OnChanges {

    @Input() dataProvider: LessonPlanDS | undefined;

    public lessonPlan: LessonPlanDS | undefined;
    public objectives: string | undefined;
    public coveredRequirements: string | undefined;

    public ngOnChanges(): void {
        this.lessonPlan = this.dataProvider;
        this.objectives = this.lessonPlan?.objectives;
        this.coveredRequirements = this.lessonPlan?.coveredRequirements;
    }
}
