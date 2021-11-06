import { Gfx } from "./gfx"

export class Score {
    private scoreAmount = 0;

    public addScore(amount: number) {
        this.scoreAmount += amount;
    }

    public draw(gfx: Gfx) {
        gfx.drawText(20, 100, "Score " + this.scoreAmount, 20);
    }
}