import { Component } from '@angular/core';
import {OVERLAY_COLORS} from "../../../components/common/overlay/color/color-overlay.component";



@Component({
    selector: 'app-color-overlay.route',
    templateUrl: './color-overlay.route.component.html',
    styleUrls: ['./color-overlay.route.component.scss']
})
export class ColorOverlayRouteComponent {

    public colors = OVERLAY_COLORS;
    public color: OVERLAY_COLORS = OVERLAY_COLORS.BLUE;
    public allowTransition: boolean = true;

    public onColorChange(event: Event): void {
        this.color = (<HTMLInputElement>event.target).value as OVERLAY_COLORS;
    }

    public onAllowTransitionChangeHandler(event: Event): void {
        this.allowTransition = (<HTMLInputElement>event.target).checked;
    }
}
