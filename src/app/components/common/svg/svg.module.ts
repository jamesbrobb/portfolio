import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SvgComponent } from './svg/svg.component';
import { SvgRegistry } from './registry/svg-registry';

import { SvgsConfigInjectionToken } from './svg.config.injection-token';
import { RoundedCornerSvgComponent } from './rounded-corner-svg/rounded-corner-svg.component';
import { CommonModule } from '@angular/common';
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {SvgsConfig} from "./svg.config";
import {DomSanitizer} from "@angular/platform-browser";



const components = [
    SvgComponent,
    RoundedCornerSvgComponent
];

export const svgRegistryFactory = (materialIconRegistry: MatIconRegistry, sanitizer: DomSanitizer, config:SvgsConfig) => {
    return new SvgRegistry(materialIconRegistry, sanitizer, config);
}

@NgModule({
    imports: [
        HttpClientModule ,
        MatIconModule,
        CommonModule
    ],
    declarations: components,
    exports: components
})
export class SvgModule {

    public static forRoot(config: any): ModuleWithProviders<SvgModule> {
        return {
            ngModule: SvgModule,
            providers: [
                { provide: SvgsConfigInjectionToken, useValue: config },
                {
                  provide: SvgRegistry,
                  useFactory: svgRegistryFactory,
                  deps: [
                    MatIconRegistry,
                    DomSanitizer,
                    SvgsConfigInjectionToken
                  ]
                }
            ]
        }
    }
}

