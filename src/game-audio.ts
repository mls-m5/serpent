
export class GameAudio {
    public Slither: HTMLAudioElement;
    public Swallow: HTMLAudioElement;
    public Play: HTMLAudioElement;
    public Energy: HTMLAudioElement;
    public Died: HTMLAudioElement;

    private loadSound(src: string): HTMLAudioElement {
        let element = document.createElement("audio");
        element.src = src;
        return element;
    }

    constructor(document: Document) {
        this.Slither = this.loadSound("/assets/slither.wav");
        this.Swallow = this.loadSound("/assets/swallow.wav");
        this.Play = this.loadSound("/assets/sfx/play.mp3");
        this.Energy = this.loadSound("/assets/sfx/energy.mp3");
        this.Died = this.loadSound("/assets/sfx/died.mp3");
    }
}
