import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FALLBACK_COLORS} from '../fallback/fallback-image.component';


@Component({
    selector: 'image-component',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnChanges {

    @Input('url') ioUrl: string | undefined;
    @Input('fallbackSeed') iofallbackSeed: string | undefined;
    @Input('fallbackColor') ioFallbackColor: FALLBACK_COLORS | undefined;
    @Input('size') ioSize: string | undefined;
    @Input('blur') ioBlur: boolean | undefined;

    public url: string | undefined;
    public fallbackSeed: string | undefined;
    public fallbackColor: FALLBACK_COLORS | undefined;
    public blur: boolean | undefined;


    public ngOnChanges(): void {

        this.url = this.ioUrl ? this.ioUrl.replace('{size}', this.ioSize || '1044w') : '';
        this.fallbackSeed = this.iofallbackSeed;
        this.fallbackColor = this.ioFallbackColor;
        this.blur = this.ioBlur;
    }
}
