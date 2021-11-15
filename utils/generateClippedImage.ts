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

export function flipImage(image: HTMLImageElement | HTMLCanvasElement) {
    const canvasDOM = document.createElement("canvas");
    canvasDOM.width = Math.round(image.width);
    canvasDOM.height = Math.round(image.height);

    const context = canvasDOM.getContext("2d");
    if (!context) {
        return null;
    }

    context.imageSmoothingEnabled = false;
    context.translate(image.width, 0);
    context.scale(-1, 1);
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);

    return canvasDOM;
}

export async function generateClippedImage(src: string, clipArea: ImageClipArea, container: Container) {
    let image: HTMLImageElement | HTMLCanvasElement = await loadImage(src);
    if (clipArea.flip) {
        const flippedImage = flipImage(image);
        if (flippedImage) {
            image = flippedImage;
        }
    }

    const canvasDOM = document.createElement("canvas");
    canvasDOM.width = container.width;
    canvasDOM.height = container.height;

    const context = canvasDOM.getContext("2d");
    if (!context) {
        return Promise.resolve(null);
    }

    context.imageSmoothingEnabled = false;
    const targetX = container.anchor.x - clipArea.clip.width / 2 + clipArea.translate.x;
    const targetY = container.anchor.y - clipArea.clip.height / 2 + clipArea.translate.y;
    const targetWidth = Math.round(clipArea.width * clipArea.scaling);
    const targetHeight = Math.round(clipArea.height * clipArea.scaling);

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
