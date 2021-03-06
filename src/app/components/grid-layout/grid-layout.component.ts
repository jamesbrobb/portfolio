import {Component, ContentChild, Input, TemplateRef} from '@angular/core';



@Component({
  selector: 'grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss']
})
export class GridLayoutComponent {

  @Input() dataProvider: unknown[] | undefined;

  @ContentChild(TemplateRef, {static: true})
  public itemTemplate: TemplateRef<any> | null = null;

  public trackById(index: number, item: any): string {
    return item['id'] ?? undefined;
  }
}
