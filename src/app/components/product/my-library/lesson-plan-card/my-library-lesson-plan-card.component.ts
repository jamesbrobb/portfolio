import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef} from '@angular/core';
import {PlaylistSummaryDTO} from '@ef-class/core';
import {DateUtils} from '@ef-class/util';
import {MatMenu} from '@angular/material';



@Component({
    selector: 'ef-class-my-library-lesson-plan-card',
    templateUrl: './my-library-lesson-plan-card.component.html',
    styleUrls: ['./my-library-lesson-plan-card.component.scss']
})
export class MyLibraryLessonPlanCardComponent implements OnChanges {

    @Input() dataProvider: PlaylistSummaryDTO;
    @Input() menu: TemplateRef<MatMenu>;

    public id: string;
    public title: string;
    public description: string;
    public backgroundImageUrl: string;
    public skills: string[];
    public cefr: string;
    public modifiedDate: string;

    public ngOnChanges(changes: SimpleChanges): void {

        this.id = this.dataProvider.id;
        this.title = this.dataProvider.title;
        this.description = this.dataProvider.description;
        this.backgroundImageUrl = this.dataProvider.thumbnailAssetPath;
        this.skills = this.dataProvider.skills;
        this.cefr = this.dataProvider.cefr.join(', ');
        this.modifiedDate = DateUtils.getAbbreviatedFormat(this.dataProvider.modified);
    }

    public onOptionsClick(event: MouseEvent): void {
        event.stopImmediatePropagation();
    }
}
