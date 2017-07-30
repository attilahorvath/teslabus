let sounds = new Map();

export default function playSound(path) {
  let sound = sounds.get(path);

  if (sound) {
    sound.play();
  } else {
    sound = new Audio(path);
    sound.play();
  }
}
