import { Gfx } from "./src/gfx";

export class EndScreen {
    public draw(gfx: Gfx) {
        gfx.overlay("rgba(100,0,0)", .4);
        gfx.drawText(40, 40, "You are dead", 20);
        gfx.drawText(70, 60, "press space to retry", 10);
    }
}