import { Controller } from "./controller";
import { Gfx } from "./gfx";
import { Vec2 } from "./vec2";

export class Serpent {
    private angle: number = Math.PI;
    private trailSegments: Array<Vec2> = [];

    private speed: number = 1;

    constructor(private pos: Vec2, private controller: Controller) {
    }

    public update() {
        // this.pos.x += Math.sin(this.angle) * this.speed;
        // this.pos.y += Math.cos(this.angle) * this.speed;
        this.pos.x += 1;
        // this.pos.y -= 1;

        // Todo: Maybe handle in some other way
        this.trailSegments.push({ ... this.pos });
    }

    public draw(gfx: Gfx) {
        gfx.drawHead(this.pos.x, this.pos.y, this.angle);

        for (let i = this.trailSegments.length - 1; i > 0; i -= 10) {
            let segment = this.trailSegments[i];
            gfx.drawHead(segment.x, segment.y, 0);
        }

        // Pop the first element
        if (this.trailSegments.length > 200) {
            this.trailSegments.shift();
        }

    }
};