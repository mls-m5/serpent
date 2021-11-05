
import { Gfx } from "./gfx";

export class Game {


    constructor(private gfx: Gfx) {

    }

    public start() {
        setTimeout(() => this.loop(), 1000);
    }


    public loop() {
        this.gfx.drawHead(10, 10, 1);

        window.requestAnimationFrame(() => this.loop());
    }
}