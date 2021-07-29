import {AnalyticsAdaptor} from './analytics-adaptor';
import {AnalyticsHook} from './analytics-hook';
import {ObjectUtils} from "../utils";


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
  impersistent?: boolean;
}

export type AnalyticsActions = {
  [key: string]: AnalyticsAction | AnalyticsPageAction | AnalyticsActions;
}

export type AnalyticsEvent = {
  actionType: string,
  propertyValueMap?: {[propertyKey: string]: unknown};
}


export class AnalyticsService {

    private readonly _actions: AnalyticsActions;
    private readonly _adaptor: AnalyticsAdaptor;

    private _preHooks: AnalyticsHook[] | undefined;


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

            let action: AnalyticsAction = ObjectUtils.recursivelyFindProperty(analyticsEvent.actionType, this._actions) as AnalyticsAction;

            action = this._interpolateValues(action, analyticsEvent.propertyValueMap);
            action = this._processHooks(action);

            if(action.disabled) {
                console.log('Analytics action is disabled', action);
                return;
            }

            this._adaptor.track(action);

        } catch (e) {

            console.warn(e);
        }
    }


    private _interpolateValues(action: AnalyticsAction, properyValueMap?: {[propertyKey: string]: unknown}): AnalyticsAction {

        if(!action.properties && properyValueMap) {
          // prop map but no properties supplied
        }

        if(action.properties && !properyValueMap) {
          // property values expected but no properyValueMap supplied
        }

        if(!properyValueMap) {
          return action;
        }

        let s: string = JSON.stringify(action);

        s = s.replace(/{%\s*([\w.]+)\s*%}/g, (match: string, innerGroupMatch: string): string => {

          if(!properyValueMap[innerGroupMatch]) {
            throw new Error(`no value supplied for property '${innerGroupMatch}'`);
          }

          return ObjectUtils.recursivelyFindProperty(innerGroupMatch, properyValueMap) as string;
        });

        return JSON.parse(s);
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
