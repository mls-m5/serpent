
import { Gfx } from "./gfx";
import { Game } from "./game";
import { GameAudio } from './game-audio';

const test = document.getElementById('hello');
document.bgColor = '#424242';

if (test) test.innerText = 'COool';

const gfx = new Gfx(document.body as HTMLBodyElement);


const game = new Game(gfx, new GameAudio(document));