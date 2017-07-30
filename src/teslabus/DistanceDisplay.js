export default class DistanceDisplay {
  constructor() {
    this.distance = 0;
  }

  update(distance) {
    this.distance = distance;
  }

  draw(context) {
    context.font = '22px sans-serif';
    context.textAlign = 'left';
    context.fillStyle = 'black';
    context.fillText(`Distance: ${Math.floor(this.distance)}`, 10, 24);
    context.fillStyle = 'yellow';
    context.fillText(`Distance: ${Math.floor(this.distance)}`, 12, 26);
  }
}
