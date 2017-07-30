export default function preloadSounds(sounds) {
  for (let sound of sounds) {
    new Audio(sound);
  }
};
