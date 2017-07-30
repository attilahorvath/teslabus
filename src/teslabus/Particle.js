export default class Particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.lifetime = 0;
    this.color = 'white';
  }

  update(elapsed, speed) {
    if (this.lifetime > 0) {
      this.x += elapsed * this.dx;
      this.y += elapsed * this.dy * speed;
      this.lifetime -= elapsed;
    }
  }

  draw(context) {
    if (this.lifetime > 0) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, 5, 5);
    }
  }

  respawn(x, y, color) {
    this.x = x - 2;
    this.y = y - 2;
    this.dx = (Math.random() > 0.5 ? -1 : 1) * (0.1 + Math.random() * 0.2);
    this.dy = (Math.random() > 0.5 ? -1 : 1) * (0.1 + Math.random() * 0.2);
    this.lifetime = 300;
    this.color = color;
  }
}
