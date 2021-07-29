import {Component, Input, OnDestroy} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs/operators";


export interface MenuItemNode {
  name: string;
  children?: MenuItemNode[]
  path?: string
}

const MENU_DATA_PROVIDER: MenuItemNode[] = [{
  name: 'Components',
  path: 'components',
  children: [{
    name: 'Layout',
    path: 'layout',
    children: [{
      name: 'Grid',
      path: 'components/layout/grid'
    }, {
      name: 'Flex Grid',
      path: 'components/layout/flex-grid'
    },{
      name: 'Responsive',
      path: 'components/layout/responsive-container'
    }]
  }]
}];



@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  private _router: Router;

  treeControl = new NestedTreeControl<MenuItemNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuItemNode>();

  constructor(router: Router) {

    this._router = router;
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(this._handleRouteChange);

    this.dataSource.data = MENU_DATA_PROVIDER;
    this.treeControl.dataNodes = MENU_DATA_PROVIDER;
  }

  hasChild = (_: number, node: MenuItemNode) => !!node.children && node.children.length > 0;

  private _handleRouteChange = (event: any): void => {

    const rEvt: RouterEvent = event as RouterEvent;
    const frags: string[] = rEvt.url.split('/')
                                    .filter(value => !!value);

    let node: MenuItemNode | undefined;
    let nodes: MenuItemNode[] = this.treeControl.dataNodes;

    frags.map((frag: string) => {

      node = nodes.find((value: MenuItemNode) => value.path === frag);

      if(!node) {
        return;
      }

      if(!this.treeControl.isExpanded(node)){
        this.treeControl.expand(node);
      }

      if(!node.children) {
        return;
      }

      nodes = node.children;
    });
  }
}
