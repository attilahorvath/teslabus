export default class TitleScreen {
  constructor() {
    this.ox = 0;
    this.oy = 0;
    this.h = 0;
    this.timestamp = 0;
  }

  update(elapsed) {
    this.timestamp += elapsed / 200;
    this.ox = Math.cos(this.timestamp);
    this.oy = Math.sin(this.timestamp);
    this.h += elapsed * 0.1;
  }

  draw(context) {
    context.textAlign = 'center';
    context.font = '52px sans-serif';
    context.fillStyle = 'black';
    context.fillText('Teslabus', 320 + this.ox * 4, 150 + this.oy * 4);
    context.fillStyle = `hsl(${this.h}, 100%, 50%)`;
    context.fillText('Teslabus', 320, 150);

    context.font = '32px sans-serif';
    context.fillStyle = 'black';
    context.fillText('Drive an electric bus as far as you can!', 322, 202);
    context.fillStyle = 'yellow';
    context.fillText('Drive an electric bus as far as you can!', 320, 200);

    context.font = '32px sans-serif';
    context.fillStyle = 'black';
    context.fillText('Made by Attila Horvath for Ludum Dare 39.', 322, 292);
    context.fillStyle = 'yellow';
    context.fillText('Made by Attila Horvath for Ludum Dare 39.', 320, 290);

    context.fillStyle = 'black';
    context.fillText('Press [Space] to start.', 320, 370);
    context.fillStyle = 'white';
    context.fillText('Press [Space] to start.', 322, 372);
  }
}
