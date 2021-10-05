import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { MarkdownModule } from 'ngx-markdown';
import {GridLayoutComponent} from "./grid-layout/grid-layout.component";
import {ResponsiveContainerDirective} from "./responsive/container/responsive-container.directive";
import {SideMenuComponent} from "./side-menu/side-menu.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTreeModule} from "@angular/material/tree";
import {MatListModule} from "@angular/material/list";
import {ResizeObserverService} from "./responsive/resize-observer.service";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {AppContainerComponent} from "./container/app-container.component";
import {PageContainerComponent} from "./page-container/page-container.component";
import {AnalyticsModule} from "../ng/core";
import {FallbackImageComponent} from "./media/image/fallback/fallback-image.component";
import {ImageComponent} from "./media/image/image/image.component";
import {ColorOverlayComponent} from "./common/overlay/color/color-overlay.component";
import {PageHeaderComponent} from "./layout/headers/page/page-header.component";
import {LessonPlanCardComponent} from "./product/lesson-plan/card/lesson-plan-card.component";


export const COMPONENTS = [
  AppContainerComponent,
  PageContainerComponent,
  GridLayoutComponent,
  ResponsiveContainerDirective,
  SideMenuComponent,
  FallbackImageComponent,
  ImageComponent,
  ColorOverlayComponent,
  PageHeaderComponent,
  LessonPlanCardComponent
];


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    AnalyticsModule,
    MarkdownModule.forChild(),
    MatTreeModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    ResizeObserverService
  ]
})
export class ComponentsModule { }
