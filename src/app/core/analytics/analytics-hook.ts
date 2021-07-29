import {AnalyticsAdaptor} from './analytics-adaptor';
import {AnalyticsAction, AnalyticsActions} from "./analytics-service";


export interface AnalyticsHook<AdaptorType extends AnalyticsAdaptor = AnalyticsAdaptor> {

    execute(actions: AnalyticsActions, action: AnalyticsAction, adaptor: AdaptorType): AnalyticsAction;
}
