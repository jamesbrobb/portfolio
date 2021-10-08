import { Component, Input, OnChanges } from '@angular/core';
import { RoundedCornerSvgConfig } from './rounded-corner-svg.config';



@Component({
    selector: 'rounded-corner-svg',
    templateUrl: `./rounded-corner-svg.component.html`,
    styleUrls: ['./rounded-corner-svg.component.scss']
})
export class RoundedCornerSvgComponent implements OnChanges {

    private _config: RoundedCornerSvgConfig | undefined;

    @Input() config: RoundedCornerSvgConfig | undefined;

    public size: string | undefined;
    public name: string | undefined;
    public backgroundColor: string | undefined;
    public radius: string | undefined;
    public svgColor: string | undefined;

    public ngOnChanges(): void {

        this._config = this.config;

        this.size = this._config?.size ?? "";
        this.name = this._config?.name;
        this.backgroundColor = this._config?.backgroundColor ?? "";
        this.radius = this._config?.radius;
        this.svgColor = this.config?.svgColor ?? "";
    }
}
