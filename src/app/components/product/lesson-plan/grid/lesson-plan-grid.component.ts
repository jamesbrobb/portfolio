import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  TemplateRef
} from '@angular/core';

import {PlaylistSummaryDTO} from "../../../../product";



@Component({
    selector: 'lesson-plan-grid',
    templateUrl: './lesson-plan-grid.component.html',
    styleUrls: ['./lesson-plan-grid.component.scss']
})
export class LessonPlanGridComponent implements OnChanges {

    @Input() dataProvider: PlaylistSummaryDTO[] | undefined;
    @Input('header') ioHeader: string | undefined;
    @Input('title') ioTitle: string | undefined;
    @Input('showHero') ioShowHero: boolean = false;
    @Input('fiveCardLayout') ioFiveCardLayout: boolean = false;

    @Input() itemTemplate: TemplateRef<any> | undefined;

    @Output() lessonPlanSelected = new EventEmitter<PlaylistSummaryDTO>();

    public data: PlaylistSummaryDTO[] | undefined;
    public heroData: PlaylistSummaryDTO | undefined;
    public header: string | undefined;
    public title: string | undefined;
    public showHero: boolean = false;
    public showFiveCardLayout: boolean | undefined;


    public ngOnChanges(): void {

        this.header = this.ioHeader;
        this.title = this.ioTitle;
        this.showHero = this.ioShowHero;
        this.showFiveCardLayout = this.ioFiveCardLayout;

        const data = this.dataProvider;

        if (!data) {
            this.data = undefined;
            this.heroData = undefined;
            return;
        }

        if (this.showHero) {
            this.heroData = data[0];
            this.data = data.slice(1);
            return;
        }

        this.heroData = undefined;
        this.data = data;
    }

    public onLessonPlanSelect(playlist: PlaylistSummaryDTO): void {
        this.lessonPlanSelected.emit(playlist);
    }
}
