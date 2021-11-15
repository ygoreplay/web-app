/* eslint-disable @typescript-eslint/no-unused-vars,no-param-reassign,one-var,prefer-const */
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

export interface ImageClipArea {
    clip: Rectangle;
    x: number;
    y: number;
    width: number;
    height: number;
    translate: Position;
    imageSize: number;
    scaling: number;
    flip: boolean;
}

export function generateClipArea(clip: Rectangle, container: Container, imageSize: number = 304, flip: boolean = false): ImageClipArea {
    const { width: containerWidth, height: containerHeight, anchor } = container;
    let newWidth = clip.width,
        newHeight = clip.height,
        newX = clip.x,
        newY = clip.y,
        translateX = 0,
        translateY = 0;

    // 선택 영역의 가운데가 이미지의 왼쪽에 있다면 이미지를 뒤집어서 다시 실행해본다.
    if (newX + newWidth / 2 < imageSize / 2 && !flip) {
        const newClip: Rectangle = {
            x: imageSize / 2 + (imageSize / 2 - clip.x),
            y: clip.y,
            width: clip.width,
            height: clip.height,
        };

        return generateClipArea(newClip, container, imageSize, true);
    }

    // 컨테이너가 가득 찰때까지 잘라낼 사각형의 가로 폭을 넓힌다.
    let drawnRight = anchor.x + clip.width / 2;
    if (containerWidth > drawnRight) {
        const oldWidth = newWidth;
        const widthThreshold = imageSize - newX;
        newWidth += containerWidth - drawnRight;

        // 사각형 영역의 오른쪽이 이미지를 넘어서고 있다면 조정한다
        if (newWidth > widthThreshold) {
            newWidth = widthThreshold;
        }

        drawnRight += newWidth - oldWidth;
    }

    // 최대한으로 가로 폭을 넓혔지만 컨테이너를 채우지 못한다면 잘라낼 사각형 영역을 왼쪽으로 늘린다
    if (containerWidth > drawnRight) {
        newX -= containerWidth - drawnRight;
        newWidth += containerWidth - drawnRight;
    }

    // 배치한 이미지의 왼쪽이 컨테이너의 왼쪽 끝과 떨어져 있다면 맞추도록 한다.
    const drawnLeft = anchor.x - clip.width / 2;
    if (drawnLeft > 0) {
        newX -= drawnLeft;
        newWidth += drawnLeft;
        translateX -= drawnLeft;
    }

    // 컨테이너가 가득 찰때까지 잘라낼 사각형의 세로 높이를 넓힌다.
    if (clip.height < containerHeight) {
        newHeight = containerHeight;
        translateY -= anchor.y - clip.height / 2;
    }

    // X 값 보정
    newX = Math.max(0, newX);

    return {
        clip,
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
        translate: {
            x: translateX,
            y: translateY,
        },
        imageSize,
        scaling: 1,
        flip,
    };
}
