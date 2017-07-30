import Road from './Road';
import Battery from './Battery';
import Obstacle from './Obstacle';
import Bus from './Bus';
import EnergyMeter from './EnergyMeter';
import FpsCounter from './FpsCounter';

export default class Game {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 480;
    document.body.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');

    this.leftDown = false;
    this.rightDown = false;

    addEventListener('keydown', event => {
      switch (event.which) {
      case 37:
        this.leftDown = true;
        break;
      case 39:
        this.rightDown = true;
        break;
      }
    });

    addEventListener('keyup', event => {
      switch (event.which) {
      case 37:
        this.leftDown = false;
        break;
      case 39:
        this.rightDown = false;
        break;
      }
    });

    this.active = true;
    this.lastTimestamp = 0;

    this.roads = [
      new Road(-160, 'gray'),
      new Road(0, 'darkgray'),
      new Road(160, 'gray'),
      new Road(320, 'darkgray')
    ];

    this.batteries = [
      new Battery(),
      new Battery(),
      new Battery(),
      new Battery()
    ];

    this.obstacles = [
      new Obstacle(),
      new Obstacle(),
      new Obstacle(),
      new Obstacle(),
      new Obstacle(),
      new Obstacle()
    ];

    this.bus = new Bus();
    this.energyMeter = new EnergyMeter();
    this.fpsCounter = new FpsCounter();
  }

  update(timestamp) {
    let elapsed = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    this.context.fillStyle = 'black';
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.active) {
      return;
    }

    for (let battery of this.batteries) {
      battery.update(elapsed, this.bus.speed);
    }

    for (let obstacle of this.obstacles) {
      obstacle.update(elapsed, this.bus.speed);
    }

    if (!this.bus.update(
      elapsed, this.leftDown, this.rightDown, this.batteries, this.obstacles
    )) {
      this.active = false;
    }

    for (let road of this.roads) {
      road.update(elapsed, this.bus.speed);
    }

    this.energyMeter.update(this.bus.energy);
    this.fpsCounter.update(elapsed);
  }

  draw() {
    for (let road of this.roads) {
      road.draw(this.context);
    }

    for (let battery of this.batteries) {
      battery.draw(this.context);
    }

    for (let obstacle of this.obstacles) {
      obstacle.draw(this.context);
    }

    this.bus.draw(this.context);
    this.energyMeter.draw(this.context);
    this.fpsCounter.draw(this.context);
  }
}
