import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RouteComponentsModule} from "./routeComponents/route-components.module";

@NgModule({
  imports: [
    RouterModule.forRoot([]),
    RouteComponentsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
