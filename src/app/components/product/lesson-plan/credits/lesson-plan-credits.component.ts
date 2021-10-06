import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';



@Component({
    selector: 'lesson-plan-credits',
    templateUrl: './lesson-plan-credits.component.html',
    styleUrls: ['./lesson-plan-credits.component.scss']
})
export class LessonPlanCreditsComponent implements OnChanges {

    @Input('isPublishedByUser') ioIsPublishedByUser: boolean | undefined;

    public isPublishedByUser: boolean = false;

    public ngOnChanges(changes: SimpleChanges): void {
        this.isPublishedByUser = this.ioIsPublishedByUser ?? false;
    }
}

