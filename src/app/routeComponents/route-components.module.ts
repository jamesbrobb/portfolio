import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ComponentsModule} from "../components/components.module";
import {GridLayoutRouteComponent} from "./components/grid-layout/grid-layout-route.component";
import {FlexGridRouteComponent} from "./components/flex-grid/flex-grid-route.component";
import {ResponsiveContainerRouteComponent} from "./components/responsive-container/responsive-container-route.component";
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AnalyticsRouteComponent} from "./core/analytics/analytics-route.component";
import {HooksRouteComponent} from "./core/hooks/hooks-route.component";
import {HttpRouteComponent} from "./core/http/http-route.component";

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
  }, {
    path: 'core',
    children: [
      {path: 'analytics', component: AnalyticsRouteComponent},
      {path: 'hooks', component: HooksRouteComponent},
      {path: 'http', component: HttpRouteComponent}
    ]
  }
]

export const COMPONENTS = [
  PageNotFoundComponent,
  GridLayoutRouteComponent,
  FlexGridRouteComponent,
  ResponsiveContainerRouteComponent,
  AnalyticsRouteComponent,
  HooksRouteComponent,
  HttpRouteComponent
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
