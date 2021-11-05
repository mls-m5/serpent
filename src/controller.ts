import { KeyboardKey } from "./keyboard-key";

export class Controller {
    private keyInputs = new Set<KeyboardKey>();
    constructor(document: Document) {
        document.addEventListener('keydown', event => this.keyDownHandler(event), false);
        document.addEventListener('keyup', event => this.keyUpHandler(event), false);
    }
    public isKeyPressed(key: KeyboardKey): boolean {
        return this.keyInputs.has(key);
    }

    private keyDownHandler(event: { keyCode: KeyboardKey }) {
        this.keyInputs.add(event.keyCode);
    }
    private keyUpHandler(event: { keyCode: KeyboardKey }) {
        this.keyInputs.delete(event.keyCode)
    }
}