
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


export class Game {
    private player: Serpent;
    private obstacles: Array<Obstacle> = [];
    private controller: Controller;
    private particles: Particles;
    private titleScreen = new TitleScreen;

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

                switch (obstacle.constructor) {
                    case EnergyDrink:
                        this.player.drinkEnergyDrink();
                        continue;
                    case Fruit:
                        this.player.buff();
                        console.log('buff');
                        break;
                    case Rock:
                        this.player.hurt();
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

    public update() {
        if (!this.runGameLoop) {
            return;
        }
        this.scrollAmount += .1;
        this.draw();

        this.spawnFromTop();

        this.player.update();

        this.collidePlayerWithStuff();
        this.particles.update();

        window.requestAnimationFrame(() => this.update());
    }
}