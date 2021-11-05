import { Controller } from "./controller";
import { GameAudio } from "./game-audio";
import { Gfx } from "./gfx";
import { KeyboardKey } from "./keyboard-key";
import { Loc2, Vec2 } from "./vec2";
import { settings } from "./settings";

export class Serpent {
    private angle: number = Math.PI;
    private trailSegments: Array<Loc2> = [];

    public readonly size = settings.serpentSize;

    constructor(
        private pos: Vec2,
        private controller: Controller,
        private audio: GameAudio,
    ) {
    }

    public update() {
        let speed = settings.slitherSpeed;
        let turnRate = settings.turnRate;
        if (this.controller.isKeyPressed(KeyboardKey.LEFT_ARROW)) {
            this.angle -= turnRate;
        }
        if (this.controller.isKeyPressed(KeyboardKey.RIGHT_ARROW)) {
            this.angle += turnRate;
        }

        if (this.audio.Slither.paused) {
            this.audio.Slither.loop = true;
            this.audio.Slither.play();
        }

        this.pos.x += Math.sin(-this.angle) * speed;
        this.pos.y += Math.cos(-this.angle) * speed;

        // Todo: Maybe handle in some other way
        this.trailSegments.push({ ... this.pos, angle: this.angle });
        this.checkSelfCollision();


        // Pop the first element
        if (this.trailSegments.length > settings.serpentLength) {
            this.trailSegments.shift();
        }
    }

    private checkSelfCollision() {
        let segmentIndex = this.collideWithBody(this.pos, settings.serpentSize);
        if (segmentIndex) {
            this.eatSelf(segmentIndex);
        }
    }

    private eatSelf(segmentIndex: number) {
        this.audio.Swallow.play();
        this.trailSegments = this.trailSegments.slice(segmentIndex);
        settings.serpentLength = this.trailSegments.length - segmentIndex;
    }

    public draw(gfx: Gfx) {
        let separation = settings.segmentSeparation;

        for (let i = this.trailSegments.length - 1; i > separation / 2; i -= separation) {
            let segment = this.trailSegments[i];
            gfx.drawBodySegment(segment);
        }

        {
            if (this.trailSegments.length) {
                let segment = this.trailSegments[0];
                gfx.drawTailSegment({ x: segment.x, y: segment.y, angle: segment.angle + Math.PI });
            }
        }

        gfx.drawHead(this.pos.x, this.pos.y, this.angle);

    }

    public getPos() {
        return this.pos;
    }

    public collideWithBody(v: Vec2, size: number): number | undefined {
        let separation = settings.segmentSeparation;
        for (let i = 0; i < this.trailSegments.length - separation * 2; i += separation) {
            let segment = this.trailSegments[i];
            let dx = segment.x - v.x;
            let dy = segment.y - v.y;
            let d = size / 2 + settings.serpentSize / 2;
            if (dx * dx + dy * dy < d * d) {
                return i;
            }
        }
        return undefined;
    }

};