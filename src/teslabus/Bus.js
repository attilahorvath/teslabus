import intersect from './intersect';
import Particle from './Particle';

export default class Bus {
  constructor() {
    this.particles = [];

    for (let i = 0; i < 25; i++) {
      this.particles.push(new Particle());
    }

    this.respawn();
  }

  update(elapsed, game) {
    this.freezeTimer -= elapsed;

    if (this.freezeTimer <= 0) {
      this.freezeTimer = 0;

      if (game.leftDown) {
        this.x -= elapsed * 0.5;
      }

      if (game.rightDown) {
        this.x += elapsed * 0.5;
      }
    }

    if (this.x < 50) {
      this.x = 50;
    }

    if (this.x > 540) {
      this.x = 540;
    }

    this.speed += elapsed * 0.00001;

    if (this.speed > 2) {
      this.speed = 2;
    }

    for (let battery of game.batteries) {
      if (intersect(this.x, this.y, 50, 130, battery.x, battery.y, 40, 30)) {
        this.energy += 10;

        game.shake();
        battery.respawn(true);
      }
    }

    for (let obstacle of game.obstacles) {
      if (intersect(this.x, this.y, 50, 130, obstacle.x, obstacle.y, 30, 30)) {
        switch (obstacle.type) {
        case 'slowdown':
          this.speed -= 0.25;
          break;
        case 'speedup':
          this.speed += 0.25;
          break;
        case 'freeze':
          this.freezeTimer = 2000;
          break;
        case 'drain':
          this.energy -= 10;
          break;
        case 'energy':
          this.energy += 10;
          break;
        }

        game.shake();
        obstacle.respawn(true);
      }
    }

    this.ox = Math.random() * 2 - 1;

    if (this.speed < 0.5) {
      this.speed = 0.5;
    }

    if (this.energy > 100) {
      this.energy = 100;
    }

    this.energy -= elapsed * this.speed * 0.01;

    if (this.freezeTimer > 0) {
      if (Math.random() > 0.5) {
        this.particles[this.lastParticle].respawn(
          this.x + Math.random() * 50, this.y + Math.random() * 130, 'lightblue'
        );
        this.lastParticle = (this.lastParticle + 1) % this.particles.length;
      }
    }

    if (this.energy <= 0) {
      this.energy = 0;
      return false;
    }

    return true;
  }

  updateParticles(elapsed) {
    for (let particle of this.particles) {
      particle.update(elapsed, this.speed);
    }
  }

  draw(context) {
    context.fillStyle = 'blue';
    if (this.freezeTimer > 0) {
      context.fillStyle = 'lightblue';
    }
    context.fillRect(this.x + this.ox, this.y, 50, 130);
  }

  drawParticles(context) {
    for (let particle of this.particles) {
      particle.draw(context);
    }
  }

  respawn() {
    this.x = 295;
    this.y = 260;
    this.energy = 100;
    this.speed = 0.5;
    this.freezeTimer = 0;
    this.lastParticle = 0;
    this.ox = 0;
  }
}
