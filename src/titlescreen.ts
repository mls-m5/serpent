
import { Gfx } from "./gfx";

export class TitleScreen {

    public draw(gfx: Gfx) {
        let x = -200;
        gfx.drawText(500 + x, 300, "A simple serpent", 150, true);
        gfx.drawText(550 + x, 350, "A game by", 20);
        gfx.drawText(600 + x, 380, "Mattias Larsson Sköld &", 20);
        gfx.drawText(650 + x, 410, "Hannes Kindströmmer", 20);

        gfx.drawText(700, 800, "Press space to play", 60);
    }
}