# Grid Layout

A simple grid layout component for rendering an `auto-fill` grid.

Content projection is used to render the supplied UI component repeatedly within the grid. A flex based responsive grid fallback is used if `display:grid` is not supported.

## IO

**@Input (dataProvider):** `Array<unknown>` - An array of data objects to be rendered


## Usage

```html
<grid-layout class="grid"
    [dataProvider]="dataProvider">

    <ng-template let-item="item">

        <some-component-to-render class="grid-item"
          [dataProvider]="item">
        </some-component-to-render>

    </ng-template>

</grid-layout>
```

## Example
