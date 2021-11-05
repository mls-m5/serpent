
import { Gfx } from "./gfx";
import { Vec2 } from "./vec2";

export class Obstacle {
    public isDead = false;

    constructor(private pos: Vec2, private size: number) { }

    isCollision(v: Vec2, size: number): boolean {
        if (this.isDead) {
            return false;
        }
        let dx = this.pos.x - v.x;
        let dy = this.pos.y - v.y;

        let d = (this.size + size) / 2;
        return dx * dx + dy * dy < d * d;
    }

    draw(gfx: Gfx) {
        gfx.drawSprite({ x: this.pos.x, y: this.pos.y, angle: 0 }, gfx.sprites.rock1);
    }

    update() {
    }

}