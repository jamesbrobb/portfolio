
# RoundedCornerSvgComponent

Given a configuration for color, radius, width and height displays SVG files with a background containing those parameters.
Wraps [SvgComponent]

## IO

**@Input(iconConfig):** `RoundedCornerSvgConfig`. The configuration for the icon

## Usage

RoundedCornerSvgConfig {
    name: string;
    size: BACKGROUND_SIZES;
    radius: RADIUS;
    color: BACKGROUND_COLORS;
}

```html

<ef-class-rounded-corner-svg
    config="config"
></ef-class-rounded-corner-svg>
```
