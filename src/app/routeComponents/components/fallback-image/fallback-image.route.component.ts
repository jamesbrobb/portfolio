import { Component } from '@angular/core';
import {FALLBACK_COLORS} from "../../../components/media/image/fallback/fallback-image.component";



@Component({
    selector: 'fallback-image-route-component',
    templateUrl: './fallback-image.route.component.html',
    styleUrls: ['./fallback-image.route.component.scss']
})
export class FallbackImageRouteComponent {

    public seed = '1';
    public colors = FALLBACK_COLORS;
    public color: FALLBACK_COLORS | undefined;

    public handleSeedChange(event: Event): void {
        console.log(event);
        this.seed = (<HTMLInputElement>event.target).value;
    }

    public setColor(event: Event): void {
        this.color = (<HTMLInputElement>event.target).value !== 'none' ? (<HTMLInputElement>event.target).value as FALLBACK_COLORS: undefined;
    }
}
