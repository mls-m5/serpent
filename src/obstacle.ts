
import { Gfx } from "./gfx";
import { Sprites } from "./sprites";
import { Vec2 } from "./vec2";

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export class Obstacle {
    public isDead = false;
    private rockType: number;

    constructor(private pos: Vec2, private size: number) {
        this.rockType = getRandomInt(1, 4);
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

    getSprite(sprites: Sprites) {
        switch (this.rockType) {
            case 1:
                return sprites.rock1;
            case 2:
                return sprites.rock2;
            default:
                return sprites.rock3;
        }
    }

    draw(gfx: Gfx) {
        gfx.drawSprite({ x: this.pos.x, y: this.pos.y, angle: 0 }, this.getSprite(gfx.sprites));
    }

    update() {
    }

}