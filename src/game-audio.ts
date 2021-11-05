export enum SoundType{
    Slither,
    Swallow,
}

type Without<T, K> = {
    [L in Exclude<keyof T, K>]: T[L]
};


export class GameAudio{
    public Slither: HTMLAudioElement;
    public Swallow: HTMLAudioElement;

    constructor(document: Document){
        this.Slither = document.createElement("audio");
        this.Slither.src = "/assets/slither.wav";

        this.Swallow = document.createElement("audio");
        this.Swallow.src = "/assets/swallow.wav";
    }
}
