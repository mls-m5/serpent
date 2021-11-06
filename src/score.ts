import { Gfx } from "./gfx"

export class Score {
    private scoreAmount = 0;

    public addScore(amount: number) {
        this.scoreAmount += amount;
    }

    public draw(gfx: Gfx) {
        gfx.drawText(10, 10, "Score " + Math.trunc(this.scoreAmount), 5);
    }
}