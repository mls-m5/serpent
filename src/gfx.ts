export class Gfx {
    private readonly canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private headImg: HTMLImageElement
    private imgWidth = 128;
    private imgHeight = 128;

    constructor(public body: HTMLBodyElement) {
        this.canvas = document.createElement('canvas');
        this.canvas.style.height = '90vh';
        this.canvas.style.width = '90vw';

        this.body.appendChild(this.canvas);

        this.headImg = document.createElement("img");
        this.headImg.src = "assets/testhead.png";
        this.body.appendChild(this.headImg);


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
        this.ctx.drawImage(this.headImg, 0, 0);
        this.ctx.restore();
    }

    public clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}