import { Component } from '@angular/core';
import {LessonPlanSummaryDs} from "../../../../../product";
import {lessonPlanSummaryDTOMock} from "../../../../../product/index.mock";


@Component({
    selector: 'app-my-library-lesson-plan-card.route',
    templateUrl: './my-library-lesson-plan-card.route.component.html',
    styleUrls: ['./my-library-lesson-plan-card.route.component.scss']
})
export class MyLibraryLessonPlanCardRouteComponent {

    public lessonPlan: LessonPlanSummaryDs = lessonPlanSummaryDTOMock as LessonPlanSummaryDs;
    public editorData: LessonPlanSummaryDs = this.lessonPlan;

    public showMenu: boolean = false;

    public onDataChangeHandler(data: any): void {
        this.lessonPlan = data;
    }

    public onShowMenuChangeHandler(event: Event): void {
      this.showMenu = (<HTMLInputElement>event.target).checked;
    }

    public onDoSomethingClick(item: LessonPlanSummaryDs): void {
        console.log('onDoSomethingClick', item);
    }

    public onDoSomethingElseClick(item: LessonPlanSummaryDs): void {
      console.log('onDoSomethingElseClick', item);
    }
}
