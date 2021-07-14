import { Component } from '@angular/core';
import {MenuItemNode} from "./components/side-menu/side-menu.component";


const MENU_DATA_PROVIDER: MenuItemNode[] = [{
  name: 'Components',
  children: [{
    name: 'Layout',
    children: [{
      name: 'Grid'
    }, {
      name: 'Flex Grid'
    },{
      name: 'Responsive'
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
}
