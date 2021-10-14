import {Component} from '@angular/core';
import {LessonPlanSummaryDs} from "../../../../../product";
import {lessonPlanSummaryDTOCollectionMock} from "../../../../../product/index.mock";



@Component({
  selector: 'app-lesson-plan-grid.route',
  templateUrl: './lesson-plan-grid.route.component.html',
  styleUrls: ['./lesson-plan-grid.route.component.scss']
})
export class LessonPlanGridRouteComponent {

    public dataProvider: LessonPlanSummaryDs[] = lessonPlanSummaryDTOCollectionMock as LessonPlanSummaryDs[];

    public header = 'Header';
    public title = 'Title';

    private _showHero: boolean = false;
    private _fancyLayout: boolean = false;
    private _showMyLibraryCard: boolean = false;

    get showHero(): boolean { return this._showHero; }
    get fancyLayout(): boolean { return this._fancyLayout; }
    get showMyLibraryCard(): boolean { return this._showMyLibraryCard; }

    public onHeaderChange(event: Event): void {
        this.header = (<HTMLInputElement>event.target).value;
    }

    public onTitleChange(event: Event): void {
        this.title = (<HTMLInputElement>event.target).value;
    }

    public onLessonPlanSelect(lessonPlan: LessonPlanSummaryDs): void {
        console.log(lessonPlan);
    }

    public onShowHeroChangeHandler(event: Event): void {
        this._showHero = (<HTMLInputElement>event.target).checked;
    }

    public onFancyLayoutChangeHandler(event: Event): void {
        this._fancyLayout = (<HTMLInputElement>event.target).checked;
    }

    public onCardChangeHandler(event: Event): void {
        this._showMyLibraryCard = (<HTMLInputElement>event.target).checked;
    }

    public onDuplicateClick(item: LessonPlanSummaryDs): void {
        console.log('Duplcate:', item);
    }

    public onDeleteClick(item: LessonPlanSummaryDs): void {
      console.log('Delete:', item);
    }
}
