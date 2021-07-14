import Spy = jasmine.Spy;
import * as bowser from 'bowser';

import {BrowserCompatConfig, BrowserCompatibility} from './browser-compatibility';



describe('BrowserCompatibility', () => {

    let browserCompatibility: BrowserCompatibility,
        config: BrowserCompatConfig,
        spy: Spy;

    beforeEach(() => {

        (<any>bowser).mac = true;
        (<any>bowser).linux = false;

        spy = spyOn(bowser, 'check').and.callThrough();
    });

    describe('WHEN created and supplied with a config containing a compatible os', () => {

        beforeEach(() => {

            config = {
                mac: {
                    chrome: '54',
                    safari: '6'
                },
                linux: {
                    chrome: '52'
                }
            };

            browserCompatibility = new BrowserCompatibility(bowser, config);
        });

        it('bowser.check() should be called with that os browser list', () => {

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.calls.argsFor(0)[0]).toBe(config.mac);
        });
    });

    describe('WHEN created and supplied with a config not containing a compatible os', () => {

        beforeEach(() => {

            config = {
                linux: {
                    chrome: '52'
                }
            };

            browserCompatibility = new BrowserCompatibility(bowser, config);
        });

        it('bowser.check() should not be called', () => {

            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('WHEN calculateIfCompatible() is called with a config containing a compatible os', () => {

        beforeEach(() => {

            config = {
                mac: {
                    safari: '6'
                }
            };

            browserCompatibility = new BrowserCompatibility(bowser);
        });

        it('bowser.check() should be called with that os browser list', () => {

            browserCompatibility.calculateIfCompatible(config);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.calls.argsFor(0)[0]).toBe(config.mac);
        });
    });

    describe('WHEN calculateIfCompatible() is called with a config not containing a compatible os', () => {

        beforeEach(() => {

            config = {
                linux: {
                    safari: '6'
                }
            };

            browserCompatibility = new BrowserCompatibility(bowser);
        });

        it('bowser.check() should be called with that os browser list', () => {

            browserCompatibility.calculateIfCompatible(config);

            expect(spy).not.toHaveBeenCalled();
        });
    });
});
