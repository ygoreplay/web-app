/* eslint-disable @typescript-eslint/no-unused-vars,no-param-reassign */
export interface Size {
    width: number;
    height: number;
}

export interface Position {
    x: number;
    y: number;
}

export interface Container extends Size {
    anchor: Position;
    threshold?: Partial<Size>;
}

export interface Rectangle extends Size, Position {}

export type ImageClipArea = ReturnType<typeof generateClipArea>;

export function generateClipArea(clip: Rectangle, { width: containerWidth, height: containerHeight, threshold }: Container, imageSize: number = 304) {
    const { x, y, width: clipWidth, height: clipHeight } = clip;
    let newX = x;
    let newWidth = clipWidth;
    const newHeight = clipHeight;
    let scaling = 1;

    if (clipHeight > containerHeight) {
        scaling = containerHeight / clipHeight;
    }

    if (threshold && threshold.width) {
        while ((newWidth * scaling) / containerWidth < threshold.width && newWidth < imageSize) {
            if (newX > 0) {
                --newX;
            } else if (newX <= 0) {
                ++newX;
            }

            ++newWidth;
        }
    }

    return {
        ...clip,
        width: newWidth,
        height: newHeight,
        x: newX,
        imageSize,
        scaling,
    };
}
