
import { Gfx } from "./gfx";
import { Serpent } from "./serpent";
import { Vec2 } from "./vec2";
import { Controller } from './controller';


export class Game {
    private player: Serpent;
    private controller: Controller;

    constructor(private gfx: Gfx) {
        this.controller = new Controller(document);
        this.player = new Serpent({ x: 50, y: 100 }, this.controller);
    }

    public start() {
        setTimeout(() => this.update(), 100);
    }


    private draw() {
        this.gfx.clear();
        this.player.draw(this.gfx);
    }


    public update() {

        this.draw();

        this.player.update();

        window.requestAnimationFrame(() => this.update());
    }
}