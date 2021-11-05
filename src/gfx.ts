import { Loc2 } from "./vec2";
import { Sprites } from "./sprites";

interface Sprite {
    image: HTMLImageElement;
    w: number;
    h: number;
}

export class Gfx {
    private readonly canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private scrollAmount = 0;

    public sprites: Sprites;

    constructor(public body: HTMLBodyElement) {
        this.canvas = document.createElement('canvas');
        this.canvas.style.height = '90vh';
        this.canvas.style.width = '90vw';

        this.sprites = new Sprites(body);

        this.body.appendChild(this.canvas);

        let res = this.canvas.getContext("2d");
        if (!res || !(res instanceof CanvasRenderingContext2D)) {
            throw new Error('Failed to get 2D context');
        }
        this.ctx = res;
        this.ctx.imageSmoothingEnabled = false;
    }

    public setScroll(amount: number) {
        this.scrollAmount = amount;
    }

    public drawSprite(loc: Loc2, sprite: Sprite) {
        this.ctx.save();

        this.ctx.translate(0, this.scrollAmount);
        this.ctx.translate(loc.x, loc.y);
        this.ctx.rotate(loc.angle);
        this.ctx.translate(-sprite.w / 2, -sprite.h / 2)
        this.ctx.drawImage(sprite.image, 0, 0);
        this.ctx.restore();
    }

    public drawHead(x: number, y: number, angle: number) {
        this.drawSprite({ x: x, y: y, angle: angle }, this.sprites.headSprite);
    }

    public drawTailSegment(loc: Loc2) {
        this.drawSprite(loc, this.sprites.tailSprite);
    }

    public drawBodySegment(loc: Loc2) {
        this.drawSprite(loc, this.sprites.bodySprite);
    }

    public clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}