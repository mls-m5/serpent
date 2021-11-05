

export class Sprites {
    private headSprite = this.loadSprite("assets/head.png", 16, 16);
    private bodySprite = this.loadSprite("assets/body.png", 16, 16);
    private tailSprite = this.loadSprite("assets/tail.png", 16, 16);
    private rock1 = this.loadSprite("assets/rock-big-1", 16, 16);

    constructor(private body: HTMLBodyElement) { }

    private loadSprite(path: string, w: number, h: number) {
        let image = document.createElement("img");
        image.src = path;
        this.body.appendChild(image);
        return { image: image, w: w, h: h };
    }
}

