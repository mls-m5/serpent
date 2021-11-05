import { Obstacle } from "./obstacle";
import { Sprites } from "./sprites";
import { Vec2 } from "./vec2";


function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export class Rock extends Obstacle {
    public isFood = false;

    private rockType: number;

    constructor(private pos: Vec2, private size: number) {
        super(pos, size);
        this.rockType = getRandomInt(1, 4);
    }

    protected getSprite(sprites: Sprites) {
        switch (this.rockType) {
            case 1:
                return sprites.rock1;
            case 2:
                return sprites.rock2;
            default:
                return sprites.rock3;
        }
    }

}