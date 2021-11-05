
import { Gfx } from "./gfx";

const test = document.getElementById('hello');

if (test) test.innerText = 'COool';

let gfx = new Gfx(document.body as HTMLBodyElement);

gfx.drawHead(10, 10, 20);
