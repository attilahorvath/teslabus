export default function preloadImages(images) {
  for (let image of images) {
    (new Image).src = image;
  }
};
