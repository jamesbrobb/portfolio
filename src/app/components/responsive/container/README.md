# Responsive Container Directive

A directive that manages the addition and removal of CSS classes to/from a component, depending on the supplied breakpoint values, through the use of `ResizeObserver` (https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)

Optional CSS variables (`--XS`, `--SM`, `--MD` etc) are added to the component styles, which are then retrieved by the directive during `onNgInit`.

## Usage

```html
<div class="container" responsiveContainer></div>
```

```css
.container {
  --XS: 200px;
  --SM: 400px;
  --MD: 600px;
  --LG: 800px;
  --XL: 1000px;
  --XXL: 1200px;

  --responsive-example-background-color: red;

  display: block;
  width: 100%;
  height: 100%;
  background-color: var(--responsive-example-background-color);
}

.container.XS {
  --responsive-example-background-color: yellow;
}

.container.SM {
  --responsive-example-background-color: pink;
}

.container.MD {
  --responsive-example-background-color: green;
}

.container.LG {
  --responsive-example-background-color: orange;
}

.container.XL {
  --responsive-example-background-color: purple;
}

.container.XXL {
  --responsive-example-background-color: blue;
}
```

## Example
