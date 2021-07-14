import {CompatibilityChecker} from '../compatibility-checker';



export interface ResolutionConfig {
    minWidth: number;
    minHeight: number;
}


export class ResolutionCheck implements CompatibilityChecker {

    private _hasRequiredResolution: boolean;

    constructor(screen: Screen, config: ResolutionConfig) {
        this._hasRequiredResolution = this._calculateIfHasRequiredResolution(screen, config);
    }

    get isCompatible(): boolean {
        return this._hasRequiredResolution;
    }

    private _calculateIfHasRequiredResolution(screen: Screen, resolution: ResolutionConfig): boolean {

        return screen.width >= resolution.minWidth && screen.height >= resolution.minHeight;
    }
}
