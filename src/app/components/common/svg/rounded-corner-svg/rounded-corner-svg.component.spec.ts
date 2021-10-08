import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoundedCornerSvgComponent } from './rounded-corner-svg.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material';
import { EfClassNgLoggerModule } from '@ef-class/ng';
import { SvgComponent } from '../svg/svg.component';
import { SvgRegistry } from '../registry/svg-registry';
import { SvgRegistryMock } from '../registry/svg-registry.mock';
import { RoundedCornerSvgConfig, BACKGROUND_COLORS, BACKGROUND_SIZES, RADIUS } from './rounded-corner-svg.config';



describe('EfClassRoundedCornerSvgComponent', () => {

    let helper: Helper;

    const config: RoundedCornerSvgConfig = {
        name: 'active-lesson',
        radius: RADIUS.RADIUS_L,
        backgroundColor: BACKGROUND_COLORS.BLUE,
        size: BACKGROUND_SIZES.SIZE_L
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RoundedCornerSvgComponent, SvgComponent ],
            imports: [
                HttpClientModule ,
                MatIconModule,
                EfClassNgLoggerModule,
                CommonModule
            ],
            providers: [
                {
                    provide: SvgRegistry,
                    useClass: SvgRegistryMock
                }
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        helper = new Helper(config);
    });

    it('should create', () => {
        expect(helper.component).toBeTruthy();
    });

    it('should display the svg with the supplied background attributes', () => {
        expect(helper.hasRendered()).toBe(true);
    });
});

/******************************************************
 *
 * Helper
 *
 ******************************************************/

class Helper {

    private _fixture: ComponentFixture<RoundedCornerSvgComponent>;
    private _component: RoundedCornerSvgComponent;

    public emittedObject: any

    constructor(config: RoundedCornerSvgConfig) {
        this._fixture = TestBed.createComponent(RoundedCornerSvgComponent);
        this._component = this._fixture.componentInstance;

        this._component.config = config;

        this._component.ngOnChanges();
        this._fixture.detectChanges();
    }

    get component() : RoundedCornerSvgComponent {
        return this._component;
    }

    public hasRendered(): boolean {
        return this._fixture.debugElement.children.filter((child) => child.nativeElement !== undefined).length > 0;
    }
}
