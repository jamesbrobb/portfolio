export enum BACKGROUND_COLORS {
    BLUE= 'blue',
    GREEN= 'green',
    RED= 'red',
    PURPLE= 'purple',
    PINK= 'pink',
    GREY= 'grey',
    YELLOW= 'yellow'
}

export enum SVG_COLORS {
    BLUE = 'blue',
    DARK_BLUE = 'dark-blue',
    GREEN= 'green',
    RED= 'red',
    PURPLE= 'purple',
    PINK= 'pink',
    GREY= 'grey'
}

export enum BACKGROUND_SIZES {
    SIZE_XS= 'size-xs',
    SIZE_S= 'size-s',
    SIZE_M= 'size-m',
    SIZE_L= 'size-l',
    SIZE_XL= 'size-xl',
    SIZE_XXL= 'size-xxl',
    SIZE_XXXL= 'size-xxxl'
}


export enum RADIUS {
    RADIUS_S= 'radius-s',
    RADIUS_M= 'radius-m',
    RADIUS_L= 'radius-l',
    RADIUS_XL= 'radius-xl',
    RADIUS_XXL= 'radius-xxl',
    RADIUS_XXXL= 'radius-xxxl',
}

export interface RoundedCornerSvgConfig {
    name: string;
    radius: RADIUS;
    backgroundColor?: BACKGROUND_COLORS;
    size?: BACKGROUND_SIZES;
    svgColor?: SVG_COLORS;
}
