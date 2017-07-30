export default class EnergyMeter {
  constructor() {
    this.energy = 100;
  }

  update(energy) {
    this.energy = energy;
  }

  draw(context) {
    context.fillStyle = 'white';
    context.fillRect(50, 420, 540, 30);
    context.fillStyle = 'black';
    context.fillRect(55, 425, 530, 20);
    context.fillStyle = `hsl(${this.energy}, 100%, 50%)`;
    context.fillRect(55, 425, (this.energy / 100) * 530, 20);
  }
}
