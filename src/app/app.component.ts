import { Component } from '@angular/core';
import {MenuItemNode} from "./components/side-menu/side-menu.component";
import {Router} from "@angular/router";


const MENU_DATA_PROVIDER: MenuItemNode[] = [{
  name: 'Components',
  children: [{
    name: 'Layout',
    children: [{
      name: 'Grid',
      path: 'grid'
    }, {
      name: 'Flex Grid',
      path: 'flex-grid'
    },{
      name: 'Responsive',
      path: 'responsive-container'
    }]
  }]
}

];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  menuDataProvider: MenuItemNode[] = MENU_DATA_PROVIDER;

  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  onItemSelect($event: MenuItemNode): void {
    this._router.navigate([$event.path]);
  }
}
