import {Component} from '@angular/core';
import {PlaylistSummaryDTO} from "../../../../../product";
import {playlistSummaryMock} from "../../../../../product/playlist/index.mock";



@Component({
    selector: 'lesson-plan-hero-route',
    templateUrl: './lesson-plan-hero.route.component.html',
    styleUrls: ['./lesson-plan-hero.route.component.scss']
})
export class LessonPlanHeroRouteComponent {

    public playlist: PlaylistSummaryDTO =  playlistSummaryMock as PlaylistSummaryDTO;

    private _isLarge: boolean = false;

    get isLarge(): boolean { return this._isLarge; }

    public onDataChangeHandler(data: any): void {
        this.playlist = data;
    }
}
