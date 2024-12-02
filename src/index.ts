
import { Gfx } from "./gfx";
import { Game } from "./game";
import { GameAudio } from "./game-audio";

document.bgColor = '#424242';
document.body.style.margin = '0';
document.body.style.padding = '0';


const gfx = new Gfx(document.body as HTMLBodyElement);
const game = new Game(gfx, new GameAudio(document));