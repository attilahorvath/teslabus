import Particle from './Particle';

export default class Obstacle {
  constructor() {
    this.particles = [];

    for (let i = 0; i < 25; i++) {
      this.particles.push(new Particle());
    }

    this.respawn();
  }

  update(elapsed, speed) {
    this.y += elapsed * speed;

    if (this.y > 480) {
      this.respawn();
    }
  }

  updateParticles(elapsed, speed) {
    for (let particle of this.particles) {
      particle.update(elapsed, speed);
    }
  }

  draw(context) {
    switch (this.type) {
    case 'slowdown':
      context.fillStyle = 'red';
      break;
    case 'speedup':
      context.fillStyle = 'white';
      break;
    case 'freeze':
      context.fillStyle = 'lightblue';
      break;
    case 'drain':
      context.fillStyle = 'yellow';
      break;
    case 'energy':
      context.fillStyle = 'blue';
      break;
    }
    context.fillRect(this.x, this.y, 30, 30);
  }

  drawParticles(context) {
    for (let particle of this.particles) {
      particle.draw(context);
    }
  }

  respawn(emit = false) {
    if (emit) {
      let color;

      switch (this.type) {
      case 'slowdown':
        color = 'red';
        break;
      case 'speedup':
        color = 'white';
        break;
      case 'freeze':
        color = 'lightblue';
        break;
      case 'drain':
        color = 'yellow';
        break;
      case 'energy':
        color = 'blue';
        break;
      }

      for (let particle of this.particles) {
        particle.respawn(this.x + 15, this.y + 15, color);
      }
    }

    this.x = 50 + Math.random() * 510;
    this.y = -100 - Math.random() * 5000;

    let type = Math.random();

    if (type > 0.8) {
      this.type = 'slowdown';
    } else if (type > 0.6) {
      this.type = 'speedup';
    } else if (type > 0.4) {
      this.type = 'freeze';
    } else if (type > 0.2) {
      this.type = 'drain';
    } else {
      this.type = 'energy';
    }
  }
}
