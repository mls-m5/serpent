import { Loc2 } from "./vec2";
import { Sprites } from "./sprites";
import { settings } from "./settings";
import { Particle } from "./particle";

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
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        this.canvas.style.width = '1920px';
        this.canvas.style.height = '1080px';


        this.sprites = new Sprites(body);

        this.body.appendChild(this.canvas);

        let res = this.canvas.getContext("2d");
        if (!res || !(res instanceof CanvasRenderingContext2D)) {
            throw new Error('Failed to get 2D context');
        }
        this.ctx = res;
        this.ctx.imageSmoothingEnabled = settings.enableImageSmoothing;
    }

    public setScroll(amount: number) {
        this.scrollAmount = amount;
    }

    public resetTransform() {
    }

    public drawSprite(loc: Loc2, sprite: Sprite) {
        this.ctx.resetTransform();
        this.ctx.scale(8, 8);
        this.ctx.save();
        this.ctx.translate(0, this.scrollAmount);
        this.ctx.translate(loc.x, loc.y);
        this.ctx.rotate(loc.angle);
        this.ctx.translate(-sprite.w / 2, -sprite.h / 2);
        this.ctx.scale(1 / 16, 1 / 16);
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

    public drawParticles(particles: Array<Particle>) {
        for (let particle of particles) {
            this.ctx.fillRect(particle.x, particle.y + this.scrollAmount, 1, 1);
        }
    }

    public clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}