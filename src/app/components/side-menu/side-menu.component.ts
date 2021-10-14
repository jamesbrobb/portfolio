import {Component, Output, EventEmitter} from '@angular/core';
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
  name: 'About',
  path: 'about'
}, {
  name: 'Components',
  path: 'components',
  children: [{
    name: 'Common',
    path: 'common',
    children: [{
      name: 'Overlay',
      path: 'overlay',
      children: [{
        name: 'Color overlay',
        path: 'components/common/overlay/color-overlay'
      }]
    }]
  }, {
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
    }, {
      name: 'Page Header',
      path: 'components/layout/page-header'
    }]
  }, {
    name: 'Media',
    path: 'media',
    children: [{
      name: 'Image',
      path: 'image',
      children: [{
        name: 'Fallback',
        path: 'components/media/image/fallback'
      }, {
        name: 'Image component',
        path: 'components/media/image/image-component'
      }]
    }]
  }, {
    name: 'Product',
    path: 'product',
    children: [{
      name: 'Lesson plan',
      path: 'lesson-plan',
      children: [{
        name: 'Card',
        path: 'components/product/lesson-plan/card'
      }, {
        name: 'Hero',
        path: 'components/product/lesson-plan/hero'
      }, {
        name: 'Grid',
        path: 'components/product/lesson-plan/grid'
      }, {
        name: 'Header',
        path: 'components/product/lesson-plan/header'
      }, {
        name: 'Vocabulary',
        path: 'components/product/lesson-plan/vocabulary'
      }]
    }, {
      name: 'My library',
      path: 'my-library',
      children: [{
        name: 'Lesson plan card',
        path: 'components/product/my-library/lesson-plan-card'
      }]
    }]
  }]
}, {
  name: 'Core',
  path: 'core',
  children: [{
    name: 'Analytics',
    path: 'core/analytics'
  }, {
    name: 'Hooks',
    path: 'core/hooks'
  }, {
    name: 'Http',
    path: 'core/http'
  }]
}];



@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  @Output() menuItemSelected = new EventEmitter()

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

  public onItemClick(): void {
      this.menuItemSelected.emit();
  }

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
