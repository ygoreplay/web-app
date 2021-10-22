import { Container, ImageClipArea } from "@utils/generateClipArea";
import { loadImage } from "@utils/loadImage";

export function scalingImage(image: HTMLImageElement | HTMLCanvasElement, scalingFactor: number, originalWidth: number, originalHeight: number) {
    const canvasDOM = document.createElement("canvas");
    canvasDOM.width = Math.round(originalWidth * scalingFactor);
    canvasDOM.height = Math.round(originalHeight * scalingFactor);

    const context = canvasDOM.getContext("2d");
    if (!context) {
        return null;
    }

    context.imageSmoothingEnabled = false;
    context.drawImage(image, 0, 0, originalWidth, originalHeight, 0, 0, Math.round(originalWidth * scalingFactor), Math.round(originalHeight * scalingFactor));

    return canvasDOM;
}

export async function generateClippedImage(src: string, clipArea: ImageClipArea, container: Container) {
    let image: HTMLImageElement | HTMLCanvasElement = await loadImage(src);
    if (clipArea.scaling !== 1) {
        const scaledImage = scalingImage(image, clipArea.scaling, 304, 304);
        if (!scaledImage) {
            return Promise.resolve(null);
        }

        image = scaledImage;
    }

    const canvasDOM = document.createElement("canvas");
    canvasDOM.width = container.width;
    canvasDOM.height = container.height;

    const context = canvasDOM.getContext("2d");
    if (!context) {
        return Promise.resolve(null);
    }

    context.imageSmoothingEnabled = false;
    let targetX = container.anchor.x - Math.round(clipArea.width * clipArea.scaling) / 2;
    const targetY = container.anchor.y - Math.round(clipArea.height * clipArea.scaling) / 2 - 1;
    const targetWidth = Math.round(clipArea.width * clipArea.scaling);
    const targetHeight = Math.round(clipArea.height * clipArea.scaling);

    while (targetX + targetWidth > container.width) {
        targetX--;
    }

    context.drawImage(
        image,
        clipArea.x * clipArea.scaling,
        clipArea.y * clipArea.scaling,
        clipArea.width * clipArea.scaling,
        clipArea.height * clipArea.scaling,
        Math.round(targetX),
        Math.round(targetY),
        Math.round(targetWidth),
        Math.round(targetHeight),
    );

    return new Promise<string | null>(res => {
        canvasDOM.toBlob(
            blob => {
                if (!blob) {
                    res(null);
                }

                // eslint-disable-next-line compat/compat
                res(URL.createObjectURL(blob));
            },
            "png",
            100,
        );
    });
}
