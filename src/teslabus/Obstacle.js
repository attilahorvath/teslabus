export default class Obstacle {
  constructor() {
    this.respawn();
  }

  update(elapsed, speed) {
    this.y += elapsed * speed;

    if (this.y > 480) {
      this.respawn();
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

  respawn() {
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
