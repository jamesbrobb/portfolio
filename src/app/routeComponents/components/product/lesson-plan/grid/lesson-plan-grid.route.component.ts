import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {PlaylistSummaryDTO} from "../../../../../product";
import {playlistSummaryCollectionMock} from "../../../../../product/index.mock";



@Component({
  selector: 'app-lesson-plan-grid.route',
  templateUrl: './lesson-plan-grid.route.component.html',
  styleUrls: ['./lesson-plan-grid.route.component.scss']
})
export class LessonPlanGridRouteComponent {

    public dataProvider: PlaylistSummaryDTO[] = playlistSummaryCollectionMock as PlaylistSummaryDTO[];

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

    public onLessonPlanSelect(playlist: PlaylistSummaryDTO): void {
        console.log(playlist);
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

    public onDuplicateClick(item: PlaylistSummaryDTO): void {
        console.log('Duplcate:', item);
    }

    public onDeleteClick(item: PlaylistSummaryDTO): void {
      console.log('Delete:', item);
    }
}
