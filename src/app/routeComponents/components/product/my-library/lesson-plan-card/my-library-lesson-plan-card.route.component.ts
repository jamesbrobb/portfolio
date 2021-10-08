import { Component } from '@angular/core';
import {PlaylistSummaryDTO} from "../../../../../product";
import {playlistSummaryMock} from "../../../../../product/index.mock";


@Component({
    selector: 'app-my-library-lesson-plan-card.route',
    templateUrl: './my-library-lesson-plan-card.route.component.html',
    styleUrls: ['./my-library-lesson-plan-card.route.component.scss']
})
export class MyLibraryLessonPlanCardRouteComponent {

  public playlist: PlaylistSummaryDTO = playlistSummaryMock as PlaylistSummaryDTO;

    public onDataChangeHandler(data: any): void {
        this.playlist = data;
    }
}
