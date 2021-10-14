# Page Header

## IO

**@Input (title):** `string` - The title header

**@Input (fallbackSeed):** `string` - A seed value used to select the background svg

**@Input (fallbackColor):** [`FALLBACK_COLORS`](https://github.com/jamesbrobb/portfolio/blob/main/src/app/components/media/image/fallback/fallback-image.component.ts#L8) - If supplied overrides seed value to explicitly select background color

**@Input (overlayColor):** [`OVERLAY_COLORS`](https://github.com/jamesbrobb/portfolio/blob/main/src/app/components/common/overlay/color/color-overlay.component.ts#L5)

**@Input (imageUrl):** `string` - An optional image url

**@Input (imageSize):** `string` - An optional image size to be appended to the end of the image url


## Usage

```html
<page-header
    [title]="title"
    [fallbackSeed]="seed"
    [fallbackColor]="fallback_color"
    [overlayColor]="overlay_color"
    [imageUrl]="url"
    [imageSize]="size">
</page-header>
```
