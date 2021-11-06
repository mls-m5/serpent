import { Controller } from "./controller";
import { GameAudio } from "./game-audio";
import { Gfx } from "./gfx";
import { KeyboardKey } from "./keyboard-key";
import { Loc2, Vec2 } from "./vec2";
import { settings } from "./settings";

export class Serpent {
    private angle: number = Math.PI;
    private trailSegments: Array<Loc2> = [];

    public isDead = false;

    public size = settings.serpentSize;
    public length = settings.serpentLength;
    public speed = settings.slitherSpeed;
    public turnRate = settings.turnRate;

    constructor(
        private pos: Vec2,
        private controller: Controller,
        private audio: GameAudio,
    ) {
    }

    public update() {

        if (this.controller.isKeyPressed(KeyboardKey.LEFT_ARROW)) {
            this.angle -= this.turnRate;
        }
        if (this.controller.isKeyPressed(KeyboardKey.RIGHT_ARROW)) {
            this.angle += this.turnRate;
        }

        if (this.audio.Slither.paused) {
            this.audio.Slither.loop = true;
            this.audio.Slither.play();
        }

        this.pos.x += Math.sin(-this.angle) * this.speed;
        this.pos.y += Math.cos(-this.angle) * this.speed;

        // Todo: Maybe handle in some other way
        this.trailSegments.push({ ... this.pos, angle: this.angle });
        while (this.length >= this.trailSegments.length) {
            const { x, y, angle } = this.trailSegments[0];
            this.trailSegments.unshift({ x, y, angle });
        }

        while (this.trailSegments.length > 0 && this.length < this.trailSegments.length) {
            const { x, y, angle } = this.trailSegments[0];
            this.trailSegments.shift();
        }
        this.trailSegments.shift();


        this.checkSelfCollision();
    }

    private checkSelfCollision() {
        let segmentIndex = this.collideWithBody(this.pos, this.size);
        if (segmentIndex) {
            this.eatSelf(segmentIndex);
        }
    }

    private eatSelf(segmentIndex: number) {
        this.audio.Swallow.play();
        this.trailSegments = this.trailSegments.slice(segmentIndex);
        this.length = this.trailSegments.length - segmentIndex;
    }

    public hurt() {
        this.length = Math.max(this.length - settings.hitRockDamage, 0);
    }

    public eatApple() {
        this.length += settings.eatAppleHeal;
        this.size *= 1.05;
    }
    public drinkEnergyDrink() {
        const previousSpeed = this.speed;
        this.speed *= settings.energyDrinkSpeedBoost;
        console.log(`speed was ${previousSpeed} now it's ${this.speed}`);
        setTimeout(() => this.speed /= settings.energyDrinkSpeedBoost, settings.energyDrinkLifetime);
    }

    public draw(gfx: Gfx) {
        let separation = settings.segmentSeparationRender(this.speed);

        for (let i = this.trailSegments.length - 1; i > separation / 2; i -= separation) {
            let segment = this.trailSegments[i];
            gfx.drawBodySegment(segment, this.size);
        }
        if (this.trailSegments.length) {
            let segment = this.trailSegments[0];
            gfx.drawTailSegment({ x: segment.x, y: segment.y, angle: segment.angle + Math.PI }, 1);
        }

        gfx.drawHead(this.pos.x, this.pos.y, this.angle, this.size);


    }

    public getPos() {
        return this.pos;
    }

    public collideWithBody(v: Vec2, size: number): number | undefined {
        let separation = settings.segmentSeparationHitbox;
        for (let i = 0; i < this.trailSegments.length - separation * 2; i += separation) {
            let segment = this.trailSegments[i];
            let dx = segment.x - v.x;
            let dy = segment.y - v.y;
            let d = size / 2 + this.size / 2;
            if (dx * dx + dy * dy < d * d) {
                return i;
            }
        }
        return undefined;
    }

};