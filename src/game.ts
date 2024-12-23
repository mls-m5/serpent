
import { Gfx } from "./gfx";
import { Serpent } from "./serpent";
import { Controller } from "./controller";
import { KeyboardKey } from "./keyboard-key";
import { GameAudio } from "./game-audio";
import { Obstacle } from "./obstacle";
import { Particles } from "./particles";
import { Rock } from "./rock";
import { Fruit } from "./fruit";
import { EnergyDrink } from "./energy-drink";
import { TitleScreen } from "./titlescreen";
import { settings } from "./settings";
import { Score } from "./score";
import { Vec2 } from "./vec2";
import { EndScreen } from "./endscreen";


export class Game {
    private player: Serpent;
    private obstacles: Array<Obstacle> = [];
    private controller: Controller;
    private particles = new Particles();
    private titleScreen = new TitleScreen;
    private endScreen = new EndScreen;
    private score = new Score;

    private scrollAmount = 0;
    private runGameLoop = false;
    private hasGameStarted = false;
    private rockColodown = settings.rockCooldown;
    private rollingRockColodown = settings.rollingRockCooldown;
    private appleCooldown = settings.appleCooldown;
    private energyDrinkCooldown = settings.energyDrinkCooldown;
    private shouldShowFps = false;

    private width = settings.width / settings.screenPreScale;
    private height = settings.height / settings.screenPreScale;

    constructor(
        private gfx: Gfx,
        private audio: GameAudio
    ) {
        this.controller = new Controller(document);

        setTimeout(
            () => this.controller.onKeyPressed(KeyboardKey.SPACE, () => {
                if (this.player.isDead) {
                    location.reload();
                }
                this.runGameLoop ? this.pause() : this.start();
            }),
            100
        );
        this.controller.onKeyPressed(KeyboardKey.KEY_R, () => location.reload()),
            this.player = new Serpent({ x: 50, y: 100 }, this.controller, this.audio);
        this.controller.onKeyPressed(KeyboardKey.KEY_F, () => this.shouldShowFps = !this.shouldShowFps);
        this.titleScreen.draw(gfx);
    }

    public pause() {
        this.runGameLoop = false;
    }

    private spawnRock(y = -8, isRolling = false) {
        let x = Math.random() * this.width;
        this.obstacles.push(new Rock({ x: x, y: y - this.scrollAmount }, 16, isRolling));

        console.log("spawning rock: rolling = ", isRolling);
    }

    private spawnFruit() {
        // Todo: Add width
        const x = Math.random() * this.width;
        this.obstacles.push(new Fruit({ x, y: -8 - this.scrollAmount }, 16));
    }

    private spawnEnergyDrink() {
        const x = Math.random() * this.width;
        this.obstacles.push(new EnergyDrink({ x, y: -8 - this.scrollAmount }, 16));
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
        if (this.shouldShowFps) {
            this.gfx.drawText(0, 5, this.avgFrameRate().toString(), 5);
        }
        this.player.draw(this.gfx);
        for (let obstacle of this.obstacles) {
            obstacle.draw(this.gfx);
        }

        this.particles.draw(this.gfx);

        if (this.player.isDead) {
            this.endScreen.draw(this.gfx);
        }

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
                        this.score.addScore(settings.energyDrinkScore);
                        console.log('energy');
                        break;
                    case Fruit:
                        console.log(obstacle)
                        this.player.eatApple();
                        console.log('buff');
                        this.score.addScore(settings.appleScore);
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

        this.rollingRockColodown -= 1;
        if (this.rollingRockColodown < 0) {
            this.spawnRock(-8, true);
            this.rollingRockColodown = settings.rollingRockCooldown;
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

    private isOutside(v: Vec2, margin = 0) {
        return v.x < -margin ||
            v.y + this.scrollAmount < -margin ||
            v.x - margin > settings.width / settings.screenPreScale ||
            v.y - margin + this.scrollAmount > settings.height / settings.screenPreScale;
    }

    private updateObstacles() {
        for (let obstacle of this.obstacles) {
            if (this.isOutside(obstacle.getPos(), 20)) {
                obstacle.isDead = true;
            }

            obstacle.update();
        }
    }

    public update() {
        if (!this.runGameLoop) {
            return;
        }
        const deltaTime = new Date().getTime() - this.frameStart
        this.frameRates.push(1000 / deltaTime);
        this.frameRates.shift();
        this.frameStart = new Date().getTime();
        if (!this.player.isDead) {
            this.scrollAmount += .1;
        }
        else {
            this.scrollAmount += .02;
        }
        this.gfx.update();
        this.draw();

        this.spawnFromTop();

        this.player.update();

        if (!this.player.isDead) {
            if (this.isOutside(this.player.getPos(), this.player.size / 2)) {
                this.player.hurt();
            }
        }

        this.updateObstacles();

        this.collidePlayerWithStuff();
        this.particles.update();

        if (!this.player.isDead) {
            this.score.addScore(this.player.speed * this.player.speed * settings.frameScoreMultier);
        }

        window.requestAnimationFrame(() => this.update());

    }
}