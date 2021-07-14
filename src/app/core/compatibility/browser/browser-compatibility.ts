import {IBowser} from 'bowser';
import {CompatibilityChecker} from '../compatibility-checker';



export interface BrowserCompatConfig {
    [os: string]: {
        [browserName: string]: string
    };
}


export class BrowserCompatibility implements CompatibilityChecker {

    private _bowser: IBowser;

    private _isCompatible: boolean;


    constructor(bowser: IBowser, config?: BrowserCompatConfig) {

        this._bowser = bowser;

        if (!config) {
            return;
        }

        this._isCompatible = this.calculateIfCompatible(config);
    }

    get isCompatible(): boolean { return this._isCompatible; }

    public calculateIfCompatible(config: BrowserCompatConfig): boolean {

        let isCompatible = false;

        Object.keys(config).forEach((os: string) => {

            if (!this._bowser[os]) {
                return;
            }

            const browsers = config[os];

            if (!this._bowser.check(browsers, true)) {
                return;
            }

            isCompatible = true;
        });

        return isCompatible;
    }
}
