import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GridExampleComponent} from "./examples/grid-example/grid-example.component";
import {ResponsiveExampleComponent} from "./examples/responsive-example/responsive-example.component";

const routes: Routes = [
  { path: 'grid', component: GridExampleComponent },
  { path: 'flex-grid', component: GridExampleComponent },
  { path: 'responsive', component: ResponsiveExampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
