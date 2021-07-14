import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';


export interface MenuItemNode {
  name: string;
  children?: MenuItemNode[]
}



@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnChanges {

  @Input() dataProvider: MenuItemNode[] | undefined;

  treeControl = new NestedTreeControl<MenuItemNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuItemNode>();

  ngOnChanges(changes: SimpleChanges): void {

    if(!this.dataProvider) {
      return;
    }

    this.dataSource.data = this.dataProvider;
  }

  hasChild = (_: number, node: MenuItemNode) => !!node.children && node.children.length > 0;
}
