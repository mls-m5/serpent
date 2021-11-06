import { Obstacle } from './obstacle';
import { Sprites } from './sprites';

export class Fruit extends Obstacle {
    public readonly isFood = true;

    protected getSprite(sprites: Sprites) {
        return sprites.energyDrink;
    }
}