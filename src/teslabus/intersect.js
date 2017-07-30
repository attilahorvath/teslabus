export default function intersect(ax, ay, aw, ah, bx, by, bw, bh) {
  return !((ax + aw < bx) ||
           (ay + ah < by) ||
           (ax > bx + bw) ||
           (ay > by + bh));
}
