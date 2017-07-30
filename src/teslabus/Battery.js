import Particle from './Particle';
import getImage from './getImage';

export default class Battery {
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
    let image = getImage('images/battery.png');

    if (image) {
      context.drawImage(image, this.x, this.y);
    } else {
      context.fillStyle = 'green';
      context.fillRect(this.x, this.y, 40, 30);
    }
  }

  drawParticles(context) {
    for (let particle of this.particles) {
      particle.draw(context);
    }
  }

  respawn(emit = false) {
    if (emit) {
      for (let particle of this.particles) {
        particle.respawn(this.x + 20, this.y + 15, 'lime');
      }
    }

    this.x = 90 + Math.floor(Math.random() * 5) * 105;
    this.y = -100 - Math.random() * 5000;
  }
}
