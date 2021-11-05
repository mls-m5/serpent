
import { Gfx } from "./gfx";
import { Serpent } from "./serpent";
import { Controller } from './controller';
import { KeyboardKey } from './keyboard-key';
import { GameAudio } from "./game-audio";
import { Obstacle } from "./obstacle";


export class Game {
    private player: Serpent;
    private obstacles: Array<Obstacle> = [];
    private controller: Controller;

    private scrollAmount = 0;
    private runGameLoop = false;

    constructor(
        private gfx: Gfx,
        private audio: GameAudio
    ) {
        this.controller = new Controller(document);
        this.controller.onKeyPressed(KeyboardKey.SPACE, () => this.runGameLoop ? this.pause() : this.start());

        this.player = new Serpent({ x: 50, y: 100 }, this.controller, this.audio);
    }

    public pause() {
        this.runGameLoop = false;
    }

    private setupLevel() {
        for (let i = 0; i < 10; ++i) {
            let x = Math.random() * 200;
            let y = Math.random() * 200;
            this.obstacles.push(new Obstacle({ x: x, y: y }, 16));
        }
    }

    public start() {
        this.setupLevel();
        this.runGameLoop = true;
        this.update();
    }

    private draw() {
        this.gfx.setScroll(this.scrollAmount)
        this.gfx.clear();
        this.player.draw(this.gfx);
        for (let obstacle of this.obstacles) {
            obstacle.draw(this.gfx);
        }
    }

    public update() {
        if (!this.runGameLoop) {
            return;
        }
        this.scrollAmount += .1;
        this.draw();

        this.player.update();

        window.requestAnimationFrame(() => this.update());
    }
}