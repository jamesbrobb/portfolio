import Spy = jasmine.Spy;

import {
    GaAnalyticsAdaptor, HitTypes, GAPageOptions, GAEventOptions, GATimingOptions,
    GASocialOptions
} from './ga-analytics-adaptor';
import {GaAnalyticsConfig} from './ga-analytics-config';


describe('GaAnalyticsAdaptor', () => {

    var ga: any,
        tracker: any,
        config: GaAnalyticsConfig,
        adaptor: GaAnalyticsAdaptor,
        spy: Spy;

    beforeEach(() => {

        config = {
            trackerId: 'fakeId',
            trackerName: 'fakeName',
            cookieDomain: 'domain'
        };

        tracker = {
            send: () => {},
            set: () => {}
        };

        ga = (arg: Function) => {arg()};
        ga.create = () => tracker;
        ga.send = () => {};

        adaptor = new GaAnalyticsAdaptor(ga, config);

        spy = spyOn(tracker, 'send').and.callThrough();
    });

    describe('track', () => {

        it('should throw an error if no such hit type', () => {

            var type: string = 'noSuchHitType';

            expect(() => adaptor.track({hitType: type}))
                .toThrowError(`No hitType of type '${type}'`)
        });

        it('should set and send a pageview', () => {

            var args: GAPageOptions = {
                    hitType: HitTypes[HitTypes.pageview],
                    page: 'test/page'
                },
                setSpy = spyOn(tracker, 'set').and.callThrough();

            adaptor.track(args);

            expect(setSpy).toHaveBeenCalledWith('page', args.page);
            expect(spy).toHaveBeenCalledWith(HitTypes[HitTypes.pageview], {page: args.page});
        });

        it('should send but not set a pageview', () => {

            var args: GAPageOptions = {
                    hitType: HitTypes[HitTypes.pageview],
                    page: 'test/page',
                    nonPersistant: true
                },
                setSpy = spyOn(tracker, 'set').and.callThrough();

            adaptor.track(args);

            expect(setSpy).not.toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(HitTypes[HitTypes.pageview], {page: args.page});
        });

        it('should send an event', () => {

            var args: GAEventOptions = {
                hitType: HitTypes[HitTypes.event],
                category: 'category',
                action: 'action',
                label: 'label',
                value: 1
            };

            adaptor.track(args);

            expect(spy).toHaveBeenCalledWith(HitTypes[HitTypes.event], {
                eventCategory: args.category,
                eventAction: args.action,
                eventLabel: args.label,
                eventValue: args.value
            });
        });

        it('should send a timing', () => {

            var args: GATimingOptions = {
                hitType: HitTypes[HitTypes.timing],
                category: 'category',
                varName: 'varName',
                value: 1000
            };

            adaptor.track(args);

            expect(spy).toHaveBeenCalledWith(HitTypes[HitTypes.timing], {
                timingCategory: args.category,
                timingVar: args.varName,
                timingValue: args.value
            });
        });

        it('should send a social', () => {

            var args: GASocialOptions = {
                hitType: HitTypes[HitTypes.social],
                network: 'network',
                action: 'action',
                target: 'target'
            };

            adaptor.track(args);

            expect(spy).toHaveBeenCalledWith(HitTypes[HitTypes.social], {
                socialNetwork: args.network,
                socialAction: args.action,
                socialTarget: args.target
            });
        });
    })
});
