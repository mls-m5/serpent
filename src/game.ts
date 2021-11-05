
import { Gfx } from "./gfx";
import { Serpent } from "./serpent";
import { Vec2 } from "./vec2";
import { Controller } from './controller';
import { GameAudio } from "./game-audio";


export class Game {
    private player: Serpent;
    private controller: Controller;

    private scrollAmount = 0;

    constructor(
        private gfx: Gfx,
        private audio: GameAudio
    ) {
        this.controller = new Controller(document);
        this.player = new Serpent({ x: 50, y: 100 }, this.controller, this.audio);
    }

    public start() {
        setTimeout(() => this.update(), 100);
    }

    private draw() {
        this.gfx.setScroll(this.scrollAmount)
        this.gfx.clear();
        this.player.draw(this.gfx);
    }

    public update() {
        this.scrollAmount += .1;
        this.draw();

        this.player.update();

        window.requestAnimationFrame(() => this.update());
    }
}