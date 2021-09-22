import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';


export enum FALLBACK_COLORS {
    BLUE= 'blue',
    GREEN= 'green',
    ORANGE= 'orange',
    PURPLE= 'purple'
}

const SVGS: string[] = [
    `background-${FALLBACK_COLORS.BLUE}`,
    `background-${FALLBACK_COLORS.GREEN}`,
    `background-${FALLBACK_COLORS.ORANGE}`,
    `background-${FALLBACK_COLORS.PURPLE}`
];

@Component({
    selector: 'fallback-image',
    templateUrl: './fallback-image.component.html',
    styleUrls: ['./fallback-image.component.scss']
})
export class FallbackImageComponent implements OnChanges {

    @Input() seed: string | undefined;
    @Input() color: FALLBACK_COLORS | undefined;

    private _fallbackSvgName: string | undefined;

    get fallbackSvgName(): string {

        if(!this._fallbackSvgName) {
            this._fallbackSvgName = this._getSvgName();
        }

        return this._fallbackSvgName;
    }

    public ngOnChanges(changes: SimpleChanges): void {

        this._fallbackSvgName = this._getSvgName();
    }

    private _getSvgName(): string {

        if (this.color) {
            return `background-${this.color}`;
        }

        let seedInt: number = NaN;

        if (this.seed) {
            seedInt = parseInt(this.seed.replace(/\D/g, ''));
            seedInt = isNaN(seedInt) ? NaN : seedInt;
        }

        const index = !isNaN(seedInt) ? seedInt % SVGS.length : Math.round(Math.random() * (SVGS.length - 1));

        return SVGS[index];
    }
}
