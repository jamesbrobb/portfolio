import {CompatibilityChecker} from './compatibility-checker';



export class CompatibilityService implements CompatibilityChecker {

    private _checkers: CompatibilityChecker[];

    constructor(checkers: CompatibilityChecker[]) {
        this._checkers = checkers;
    }

    get isCompatible(): boolean {
        return this._checkers.every((checker) => checker.isCompatible);
    }
}
