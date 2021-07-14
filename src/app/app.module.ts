import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridLayoutComponent } from './components/grid-layout/grid-layout.component';
import { ResponsiveContainerDirective } from './components/responsive/container/responsive-container.directive';
import { GridExampleComponent } from './examples/grid-example/grid-example.component';
import { ResponsiveExampleComponent } from './examples/responsive-example/responsive-example.component';
import {ResizeObserverService} from "./components/responsive/resize-observer.service";
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    AppComponent,
    GridLayoutComponent,
    ResponsiveContainerDirective,
    GridExampleComponent,
    ResponsiveExampleComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatListModule
  ],
  providers: [
    ResizeObserverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
