# **Page Header**

## IO

**@Input(title):** `string` The title header

**@Input(fallbackSeed):** `string` A seed value used to select the background svg

**@Input(fallbackColor):** [`FALLBACK_COLORS`] If supplied overrides seed value to explicitly select background color

**@Input(overlayColor):** [`OVERLAY_COLORS`]

**@Input(imageUrl):** `string` An optional image url

**@Input(size):** `string` An optional image size


## Usage

```html
<page-header
    [title]="title"
    [fallbackSeed]="seed"
    [fallbackColor]="fallback_color"
    [overlayColor]="overlay_color"
    [imageUrl]="url"
    [size]="size">
</page-header>
```
