

export class Gfx {
    private readonly canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private image = <HTMLImageElement>document.getElementById("testhead");
    private imgWidth = 128; // image.width;
    private imgHeight = 128; // image.height;

    constructor(public body: HTMLBodyElement) {
        this.canvas = document.createElement('canvas');
        this.body.appendChild(this.canvas);

        let res = this.canvas.getContext("2d");
        if (!res || !(res instanceof CanvasRenderingContext2D)) {
            throw new Error('Failed to get 2D context');
        }
        this.ctx = res;
    }

    public drawHead(x: number, y: number, angle: number) {
        this.ctx.save();

        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        this.ctx.translate(-this.imgWidth / 2, -this.imgHeight / 2)
        this.ctx.drawImage(this.image, 0, 0);
        this.ctx.restore();
    }
}

// drawHead(100, 100, 10);
