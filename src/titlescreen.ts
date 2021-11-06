
import { Gfx } from "./gfx";

export class TitleScreen {

    public draw(gfx: Gfx) {
        let x = -200;
        gfx.drawText(500 + x, 300, "A simple serpent", 150, true);
        gfx.drawText(550 + x, 350, "A game by", 20);
        gfx.drawText(600 + x, 380, "Mattias Larsson Sköld &", 20);
        gfx.drawText(650 + x, 410, "Hannes Kindströmmer", 20);

        gfx.drawText(700, 800, "Press space to play", 60);

        setTimeout(() => {
            gfx.drawSprite({ x: 200, y: 100, angle: 0 }, gfx.sprites.energyDrink);
            gfx.drawSprite({ x: 20, y: 100, angle: 0 }, gfx.sprites.orange);
            gfx.drawSprite({ x: 30, y: 110, angle: 0 }, gfx.sprites.cherry);
            gfx.drawSprite({ x: 40, y: 100, angle: 0 }, gfx.sprites.apple);

            gfx.drawSprite({ x: 100, y: 120, angle: 0 }, gfx.sprites.rock1);
            gfx.drawSprite({ x: 130, y: 120, angle: 0 }, gfx.sprites.rock3);
            gfx.drawSprite({ x: 146, y: 120, angle: 0 }, gfx.sprites.rock2);
        }, 400);
    }
}