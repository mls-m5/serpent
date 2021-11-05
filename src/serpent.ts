import { Controller } from "./controller";
import { Gfx } from "./gfx";
import { KeyboardKey } from "./keyboard-key";
import { Loc2, Vec2 } from "./vec2";

export class Serpent {
    private angle: number = Math.PI;
    private trailSegments: Array<Loc2> = [];

    private readonly speed: number = 1;
    private readonly turnRate: number = .1;


    constructor(private pos: Vec2, private controller: Controller) {
    }

    public update() {
        if (this.controller.isKeyPressed(KeyboardKey.LEFT_ARROW)) {
            this.angle -= this.turnRate;
        }
        if (this.controller.isKeyPressed(KeyboardKey.RIGHT_ARROW)) {
            this.angle += this.turnRate;
        }

        this.pos.x += Math.sin(-this.angle) * this.speed;
        this.pos.y += Math.cos(-this.angle) * this.speed;

        // Todo: Maybe handle in some other way
        this.trailSegments.push({ ... this.pos, angle: this.angle });
    }

    public draw(gfx: Gfx) {

        for (let i = this.trailSegments.length - 1; i > 0; i -= 10) {
            let segment = this.trailSegments[i];
            gfx.drawHead(segment.x, segment.y, segment.angle);
        }

        gfx.drawHead(this.pos.x, this.pos.y, this.angle);

        // Pop the first element
        if (this.trailSegments.length > 200) {
            this.trailSegments.shift();
        }

    }
};