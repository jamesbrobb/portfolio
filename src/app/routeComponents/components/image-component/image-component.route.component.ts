import { Component } from '@angular/core';
import {FALLBACK_COLORS} from "../../../components/media/image/fallback/fallback-image.component";


@Component({
    selector: 'app-image-route',
    templateUrl: './image-component.route.component.html',
    styleUrls: ['./image-component.route.component.scss']
})
export class ImageComponentRouteComponent {

    public urls = [{
      label: 'Image 1',
      path: '/assets/media-examples/sample.png'
    }, {
      label: 'Image 2',
      path: '/assets/media-examples/sample_2.png'
    }];

    public url: string | undefined = this.urls[0].path;
    public seed = '1';
    public colors = FALLBACK_COLORS;
    public color: FALLBACK_COLORS | undefined;
    public blur: boolean = false;

    public selectedSize: string = 'default';

    public onSeedChange(event: Event): void {
        this.seed = (<HTMLInputElement>event.target).value;
    }

    public onColorChange(event: Event): void {

        const value = (<HTMLInputElement>event.target).value;

        this.color = value !== 'none' ? value as FALLBACK_COLORS : undefined;
    }

    public onUrlChange(event: Event): void {

        const value = (<HTMLInputElement>event.target).value;

        this.url = value !== 'none' ? value : undefined;
    }

    public onBlurChangeHandler(event: Event): void {
        this.blur = (<HTMLInputElement>event.target).checked;
    }
}
