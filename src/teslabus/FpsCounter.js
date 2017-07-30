export default class FpsCounter {
  constructor() {
    this.frames = 0;
    this.elapsed = 0;
    this.fps = 0;
  }

  update(elapsed) {
    this.elapsed += elapsed;
    this.frames++;

    if (this.elapsed >= 1000) {
      this.fps = this.frames;
      this.frames = 0;
      this.elapsed -= 1000;
    }
  }

  draw(context) {
    context.font = '14px sans-serif';
    context.textAlign = 'left';
    context.fillStyle = 'black';
    context.fillText(`FPS: ${this.fps}`, 570, 20);
    context.fillStyle = 'white';
    context.fillText(`FPS: ${this.fps}`, 571, 21);
  }
}
