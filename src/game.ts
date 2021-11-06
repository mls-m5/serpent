
import { Gfx } from "./gfx";
import { Serpent } from "./serpent";
import { Controller } from './controller';
import { KeyboardKey } from './keyboard-key';
import { GameAudio } from "./game-audio";
import { Obstacle } from "./obstacle";
import { Particles } from "./particles";
import { Rock } from './rock';
import { Fruit } from './fruit';
import { EnergyDrink } from './energy-drink';
import { TitleScreen } from "./titlescreen";
import { settings } from "./settings";
import { Score } from "./score";


export class Game {
    private player: Serpent;
    private obstacles: Array<Obstacle> = [];
    private controller: Controller;
    private particles = new Particles();
    private titleScreen = new TitleScreen;
    private score = new Score;

    private scrollAmount = 0;
    private runGameLoop = false;
    private hasGameStarted = false;
    private rockColodown = settings.rockCooldown;
    private appleCooldown = settings.appleCooldown;
    private energyDrinkCooldown = settings.energyDrinkCooldown;

    private width = 1080 / 4;

    constructor(
        private gfx: Gfx,
        private audio: GameAudio
    ) {
        this.controller = new Controller(document);

        setTimeout(
            () => this.controller.onKeyPressed(KeyboardKey.SPACE, () => {
                if (this.player.isDead) {
                    //
                }
                this.runGameLoop ? this.pause() : this.start();
            }),
            100
        );
        this.controller.onKeyPressed(KeyboardKey.KEY_R, () => location.reload()),
        this.player = new Serpent({ x: 50, y: 100 }, this.controller, this.audio);
        this.titleScreen.draw(gfx);
    }

    public pause() {
        this.runGameLoop = false;
    }

    private spawnRock(y: number = 0) {
        let x = Math.random() * this.width;
        this.obstacles.push(new Rock({ x: x, y: y - this.scrollAmount }, 16));

        console.log("spawning rock");
    }

    private spawnFruit() {
        // Todo: Add width
        const x = Math.random() * this.width;
        this.obstacles.push(new Fruit({ x, y: -this.scrollAmount }, 16));
    }

    private spawnEnergyDrink() {
        const x = Math.random() * this.width;
        this.obstacles.push(new EnergyDrink({ x, y: -this.scrollAmount }, 16));
    }

    private setupLevel() {
        for (let i = 0; i < 3; ++i) {
            let y = Math.random() * 20;
            this.spawnRock(y);
        }
    }

    public start() {
        if (!this.hasGameStarted) {
            this.setupLevel();
        }
        this.runGameLoop = true;
        this.hasGameStarted = true;
        this.update();
    }

    public endGame() {

    }

    private draw() {
        this.gfx.setScroll(this.scrollAmount)
        this.gfx.clear();
        this.gfx.resetTransform();
        this.gfx.drawText(0, 5, this.avgFrameRate().toString(), 5);
        this.player.draw(this.gfx);
        for (let obstacle of this.obstacles) {
            obstacle.draw(this.gfx);
        }

        this.particles.draw(this.gfx);
        this.score.draw(this.gfx);
    }

    private collidePlayerWithStuff() {
        for (const obstacle of this.obstacles) {
            if (obstacle.isCollision(this.player.getPos(), this.player.size)) {
                obstacle.isDead = true;
                this.particles.explosion(obstacle.getPos());

                switch (obstacle.constructor) {
                    case EnergyDrink:
                        this.player.drinkEnergyDrink();
                        console.log('energy');
                        break;
                    case Fruit:
                        console.log(obstacle)
                        this.player.eatApple();
                        console.log('buff');
                        break;
                    case Rock:
                        this.player.hurt();
                        this.gfx.shake(10);
                        console.log('sad');
                        break;

                }
            }
        }
        this.obstacles = this.obstacles.filter((obstacle) => !obstacle.isDead);
    }

    private spawnFromTop() {
        this.rockColodown -= 1;
        if (this.rockColodown < 0) {
            this.spawnRock();
            this.rockColodown = settings.rockCooldown;
        }

        this.appleCooldown -= 1;
        if (this.appleCooldown < 0) {
            this.spawnFruit();
            this.appleCooldown = settings.appleCooldown;
        }

        this.energyDrinkCooldown -= 1;
        if (this.energyDrinkCooldown < 0) {
            this.spawnEnergyDrink();
            this.energyDrinkCooldown = settings.appleCooldown;
        }

    }
    private frameStart = new Date().getTime();
    private frameRates: number[] = [0, 2, 3, 4, 5, 6, 7, 8, 9];
    private avgFrameRate() {
        const sum = this.frameRates.reduce((a, b) => a + b, 0);
        const avg = (sum / this.frameRates.length) || 0;
        return Math.floor(avg);
    };

    public update() {
        if (!this.runGameLoop) {
            return;
        }
        const deltaTime = new Date().getTime() - this.frameStart
        this.frameRates.push(1000 / deltaTime);
        this.frameRates.shift();
        this.frameStart = new Date().getTime();
        this.scrollAmount += .1;
        this.gfx.update();
        this.draw();

        this.spawnFromTop();

        this.player.update();

        this.collidePlayerWithStuff();
        this.particles.update();

        if (!this.player.isDead) {
            this.score.addScore(this.player.speed * this.player.speed);
        }

        window.requestAnimationFrame(() => this.update());
    }
}