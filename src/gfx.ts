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
    private shakeAmount: Loc2 = { x: 0, y: 0, angle: 0 };

    public sprites: Sprites;

    constructor(public body: HTMLBodyElement) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = settings.width;
        this.canvas.height = settings.height;

        const borderOffset = 8;
        const normalHeight = (window.innerHeight - borderOffset) / 9;
        const normalWidth = (window.innerWidth - borderOffset) / 16;
        const smallest = Math.min(normalHeight, normalWidth)

        this.canvas.style.width = `${smallest * 16}px`;
        this.canvas.style.height = `${smallest * 9}px`;

        this.canvas.style.border = '4px solid black';


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

    public update() {
        this.shakeAmount.angle /= 1.1;
        this.shakeAmount.x /= 1.1;
        this.shakeAmount.y /= 1.1;
    }

    public shake(amount: number) {
        this.shakeAmount.x = amount * Math.random();
        this.shakeAmount.y = amount * Math.random();
        this.shakeAmount.angle = amount * Math.random() / 100;
    }

    public drawSprite(loc: Loc2, sprite: Sprite, scale = 1, opacity = 1) {
        this.ctx.resetTransform();
        this.ctx.scale(8, 8);
        this.ctx.translate(this.shakeAmount.x, this.shakeAmount.y);
        //this.ctx.rotate(this.shakeAmount.angle);
        this.ctx.save();
        this.ctx.translate(0, this.scrollAmount);
        this.ctx.translate(loc.x, loc.y);
        this.ctx.rotate(loc.angle);
        this.ctx.translate(-sprite.w / 2, -sprite.h / 2);
        this.ctx.scale(1 / 16, 1 / 16);
        this.ctx.scale(scale, scale)
        this.ctx.globalAlpha = opacity;
        this.ctx.drawImage(sprite.image, 0, 0);
        this.ctx.restore();
    }

    public drawHead(x: number, y: number, angle: number, scale: number) {
        this.drawSprite({ x, y, angle }, this.sprites.headSprite);
    }

    public drawWhiteSquare(x: number, y: number, angle: number, scale: number) {
        this.drawSprite({ x, y, angle }, this.sprites.white);
    }

    public drawTailSegment(loc: Loc2, scale: number) {
        this.drawSprite(loc, this.sprites.tailSprite, scale);
    }

    public drawBodySegment(loc: Loc2, scale: number) {
        this.drawSprite(loc, this.sprites.bodySprite);
    }

    public drawParticles(particles: Array<Particle>) {
        for (let particle of particles) {
            this.ctx.fillRect(particle.x, particle.y + this.scrollAmount, 1, 1);
        }
    }

    public drawText(x: number, y: number, text: string, size: number, hasBorders = false) {
        this.ctx.font = size + 'px sans';
        this.ctx.fillStyle = "white";
        this.ctx.fillText(text, x, y);
        if (hasBorders) {
            this.ctx.strokeText(text, x, y);
        }
    }

    public clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public overlay(color: string, opacity = 1) {
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = opacity;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = 1;
    }

    public drawStripe(x: number, len: number) {
        this.ctx.fillStyle = "rgb(255,30,30)";
        this.ctx.fillRect(x, 0, 1, len);
    }
}