import { Fruit } from "./fruit";
import { Sprites } from "./sprites";

export class EnergyDrink extends Fruit {
    protected getSprite(sprites: Sprites) {
        return sprites.energyDrink;
    }
}