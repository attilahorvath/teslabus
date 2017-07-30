import Road from './Road';
import Battery from './Battery';
import Obstacle from './Obstacle';
import Bus from './Bus';
import EnergyMeter from './EnergyMeter';
import DistanceDisplay from './DistanceDisplay';
import TitleScreen from './TitleScreen';
import GameOverScreen from './GameOverScreen';
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
      case 32:
        if (!this.started) {
          this.started = true;
          this.active = true;
        } else if (!this.active) {
          this.reset();
          this.active = true;
        }
      }
    });

    this.started = false;
    this.active = false;
    this.lastTimestamp = 0;
    this.distance = 0;
    this.shakeTimer = 0;

    this.roads = [
      new Road(-160, 'gray'),
      new Road(0, 'darkgray'),
      new Road(160, 'gray'),
      new Road(320, 'darkgray')
    ];

    this.batteries = [];
    this.obstacles = [];

    for (let i = 0; i < 4; i++) {
      this.batteries.push(new Battery());
    }

    for (let i = 0; i < 6; i++) {
      this.obstacles.push(new Obstacle());
    }

    this.bus = new Bus();
    this.energyMeter = new EnergyMeter();
    this.distanceDisplay = new DistanceDisplay();
    this.titleScreen = new TitleScreen();
    this.gameOverScreen = new GameOverScreen();
    this.fpsCounter = new FpsCounter();
  }

  update(timestamp) {
    let elapsed = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    this.context.fillStyle = 'black';
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.titleScreen.update(elapsed);
    this.gameOverScreen.update(elapsed, this.distance);
    this.fpsCounter.update(elapsed);

    if (this.shakeTimer > 0) {
      this.shakeTimer -= elapsed;
    }

    if (!this.active) {
      return;
    }

    for (let battery of this.batteries) {
      battery.update(elapsed, this.bus.speed);
    }

    for (let obstacle of this.obstacles) {
      obstacle.update(elapsed, this.bus.speed);
    }

    if (!this.bus.update(elapsed, this)) {
      this.active = false;
    }

    this.bus.updateParticles(elapsed);

    for (let battery of this.batteries) {
      battery.updateParticles(elapsed, this.bus.speed);
    }

    for (let obstacle of this.obstacles) {
      obstacle.updateParticles(elapsed, this.bus.speed);
    }

    this.distance += elapsed * this.bus.speed * 0.01;

    for (let road of this.roads) {
      road.update(elapsed, this.bus.speed);
    }

    this.energyMeter.update(elapsed, this.bus.energy);
    this.distanceDisplay.update(this.distance);
  }

  draw() {
    this.context.setTransform(1, 0, 0, 1, 0, 0);

    if (this.shakeTimer > 0) {
      this.context.translate(Math.random() * 8 - 4, Math.random() * 8 - 4);
    }

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

    for (let battery of this.batteries) {
      battery.drawParticles(this.context);
    }

    for (let obstacle of this.obstacles) {
      obstacle.drawParticles(this.context);
    }

    this.bus.drawParticles(this.context);

    this.energyMeter.draw(this.context);
    this.distanceDisplay.draw(this.context);

    if (!this.started) {
      this.titleScreen.draw(this.context);
    } else if (!this.active) {
      this.gameOverScreen.draw(this.context);
    }

    this.fpsCounter.draw(this.context);
  }

  reset() {
    this.distance = 0;
    this.bus.respawn();
  }

  shake() {
    this.shakeTimer = 400;
  }
}
