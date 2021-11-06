
import { Gfx } from "./gfx";
import { Sprites } from "./sprites";
import { Vec2 } from "./vec2";



export abstract class Obstacle {
    public abstract readonly isFood: boolean;
    public isDead = false;

    constructor(private pos: Vec2, private size: number) {
    }

    getPos() {
        return this.pos;
    }

    isCollision(v: Vec2, size: number): boolean {
        if (this.isDead) {
            return false;
        }
        let dx = this.pos.x - v.x;
        let dy = this.pos.y - v.y;

        let d = (this.size + size) / 2;
        return dx * dx + dy * dy < d * d;
    }

    protected abstract getSprite(sprites: Sprites): { image: HTMLImageElement; w: number; h: number; };

    draw(gfx: Gfx) {
        gfx.drawSprite({ x: this.pos.x, y: this.pos.y, angle: 0 }, this.getSprite(gfx.sprites));
    }

    update() {
    }

}