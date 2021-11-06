
import { Gfx } from "./gfx";

export class TitleScreen {

    public draw(gfx: Gfx) {
        gfx.drawText(500, 300, "A simple serpent", 150, true);
        gfx.drawText(550, 350, "A game by", 20);
        gfx.drawText(600, 380, "Mattias Larsson Sköld &", 20);
        gfx.drawText(650, 410, "Hannes Kindströmmer", 20);

        gfx.drawText(800, 800, "Press space to play", 60);
    }
}