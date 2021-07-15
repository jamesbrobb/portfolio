import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GridLayoutComponent} from "./grid-layout/grid-layout.component";
import {ResponsiveContainerDirective} from "./responsive/container/responsive-container.directive";
import {SideMenuComponent} from "./side-menu/side-menu.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTreeModule} from "@angular/material/tree";
import {MatListModule} from "@angular/material/list";
import {ResizeObserverService} from "./responsive/resize-observer.service";

export const COMPONENTS = [
  GridLayoutComponent,
  ResponsiveContainerDirective,
  SideMenuComponent
];


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatListModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    ResizeObserverService
  ]
})
export class ComponentsModule { }
