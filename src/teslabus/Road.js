export default class Road {
  constructor(y, color) {
    this.y = y;
    this.color = color;
  }

  update(elapsed, speed) {
    this.y += elapsed * speed;

    if (this.y > 480) {
      this.y -= 640;
    }
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(0, this.y, 640, 160);
  }
}
