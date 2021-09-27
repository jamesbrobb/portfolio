# **Color Overlay**

Renders a transparent color overlay.

## IO

**@Input(color):** `OVERLAY_COLORS` the overlay color. Defaults to blue.

**@Input(allowTransition):** `boolean` whether the overlay color should animate when changed. Defaults to true.

## Usage

```html
<color-overlay
    [color]="color"
    [allowTransition]="allowTransition">
</color-overlay>
```
