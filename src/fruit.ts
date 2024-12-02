import { Obstacle } from "./obstacle";
import { Sprites } from "./sprites";
import { Vec2 } from "./vec2";

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export class Fruit extends Obstacle {
    public readonly isFood = true;
    private type: number;

    constructor(pos: Vec2, size: number) {
        super(pos, size);
        this.type = getRandomInt(1, 4);
    }

    protected getSprite(sprites: Sprites) {
        switch (this.type) {
            case 1:
                return sprites.apple;
            case 2:
                return sprites.cherry;
            default:
                return sprites.orange;
        }
    }
}