import {AnalyticsAdaptor} from './analytics-adaptor';
import {AnalyticsAction, AnalyticsActions} from "./analytics-service";
import {Command} from "../commands";


/*export interface AnalyticsHook<AdaptorType extends AnalyticsAdaptor = AnalyticsAdaptor> {

    execute(actions: AnalyticsActions, action: AnalyticsAction, adaptor: AdaptorType): AnalyticsAction;
}*/

export interface AnalyticsHook<AdaptorType extends AnalyticsAdaptor = AnalyticsAdaptor> extends Command<AnalyticsAction, AnalyticsAction, [AnalyticsActions, AdaptorType]> {

}
