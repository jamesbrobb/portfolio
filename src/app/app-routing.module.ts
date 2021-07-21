import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RouteComponentsModule} from "./routeComponents/route-components.module";
import {PageNotFoundComponent} from "./routeComponents/page-not-found/page-not-found.component";

const ROUTES: Routes = [
  //{ path: '' },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES),
    RouteComponentsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
