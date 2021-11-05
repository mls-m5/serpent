import { KeyboardKey } from "./keyboard-key";

type callback = () => any;

export class Controller {
    private keyInputs = new Set<KeyboardKey>();
    private callbacks = new Map<KeyboardKey, callback[]>();

    constructor(document: Document) {
        document.addEventListener('keydown', event => this.keyDownHandler(event), false);
        document.addEventListener('keyup', event => this.keyUpHandler(event), false);
    }
    public isKeyPressed(key: KeyboardKey): boolean {
        return this.keyInputs.has(key);
    }

    public onKeyPressed(key: KeyboardKey, callback: callback) {
        if (!this.callbacks.has(key)) {
            this.callbacks.set(key, []);
        }
        this.callbacks.get(key)?.push(callback);
    }

    private keyDownHandler(event: { keyCode: KeyboardKey }) {
        this.callbacks.get(event.keyCode)?.forEach(callback => callback());
        this.keyInputs.add(event.keyCode);
    }
    private keyUpHandler(event: { keyCode: KeyboardKey }) {
        this.keyInputs.delete(event.keyCode)
    }
}