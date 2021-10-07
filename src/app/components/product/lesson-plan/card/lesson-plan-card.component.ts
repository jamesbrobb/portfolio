import {Component, Input, OnChanges} from '@angular/core';
import {PlaylistSummaryDTO} from "../../../../product";

@Component({
  selector: 'lesson-plan-card',
  templateUrl: './lesson-plan-card.component.html',
  styleUrls: ['./lesson-plan-card.component.scss']
})
export class LessonPlanCardComponent implements OnChanges {

  @Input() dataProvider: PlaylistSummaryDTO | undefined;

  public id: string | undefined;
  public title: string | undefined;
  public description: string | undefined;
  public backgroundImageUrl: string | undefined;
  public skills: string[] | undefined;
  public cefr: string | undefined;

  public ngOnChanges(): void {

    if( !this.dataProvider) {
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
