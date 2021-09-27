import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {ComponentsModule} from "./components/components.module";
import {ResponsiveContainerDirective} from "./components/responsive/container/responsive-container.directive";
import {ResponsiveContainerDirectiveMock} from "./components/responsive/container/responsive-container.directive.mock";
import {AnalyticsModule} from "./ng/core";
import {AnalyticsModuleMock} from "./ng/core/analytics/analytics.module.mock";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ComponentsModule
      ],
      declarations: [
        AppComponent
      ],
    })
      .overrideModule(ComponentsModule, {
        remove: {
          declarations: [ResponsiveContainerDirective],
          exports: [ResponsiveContainerDirective],
          imports: [AnalyticsModule]
        },
        add: {
          declarations: [ResponsiveContainerDirectiveMock],
          exports: [ResponsiveContainerDirectiveMock],
          imports: [AnalyticsModuleMock]
        }
      })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
