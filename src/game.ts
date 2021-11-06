
import { Gfx } from "./gfx";
import { Serpent } from "./serpent";
import { Controller } from './controller';
import { KeyboardKey } from './keyboard-key';
import { GameAudio } from "./game-audio";
import { Obstacle } from "./obstacle";
import { Particles } from "./particles";
import { Rock } from './rock';
import { Fruit } from './fruit';
import { TitleScreen } from "./titlescreen";


export class Game {
    private player: Serpent;
    private obstacles: Array<Obstacle> = [];
    private controller: Controller;
    private particles: Particles;
    private titleScreen = new TitleScreen;

    private scrollAmount = 0;
    private runGameLoop = false;
    private hasGameStarted = false;

    constructor(
        private gfx: Gfx,
        private audio: GameAudio
    ) {
        this.controller = new Controller(document);
        this.particles = new Particles();

        setTimeout(
            () => this.controller.onKeyPressed(KeyboardKey.SPACE, () => this.runGameLoop ? this.pause() : this.start()),
            100
        );
        this.player = new Serpent({ x: 50, y: 100 }, this.controller, this.audio);
        this.titleScreen.draw(gfx);
    }

    public pause() {
        this.runGameLoop = false;
    }

    private setupLevel() {
        for (let i = 0; i < 10; ++i) {
            let x = Math.random() * 200;
            let y = Math.random() * 200;
            this.obstacles.push(new Rock({ x: x, y: y }, 16));
        }
        this.obstacles.push(new Fruit({ x: 20, y: 0 }, 16));
    }

    public start() {
        if (!this.hasGameStarted) {
            this.setupLevel();
        }
        this.runGameLoop = true;
        this.hasGameStarted = true;
        this.update();
    }

    private draw() {
        this.gfx.setScroll(this.scrollAmount)
        this.gfx.clear();
        this.gfx.resetTransform();
        this.player.draw(this.gfx);
        for (let obstacle of this.obstacles) {
            obstacle.draw(this.gfx);
        }

        this.particles.draw(this.gfx);
    }

    private collidePlayerWithStuff() {
        for (let obstacle of this.obstacles) {
            if (obstacle.isCollision(this.player.getPos(), this.player.size)) {
                obstacle.isDead = true;
                this.particles.explosion(obstacle.getPos());
                if (obstacle.isFood) {
                    this.player.buff();
                    console.log('buff');
                } else {
                    this.player.hurt();
                    console.log('sad');
                }
            }
        }
        this.obstacles = this.obstacles.filter((obstacle) => !obstacle.isDead);
    }

    public update() {
        if (!this.runGameLoop) {
            return;
        }
        this.scrollAmount += .1;
        this.draw();

        this.player.update();

        this.collidePlayerWithStuff();
        this.particles.update();

        window.requestAnimationFrame(() => this.update());
    }
}