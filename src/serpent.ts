import { Controller } from "./controller";
import { Gfx } from "./gfx";
import { KeyboardKey } from "./keyboard-key";
import { Loc2, Vec2 } from "./vec2";
import { settings } from "./settings";

export class Serpent {
    private angle: number = Math.PI;
    private trailSegments: Array<Loc2> = [];

    constructor(private pos: Vec2, private controller: Controller) {
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

        this.pos.x += Math.sin(-this.angle) * speed;
        this.pos.y += Math.cos(-this.angle) * speed;

        // Todo: Maybe handle in some other way
        this.trailSegments.push({ ... this.pos, angle: this.angle });
    }

    public draw(gfx: Gfx) {

        for (let i = this.trailSegments.length - 1; i > 0; i -= 10) {
            let segment = this.trailSegments[i];
            gfx.drawBodySegment(segment);
        }

        gfx.drawHead(this.pos.x, this.pos.y, this.angle);

        // Pop the first element
        if (this.trailSegments.length > 200) {
            this.trailSegments.shift();
        }

    }
};