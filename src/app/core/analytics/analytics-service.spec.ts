import Spy = jasmine.Spy;

import {AnalyticsService, AnalyticsActions} from './analytics-service';
import {AnalyticsAdaptor} from './analytics-adaptor';


fdescribe('AnalyticsService', () => {

    var service: AnalyticsService,
        adaptor: AnalyticsAdaptor,
        actions: AnalyticsActions,
        spy: Spy;

    beforeEach(() => {

      actions = {
            something: {
                to: {
                    track: {

                    }
                }
            },
            another: {
                thing: {
                    to: {
                        track: {
                            enabled: true,
                            type: 'actionType',
                            hitType: 'hitType',
                            properties: {
                              test: '{%obj.value%}'
                            }
                        }
                    }
                }
            }
        };

        adaptor = {
            set: (key: string, value: any): void => {

            },
            track: (options: any): void => {

            }
        };

        service = new AnalyticsService(actions, adaptor);
    });

    describe('track', () => {

        beforeEach(() => {
            spy = spyOn(adaptor, 'track').and.callThrough();
        });

        it('should error if the supplied object does not exist on the supplied metrics', () => {

            expect(() => service.track({actionType: 'something.that.does.not.exist'}))
                .toThrowError('There is no object \'something.that.does.not.exist\'. Failed at prop \'that\'');

            expect(() => service.track({actionType: 'does.not.exist'}))
                .toThrowError('There is no object \'does.not.exist\'. Failed at prop \'does\'');
        });

        it('should find the metrics by dot notation property look up', () => {

            service.track({actionType: 'something.to.track'});

            expect(spy).toHaveBeenCalledWith(actions.something.to.track);
        });

        it('should throw an error if there are values to interpolate and no args are supplied', () => {

            expect(() => service.track({actionType: 'another.thing.to.track'}))
                .toThrowError('no options args supplied for property \'obj.value\'');
        });

        it('should interpolate the tracking metric values with the supllied args', () => {

            var obj: {} = {
                value: 'test'
            };

            service.track({
                actionType: 'another.thing.to.track',
              propertyValueMap: {
                    obj: obj
                }
            });

            expect(spy).toHaveBeenCalledWith({label: 'test'});
        });
    });
});
