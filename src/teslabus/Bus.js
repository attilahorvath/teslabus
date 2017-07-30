import intersect from './intersect';

export default class Bus {
  constructor() {
    this.x = 100;
    this.y = 260;
    this.energy = 100;
    this.speed = 0.5;
    this.freezeTimer = 0;
  }

  update(elapsed, leftDown, rightDown, batteries, obstacles) {
    this.freezeTimer -= elapsed;

    if (this.freezeTimer <= 0) {
      this.freezeTimer = 0;

      if (leftDown) {
        this.x -= elapsed * 0.5;
      }

      if (rightDown) {
        this.x += elapsed * 0.5;
      }
    }

    this.speed += elapsed * 0.00001;

    if (this.speed > 2) {
      this.speed = 2;
    }

    for (let battery of batteries) {
      if (intersect(this.x, this.y, 50, 130, battery.x, battery.y, 40, 30)) {
        this.energy += 10;

        battery.respawn();
      }
    }

    for (let obstacle of obstacles) {
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

        obstacle.respawn();
      }
    }

    if (this.speed < 0.5) {
      this.speed = 0.5;
    }

    if (this.energy > 100) {
      this.energy = 100;
    }

    this.energy -= elapsed * this.speed * 0.01;

    if (this.energy <= 0) {
      this.energy = 0;
      return false;
    }

    return true;
  }

  draw(context) {
    context.fillStyle = 'blue';
    if (this.freezeTimer > 0) {
      context.fillStyle = 'lightblue';
    }
    context.fillRect(this.x, this.y, 50, 130);
  }
}
