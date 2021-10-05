import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from "@angular/router";
import {ComponentsModule} from "../components/components.module";
import {GridLayoutRouteComponent} from "./components/grid-layout/grid-layout-route.component";
import {FlexGridRouteComponent} from "./components/flex-grid/flex-grid-route.component";
import {ResponsiveContainerRouteComponent} from "./components/responsive-container/responsive-container-route.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AnalyticsRouteComponent} from "./core/analytics/analytics-route.component";
import {HooksRouteComponent} from "./core/hooks/hooks-route.component";
import {HttpRouteComponent} from "./core/http/http-route.component";
import {FallbackImageRouteComponent} from "./components/fallback-image/fallback-image.route.component";
import {ImageComponentRouteComponent} from "./components/image-component/image-component.route.component";
import {ColorOverlayRouteComponent} from "./components/color-overlay/color-overlay.route.component";
import {PageHeaderRouteComponent} from "./components/page-header/page-header.route.component";
import {HomeRouteComponent} from "./home/home.route.component";
import {LessonPlanCardRouteComponent} from "./components/product/lesson-plan/card/lesson-plan-card.route.component";
import {LessonPlanHeroRouteComponent} from "./components/product/lesson-plan/hero/lesson-plan-hero.route.component";
import {LessonPlanGridRouteComponent} from "./components/product/lesson-plan/grid/lesson-plan-grid.route.component";

const routes: Routes = [
  {
    path: '',
    component: HomeRouteComponent
  }, {
    path: 'components',
    children: [{
      path: 'common',
      children: [
        {
          path: 'overlay',
          children: [
            {path: 'color-overlay', component: ColorOverlayRouteComponent}
          ]
        }
      ]
    }, {
      path: 'layout',
      children: [
        {path: 'grid', component: GridLayoutRouteComponent},
        {path: 'flex-grid', component: FlexGridRouteComponent},
        {path: 'responsive-container', component: ResponsiveContainerRouteComponent},
        {path: 'page-header', component: PageHeaderRouteComponent}
      ]
    }, {
      path: 'media',
      children: [
        {
          path: 'image',
          children: [
            {path: 'fallback', component: FallbackImageRouteComponent},
            {path: 'image-component', component: ImageComponentRouteComponent}
          ]
        }
      ]
    }, {
      path: 'product',
      children: [
        {
          path: 'lesson-plan',
          children: [
            {path: 'card', component: LessonPlanCardRouteComponent},
            {path: 'hero', component: LessonPlanHeroRouteComponent},
            {path: 'grid', component: LessonPlanGridRouteComponent}
          ]
        }
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
  HomeRouteComponent,
  GridLayoutRouteComponent,
  FlexGridRouteComponent,
  ResponsiveContainerRouteComponent,
  AnalyticsRouteComponent,
  HooksRouteComponent,
  HttpRouteComponent,
  FallbackImageRouteComponent,
  ImageComponentRouteComponent,
  ColorOverlayRouteComponent,
  PageHeaderRouteComponent,
  LessonPlanCardRouteComponent,
  LessonPlanHeroRouteComponent,
  LessonPlanGridRouteComponent
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ComponentsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class RouteComponentsModule {}
