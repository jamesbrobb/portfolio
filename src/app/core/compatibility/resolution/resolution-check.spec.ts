import {ResolutionCheck, ResolutionConfig} from './resolution-check';



describe('ResolutionCheck', () => {

    let resolutionCheck: ResolutionCheck,
        config: ResolutionConfig;

    const screen: Screen = {
        width: 400,
        height: 400
    } as Screen;

    describe('WHEN created and supplied with a config containing a compatible resolution', () => {

        beforeEach(() => {

            config = {
                minWidth: 400,
                minHeight: 400
            };

            resolutionCheck = new ResolutionCheck(screen, config);
        });

        it('hasRequiredResolution should return true', () => {

            expect(resolutionCheck.isCompatible).toEqual(true);
        });
    });

    describe('WHEN created and supplied with a config containing an incompatible resolution', () => {

        beforeEach(() => {

            config = {
                minWidth: 1024,
                minHeight: 768
            };

            resolutionCheck = new ResolutionCheck(screen, config);
        });

        it('hasRequiredResolution should return false', () => {

            expect(resolutionCheck.isCompatible).toEqual(false);
        });
    });
});

