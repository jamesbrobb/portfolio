import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FALLBACK_COLORS} from "../../../media/image/fallback/fallback-image.component";
import {OVERLAY_COLORS} from "../../../common/overlay/color/color-overlay.component";



@Component({
    selector: 'page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnChanges {

    @Input('title') ioTitle: string | undefined;
    @Input('fallbackSeed') ioFallbackSeed: string | undefined;
    @Input('fallbackColor') ioFallbackColor: FALLBACK_COLORS | undefined;
    @Input('overlayColor') ioOverlayColor: OVERLAY_COLORS | undefined;
    @Input('imageUrl') ioImageUrl: string | undefined;
    @Input('size') ioSize: string | undefined;

    public title: string | undefined;
    public fallbackSeed: string | undefined;
    public fallbackColor: FALLBACK_COLORS | undefined;
    public overlayColor: OVERLAY_COLORS = OVERLAY_COLORS.BLUE;
    public imageUrl: string | undefined;
    public size: string | undefined;

    public ngOnChanges(changes: SimpleChanges): void {
        this.title = this.ioTitle;
        this.fallbackSeed = this.ioFallbackSeed;
        this.fallbackColor = this.ioFallbackColor;
        this.overlayColor = this.ioOverlayColor || this.overlayColor;
        this.imageUrl = this.ioImageUrl;
        this.size = this.ioSize;
    }
}
