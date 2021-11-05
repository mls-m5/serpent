import { Gfx } from "./gfx";
import { Vec2 } from "./vec2"
import { Particle } from "./particle";

export class Particles {
    private particles: Array<Particle> = [];

    public update() {
        for (let particle of this.particles) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.duration -= 1;
        }

        this.particles = this.particles.filter((x) => x.duration > 0);
    }

    public draw(gfx: Gfx) {
        gfx.drawParticles(this.particles);
    }

    public addParicle(v: Vec2, vel: Vec2) {
        this.particles.push({ x: v.x, y: v.y, vx: vel.x, vy: vel.y, duration: 20 });
    }

    public explosion(v: Vec2) {
        for (let i = 0; i < 20; ++i) {
            this.particles.push({ x: v.x, y: v.y, vx: Math.random() - .5, vy: Math.random() - .5, duration: 20 });
        }
    }
}