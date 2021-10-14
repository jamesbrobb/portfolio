import {Component, Input, OnChanges} from '@angular/core';
import {LessonPlanDS, WordSenseDS} from "../../../../product/";
import {OVERLAY_COLORS} from "../../../common/overlay/color/color-overlay.component";
import {FALLBACK_COLORS} from "../../../media/image/fallback/fallback-image.component";


@Component({
    selector: 'lesson-plan-header',
    templateUrl: './lesson-plan-header.component.html',
    styleUrls: ['./lesson-plan-header.component.scss']
})
export class LessonPlanHeaderComponent implements OnChanges {

    @Input() dataProvider: LessonPlanDS | undefined;
    @Input('headerColor') ioHeaderColor: OVERLAY_COLORS | undefined;
    @Input('hideContent') ioHideContent: boolean | undefined;

    readonly fallbackColor: FALLBACK_COLORS = FALLBACK_COLORS.WHITE;

    public headerColor: OVERLAY_COLORS | undefined;
    public hideContent: boolean | undefined;
    public title: string | undefined;
    public thumbnailAssetPath: string | undefined;
    public lessonPlan: LessonPlanDS | undefined;
    public vocabulary: WordSenseDS[] | undefined;

    public ngOnChanges(): void {

        this.headerColor = this.ioHeaderColor;
        this.hideContent = this.ioHideContent;
        this.title = this.dataProvider?.title;
        this.thumbnailAssetPath = this.dataProvider?.thumbnailAssetPath;
        this.lessonPlan = this.dataProvider;
        this.vocabulary = this.dataProvider?.vocabulary;
    }
}
