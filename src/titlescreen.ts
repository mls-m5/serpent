
import { Gfx } from "./gfx";

export class TitleScreen {

    public draw(gfx: Gfx) {
        gfx.drawText(100, 100, "A simple serpent", 50, true);
        gfx.drawText(100, 130, "A game by", 20);
        gfx.drawText(120, 160, "Mattias Larsson Sköld", 20);
        gfx.drawText(140, 180, "Hannes Kindströmmer", 20);
    }
}