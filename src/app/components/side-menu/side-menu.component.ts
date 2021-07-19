import {Component, Input} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';


export interface MenuItemNode {
  name: string;
  children?: MenuItemNode[]
  path?: string
}

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
}];



@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  treeControl = new NestedTreeControl<MenuItemNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuItemNode>();

  constructor() {
    this.dataSource.data = MENU_DATA_PROVIDER;
  }

  hasChild = (_: number, node: MenuItemNode) => !!node.children && node.children.length > 0;
}
