import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {LessonPlanSummaryDs} from "../../../../product";



@Component({
    selector: 'lesson-plan-hero',
    templateUrl: './lesson-plan-hero.component.html',
    styleUrls: ['./lesson-plan-hero.component.scss']
})
export class LessonPlanHeroComponent implements OnChanges {

    @Input() dataProvider: LessonPlanSummaryDs | undefined;

    public id: string | undefined;
    public title: string | undefined;
    public description: string | undefined;
    public backgroundImageUrl: string | undefined;
    public skills: string[] | undefined;
    public cefr: string | undefined;

    public ngOnChanges(changes: SimpleChanges): void {

        if (!this.dataProvider) {
            return;
        }

        this.id = this.dataProvider.id;
        this.title = this.dataProvider.title;
        this.description = this.dataProvider.description;
        this.backgroundImageUrl = this.dataProvider.thumbnailAssetPath;
        this.skills = this.dataProvider.skills;
        this.cefr = this.dataProvider.cefr.join(', ');
    }
}
