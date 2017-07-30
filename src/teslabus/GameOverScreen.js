export default class GameOverScreen {
  constructor() {
    this.ox = 0;
    this.oy = 0;
    this.h = 0;
    this.timestamp = 0;
    this.distance = 0;
  }

  update(elapsed, distance) {
    this.timestamp += elapsed / 200;
    this.ox = Math.cos(this.timestamp);
    this.oy = Math.sin(this.timestamp);
    this.distance = distance;
    this.h += elapsed * 0.1;
  }

  draw(context) {
    context.textAlign = 'center';
    context.font = '52px sans-serif';
    context.fillStyle = 'black';
    context.fillText('Game Over', 320 + this.ox * 4, 150 + this.oy * 4);
    context.fillStyle = `hsl(${this.h}, 100%, 50%)`;
    context.fillText('Game Over', 320, 150);

    context.font = '32px sans-serif';
    context.fillStyle = 'black';
    context.fillText(
      `You drove for ${Math.floor(this.distance)} meters!`, 322, 202
    );
    context.fillStyle = 'yellow';
    context.fillText(
      `You drove for ${Math.floor(this.distance)} meters!`, 320, 200
    );

    context.fillStyle = 'black';
    context.fillText('Press [Space] to try again.', 320, 370);
    context.fillStyle = 'white';
    context.fillText('Press [Space] to try again.', 322, 372);
  }
}
