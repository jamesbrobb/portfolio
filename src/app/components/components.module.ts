import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTreeModule} from "@angular/material/tree";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {MarkdownModule} from 'ngx-markdown';
import {GridLayoutComponent} from "./grid-layout/grid-layout.component";
import {ResponsiveContainerDirective} from "./responsive/container/responsive-container.directive";
import {SideMenuComponent} from "./side-menu/side-menu.component";
import {ResizeObserverService} from "./responsive/resize-observer.service";
import {AppContainerComponent} from "./container/app-container.component";
import {PageContainerComponent} from "./page-container/page-container.component";
import {AnalyticsModule} from "../ng/core";
import {FallbackImageComponent} from "./media/image/fallback/fallback-image.component";
import {ImageComponent} from "./media/image/image/image.component";
import {ColorOverlayComponent} from "./common/overlay/color/color-overlay.component";
import {PageHeaderComponent} from "./layout/headers/page/page-header.component";
import {LessonPlanCardComponent} from "./product/lesson-plan/card/lesson-plan-card.component";
import {LessonPlanHeroComponent} from "./product/lesson-plan/hero/lesson-plan-hero.component";
import {LessonPlanGridComponent} from "./product/lesson-plan/grid/lesson-plan-grid.component";
import {LessonPlanHeaderComponent} from "./product/lesson-plan/header/lesson-plan-header.component";
import {LessonPlanInfoComponent} from "./product/lesson-plan/info/lesson-plan-info.component";
import {LessonPlanVocabularyComponent} from "./product/lesson-plan/vocabulary/lesson-plan-vocabulary.component";
import {LessonPlanBriefComponent} from "./product/lesson-plan/brief/lesson-plan-brief.component";
import {TextTagsComponent} from "./product/playlist-item/text-tags/text-tags";
import {HtmlRendererComponent} from "./common/renderers/html-renderer/html-renderer.component";
import {LessonPlanCreditsComponent} from "./product/lesson-plan/credits/lesson-plan-credits.component";
import {MyLibraryLessonPlanCardComponent} from "./product/my-library/lesson-plan-card/my-library-lesson-plan-card.component";
import {IconsModule} from "./common/icons";
import {CodemirrorComponent} from "./forms/codemirror/codemirror.component";
import {JsonEditorComponent} from "./forms/json-editor/json-editor.component";
import {HrefListenerDirective} from "./utils/util.directives";


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
  LessonPlanCardComponent,
  LessonPlanHeroComponent,
  LessonPlanGridComponent,
  LessonPlanHeaderComponent,
  LessonPlanInfoComponent,
  LessonPlanVocabularyComponent,
  LessonPlanBriefComponent,
  LessonPlanCreditsComponent,
  TextTagsComponent,
  HtmlRendererComponent,
  MyLibraryLessonPlanCardComponent,
  CodemirrorComponent,
  JsonEditorComponent,
  HrefListenerDirective
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
    MatSidenavModule,
    MatTooltipModule,
    MatMenuModule,
    IconsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    ResizeObserverService
  ]
})
export class ComponentsModule { }
