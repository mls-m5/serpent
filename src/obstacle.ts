
import { Gfx } from "./gfx";
import { Sprites } from "./sprites";
import { Loc2, Vec2 } from "./vec2";



export abstract class Obstacle {
    public abstract readonly isFood: boolean;
    public isDead = false;
    private location: Loc2;

    constructor(pos: Vec2, private size: number) {
        this.location = { ...pos, angle: 0 };
    }

    getPos() {
        return this.location;
    }

    getLocation() {
        return this.location;
    }

    isCollision(v: Vec2, size: number): boolean {
        if (this.isDead) {
            return false;
        }
        let dx = this.location.x - v.x;
        let dy = this.location.y - v.y;

        let d = (this.size + size) / 2;
        return dx * dx + dy * dy < d * d;
    }

    protected abstract getSprite(sprites: Sprites): { image: HTMLImageElement; w: number; h: number; };

    draw(gfx: Gfx) {
        gfx.drawSprite(this.location, this.getSprite(gfx.sprites));
    }

    update() {
    }

}