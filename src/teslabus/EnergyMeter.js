export default class EnergyMeter {
  constructor() {
    this.energy = 100;
    this.flashTimer = 0;
  }

  update(elapsed, energy) {
    if (this.flashTimer > 0) {
      this.flashTimer -= elapsed;
    }

    if (Math.abs(this.energy - energy) >= 5) {
      this.flashTimer = 100;
    }

    this.energy = energy;
  }

  draw(context) {
    context.fillStyle = 'white';
    context.fillRect(50, 420, 540, 30);
    context.fillStyle = 'black';
    context.fillRect(55, 425, 530, 20);
    context.fillStyle =
      this.flashTimer > 0 ? 'white' : `hsl(${this.energy}, 100%, 50%)`;
    context.fillRect(55, 425, (this.energy / 100) * 530, 20);
  }
}
