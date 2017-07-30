import getImage from './getImage';

export default class BatteryIndicator {
  constructor() {
    this.x = 0;
  }

  update(batteries) {
    let chosen;

    for (let battery of batteries) {
      if (battery.y < 0) {
        if (!chosen || chosen.y < battery.y) {
          chosen = battery;
        }
      }
    }

    this.x = chosen.x;
  }

  draw(context) {
    let image = getImage('images/batteryIndicator.png');

    if (image) {
      context.drawImage(image, this.x, 0);
    } else {
      context.fillStyle = 'green';
      context.fillRect(this.x, 0, 40, 30);
    }
  }
}
