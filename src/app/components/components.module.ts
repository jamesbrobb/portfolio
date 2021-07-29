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


export const COMPONENTS = [
  AppContainerComponent,
  PageContainerComponent,
  GridLayoutComponent,
  ResponsiveContainerDirective,
  SideMenuComponent
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
