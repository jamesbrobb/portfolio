import {Component} from '@angular/core';
import {PlaylistSummaryDTO} from "../../../../../product";
import {playlistSummaryMock} from "../../../../../product/index.mock";



@Component({
    selector: 'lesson-plan-card-route',
    templateUrl: './lesson-plan-card.route.component.html',
    styleUrls: ['./lesson-plan-card.route.component.scss']
})
export class LessonPlanCardRouteComponent {

    public playlist: PlaylistSummaryDTO = playlistSummaryMock as PlaylistSummaryDTO;

    private _isLarge: boolean = false;

    get isLarge(): boolean { return this._isLarge; }

    public onSizeChangeHandler(event: Event): void {
        this._isLarge = !!parseInt((<HTMLInputElement>event.target).value);
    }

    public onDataChangeHandler(data: any): void {
        this.playlist = data;
    }
}
