export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>(res => {
        const image = new Image();
        image.crossOrigin = "Anonymous";
        image.onload = () => {
            res(image);
        };
        image.src = url;
    });
}
