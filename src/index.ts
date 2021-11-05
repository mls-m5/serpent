
import { Gfx } from "./gfx";
import { Game } from "./game";

const test = document.getElementById('hello');

if (test) test.innerText = 'COool';

const gfx = new Gfx(document.body as HTMLBodyElement);

const game = new Game(gfx);

game.start();

