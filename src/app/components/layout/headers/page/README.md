### PageHeader

Renders a page header.

### IO

- **@Input(title):** `string` The title header
- **@Input(fallbackSeed):** `string` A seed value used to select the background svg
- **@Input(fallbackColor):** [`FALLBACK_COLORS`](https://github.com/EFEducationFirstMobile/ef-class-web/blob/master/libraries/components/src/lib/media/image/fallback/fallback-image.component.ts) If supplied overrides seed value to explicitly select background color
- **@Input(overlayColor):** [`OVERLAY_COLORS`](https://github.com/EFEducationFirstMobile/ef-class-web/blob/master/libraries/components/src/lib/common/overlay/color/color-overlay.component.ts)
- **@Input(imageUrl):** `string` An optional image url
- **@Input(size):** `string` An optional image size

#### Usage

```html
<ef-class-page-header
    [title]="title"
    [fallbackSeed]="seed"
    [fallbackColor]="fallback_color"
    [overlayColor]="overlay_color"
    [imageUrl]="url"
    [size]="size">
</ef-class-page-header>
```
