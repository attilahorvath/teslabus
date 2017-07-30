export default class Battery {
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
    context.fillStyle = 'green';
    context.fillRect(this.x, this.y, 40, 30);
  }

  respawn() {
    this.x = 50 + Math.random() * 510;
    this.y = -100 - Math.random() * 5000;
  }
}
