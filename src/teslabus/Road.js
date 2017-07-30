import getImage from './getImage';

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
    let image = getImage('images/road.png');

    if (image) {
      context.drawImage(image, 0, this.y);
    } else {
      context.fillStyle = this.color;
      context.fillRect(0, this.y, 640, 160);
    }
  }
}
