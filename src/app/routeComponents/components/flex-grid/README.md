
# Responsive Flex Grid

Two scss mixins, the first of which works in conjunction with the [`responsiveContainer`](components/layout/responsive-container) directive, to turn an element into a responsive flex grid.

Breakpoint values are calculated from the supplied `$min-column-width` and `$gap` values.

## Usage

```scss
@include responsive-flex-grid($grid_class_name, $min-column-width, $gap)

@include flex-grid($grid_class_name, $grid_item_class_name, $min-column-width, $gap, $gap)
```

```html
<div class="grid-layout" responsiveContainer>

    <div class="grid-layout-item" *ngFor="let item of dataProvider; trackBy: trackById">

    <div class="item">
      <div>{{item.title}}</div>
    </div>

  </div>

</div>
```

## Example
