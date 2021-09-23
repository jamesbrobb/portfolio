import { Component } from '@angular/core';
import {FALLBACK_COLORS} from "../../../components/media/image/fallback/fallback-image.component";
import {OVERLAY_COLORS} from "../../../components/common/overlay/color/color-overlay.component";



@Component({
    selector: 'app-page-header.route',
    templateUrl: './page-header.route.component.html',
    styleUrls: ['./page-header.route.component.scss']
})
export class PageHeaderRouteComponent {

    public seed = '1';
    public fallbackColors = FALLBACK_COLORS;
    public fallbackColor: FALLBACK_COLORS | undefined;

    public overlayColors = OVERLAY_COLORS;
    public overlayColor: OVERLAY_COLORS | undefined = OVERLAY_COLORS.BLUE;

    public urls = [{
      label: 'Image 1',
      path: '/assets/media-examples/sample.jpg'
    }, {
      label: 'Image 2',
      path: '/assets/media-examples/sample_2.png'
    }];

    public url: string | undefined = this.urls[0].path;

    public title: string = 'Header title';

    public topSlotContentHeight: number = 0;
    public topSlotBorderWidth: number = 0;
    public contentSlotContentHeight: number = 0;
    public contentSlotBorderWidth: number = 0;

    public handleSeedChange(event: Event): void {
        this.seed = (<HTMLInputElement>event.target).value;
    }

    public handleTopSlotContentHeightChange(event: Event): void {
        this.topSlotContentHeight = parseInt((<HTMLInputElement>event.target).value);
        this.topSlotBorderWidth = this._getBorderWidth(this.topSlotContentHeight);
    }

    public handleContentSlotContentHeightChange(event: Event): void {
        this.contentSlotContentHeight = parseInt((<HTMLInputElement>event.target).value);
        this.contentSlotBorderWidth = this._getBorderWidth(this.contentSlotContentHeight);
    }

    public onFallbackColorChange(event: Event): void {

        const value = (<HTMLInputElement>event.target).value;

        this.fallbackColor = value !== 'none' ? value as FALLBACK_COLORS : undefined;
    }

    public onOverlayColorChange(event: Event): void {

        const value = (<HTMLInputElement>event.target).value;

        this.overlayColor = value !== 'none' ? value as OVERLAY_COLORS : undefined;
    }

    public onUrlChange(event: Event): void {

        const value = (<HTMLInputElement>event.target).value;

        this.url = value !== 'none' ? value : undefined;
    }

    public onTitleChange(event: Event): void {
        this.title = (<HTMLInputElement>event.target).value;
    }

    private _getBorderWidth(height: number): number {

        if (height === 0) {
            return 0;
        }

        if (height === 1) {
            return 0.5;
        }

        return 1;
    }
}
