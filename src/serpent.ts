import { Controller } from "./controller";
import { Gfx } from "./gfx";
import { Vec2 } from "./vec2";

export class Serpent {
    private angle: number = 0;
    private pos: Vec2 = { x: 40, y: 50 };
    private trailSegments: Array<Vec2> = [];

    private speed = 10;

    constructor(private location: Vec2, private controller: Controller) {
    }

    public update() {
        //this.pos.x += Math.sin(this.angle) * this.speed;
        //this.pos.y += Math.cos(this.angle) * this.speed;
        this.pos.x += 1;

        // Todo: Maybe handle in some other way
        this.trailSegments.push({ ... this.pos });
    }

    public draw(gfx: Gfx) {
        gfx.drawHead(this.pos.x, this.pos.y, this.angle);

        for (let i = 0; i < this.trailSegments.length; i += 40) {
            let segment = this.trailSegments[i];
            gfx.drawHead(segment.x, segment.y, 0);
        }



        if (this.trailSegments.length > 200) {
            this.trailSegments.shift();
        }

    }
};