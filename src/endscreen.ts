import { settings } from "./settings";
import { Gfx } from "./gfx";
import { Loc2, Vec2 } from "./vec2";

export class EndScreen {
    private blood: Array<Loc2> = []

    constructor() {
        for (let i = 0; i < 20; ++i) {
            this.blood.push({
                x: Math.trunc(Math.random() * settings.width / settings.screenPreScale),
                y: -Math.random() * 20,
                angle: Math.random() * .1 + .03,
            });
        }
    }

    public draw(gfx: Gfx) {
        gfx.overlay("rgba(100,0,0)", .4);

        for (let b of this.blood) {
            b.y += b.angle;
            gfx.drawStripe(b.x, b.y);
        }

        gfx.drawText(40, 40, "You are dead", 20);
        gfx.drawText(70, 60, "press space to retry", 10);
    }
}