

export class Sprites {
    public headSprite = this.loadSprite("assets/head.png", 16, 16);
    public bodySprite = this.loadSprite("assets/body.png", 16, 16);
    public tailSprite = this.loadSprite("assets/tail.png", 16, 16);
    public rock1 = this.loadSprite("assets/rock-big-1.png", 16, 16);
    public rock2 = this.loadSprite("assets/rock-big-2.png", 16, 16);
    public rock3 = this.loadSprite("assets/rock-big-3.png", 16, 16);
    public apple = this.loadSprite("assets/apple.png", 16, 16);
    public orange = this.loadSprite("assets/orange.png", 16, 16);
    public cherry = this.loadSprite("assets/cherry.png", 16, 16);
    public energyDrink = this.loadSprite("assets/energy-drink.png", 16, 16);
    public white = this.loadSprite("assets/white.png", 16, 16);

    constructor(private body: HTMLBodyElement) { }

    private loadSprite(path: string, w: number, h: number) {
        const image = document.createElement("img");
        image.src = path;
        image.hidden = true;
        this.body.appendChild(image);
        return { image: image, w: w, h: h };
    }
}

