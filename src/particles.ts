import { Gfx } from "./gfx";
import { Vec2 } from "./vec2"
import { Particle } from "./particle";

export class Particles {
    private particles: Array<Particle> = [];

    public update() {
        for (let particle of this.particles) {
            particle.x += particle.vx;
            particle.y += particle.vy;
        }
    }

    public draw(gfx: Gfx) {
        gfx.drawParticles(this.particles);
    }

    public addParicle(v: Vec2, vel: Vec2) {
        this.particles.push({ x: v.x, y: v.y, vx: vel.x, vy: vel.y });
    }

    public explosion(v: Vec2) {
        for (let i = 0; i < 20; ++i) {
            this.particles.push({ x: v.x, y: v.y, vx: Math.random(), vy: Math.random() });
        }
    }
}