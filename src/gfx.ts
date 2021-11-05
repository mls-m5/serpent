import { Loc2 } from "./vec2";

interface Sprite {
    image: HTMLImageElement;
    w: number;
    h: number;
}

export class Gfx {
    private readonly canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private headSprite = this.loadSprite("assets/head.png", 16, 16);
    private bodySprite = this.loadSprite("assets/body.png", 16, 16);
    private tailSprite = this.loadSprite("assets/tail.png", 16, 16);

    private scrollAmount = 0;

    private loadSprite(path: string, w: number, h: number) {
        let image = document.createElement("img");
        image.src = path;
        this.body.appendChild(image);
        return { image: image, w: w, h: h };
    }


    constructor(public body: HTMLBodyElement) {
        this.canvas = document.createElement('canvas');
        this.canvas.style.height = '90vh';
        this.canvas.style.width = '90vw';

        this.body.appendChild(this.canvas);

        let res = this.canvas.getContext("2d");
        if (!res || !(res instanceof CanvasRenderingContext2D)) {
            throw new Error('Failed to get 2D context');
        }
        this.ctx = res;
    }

    public setScroll(amount: number) {
        this.scrollAmount = amount;
    }

    public drawSprite(loc: Loc2, sprite: Sprite) {
        this.ctx.save();

        this.ctx.translate(loc.x, loc.y);
        this.ctx.rotate(loc.angle);
        this.ctx.translate(-sprite.w / 2, -sprite.h / 2)
        this.ctx.drawImage(sprite.image, 0, 0);
        this.ctx.restore();
    }

    public drawHead(x: number, y: number, angle: number) {
        this.drawSprite({ x: x, y: y, angle: angle }, this.headSprite);
    }

    public drawTailSegment(loc: Loc2) {
        this.drawSprite(loc, this.tailSprite);
    }

    public drawBodySegment(loc: Loc2) {
        this.drawSprite(loc, this.bodySprite);
    }

    public clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}