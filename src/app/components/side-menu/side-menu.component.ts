import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';


export interface MenuItemNode {
  name: string;
  children?: MenuItemNode[]
  path?: string
}



@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnChanges {

  @Input() dataProvider: MenuItemNode[] | undefined;
  @Output() itemSelected: EventEmitter<MenuItemNode> = new EventEmitter<MenuItemNode>();

  treeControl = new NestedTreeControl<MenuItemNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuItemNode>();

  ngOnChanges(changes: SimpleChanges): void {

    if(!this.dataProvider) {
      return;
    }

    this.dataSource.data = this.dataProvider;
  }

  hasChild = (_: number, node: MenuItemNode) => !!node.children && node.children.length > 0;

  nodeSelected(node:MenuItemNode): void {
    this.itemSelected.emit(node);
  }
}
