import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ComponentsModule} from "../components/components.module";
import {GridLayoutRouteComponent} from "./components/grid-layout/grid-layout-route.component";
import {FlexGridRouteComponent} from "./components/flex-grid/flex-grid-route.component";
import {ResponsiveContainerRouteComponent} from "./components/responsive-container/responsive-container-route.component";
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: 'components',
    children: [{
      path: 'layout',
      children: [
        {path: 'grid', component: GridLayoutRouteComponent},
        {path: 'flex-grid', component: FlexGridRouteComponent},
        {path: 'responsive-container', component: ResponsiveContainerRouteComponent}
      ]
    }]
  }
]

export const COMPONENTS = [
  PageNotFoundComponent,
  GridLayoutRouteComponent,
  FlexGridRouteComponent,
  ResponsiveContainerRouteComponent
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ComponentsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class RouteComponentsModule {}
