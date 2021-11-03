import {AnalyticsAdaptor} from './analytics-adaptor';
import {AnalyticsHook} from './analytics-hook';
import {ObjectUtils} from "../utils";


type PropertyValueMapType = {[propertyKey: string]: unknown};


export const INTERPOLATABLE_PROP_VALUES_BUT_EMPTY_PROP_MAP_ERROR = 'There are interpolatable property values expected but no property value map was supplied';


export enum AnalyticsTrackingTypes {
    page = 'page',
    event = 'event',
    timing = 'timing'
}


export type AnalyticsAction = {
    type: string;
    trackType: AnalyticsTrackingTypes | string;
    disabled?: boolean;
    properties?: {[key: string]: unknown}
}

export type AnalyticsPageAction = AnalyticsAction & {
    doNotPersist?: boolean;
}

export type AnalyticsActions = {
    [key: string]: AnalyticsAction | AnalyticsPageAction | AnalyticsActions;
}

export type AnalyticsEvent = {
    actionId: string,
    propertyValueMap?: PropertyValueMapType;
}


export class AnalyticsService {

    private readonly _actions: AnalyticsActions;
    private readonly _adaptor: AnalyticsAdaptor;

    private _preHooks: AnalyticsHook[] | undefined;

    private readonly _matcher: RegExp = /{%\s*([\w.]+)\s*%}/g;


    constructor(actions: AnalyticsActions, adaptor: AnalyticsAdaptor, hooks?: AnalyticsHook[]) {

        this._actions = actions;
        this._adaptor = adaptor;

        if(!hooks) {
          return;
        }

        this._preHooks = hooks.concat();
    }

    public addHook(hook: AnalyticsHook): void {

        if(!this._preHooks) {
            this._preHooks = [];
        }

        this._preHooks.push(hook);
    }

    public track(analyticsEvent: AnalyticsEvent): void {

        try {

            let action: AnalyticsAction = ObjectUtils.recursivelyFindProperty(analyticsEvent.actionId, this._actions) as AnalyticsAction;

            action = this._interpolateValues(action, analyticsEvent.propertyValueMap);
            action = this._processHooks(action);

            if(action.disabled) {
                console.warn(`Analytics action ${action.type} is disabled`, action);
                return;
            }

            this._adaptor.track(action);

        } catch (e) {

            console.warn((e as Error).message);
        }
    }

    private _interpolateValues(action: AnalyticsAction, propertyValueMap?: PropertyValueMapType): AnalyticsAction {

        const actionAsString = JSON.stringify(action),
            hasInterpolatableValues = this._hasInterpolatablePropertyValues(actionAsString),
            hasEmptyPropertyMap = this._propertyValueMapIsEmpty(propertyValueMap);

        if(hasInterpolatableValues && hasEmptyPropertyMap) {
            throw new Error(INTERPOLATABLE_PROP_VALUES_BUT_EMPTY_PROP_MAP_ERROR);
        }

        if(hasEmptyPropertyMap) {
            return action;
        }

        const interpolatedString = this._matchAndReplaceValues(actionAsString, propertyValueMap as PropertyValueMapType);

        return JSON.parse(interpolatedString);
    }

    private _hasInterpolatablePropertyValues(actionAsString: string): boolean {
        this._matcher.lastIndex = 0;
        return this._matcher.test(actionAsString);
    }

    private _propertyValueMapIsEmpty(propertyValueMap: PropertyValueMapType | undefined): boolean {
        return !propertyValueMap || ObjectUtils.isEmpty(propertyValueMap);
    }

    private _matchAndReplaceValues(actionAsString: string, propertyValueMap: PropertyValueMapType): string {

        this._matcher.lastIndex = 0;

        return actionAsString.replace(
            this._matcher,
            (match: string, innerGroupMatch: string): string => {
                return ObjectUtils.recursivelyFindProperty(innerGroupMatch, propertyValueMap) as string;
            }
        );
    }

    private _processHooks(action: AnalyticsAction): AnalyticsAction {

        if(!this._preHooks) {
            return action;
        }

        this._preHooks.forEach((hook: AnalyticsHook) => {
            action = hook.execute(this._actions, action, this._adaptor);
        });

        return action;
    }
}
