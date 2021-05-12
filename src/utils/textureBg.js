/* import * as P5 from "p5";

const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 600;

const BASE_H = 15;
const BASE_S = 10;
const BASE_B = 100; */

export default function texturize(
  p,
  rnd,
  density,
  BASE_H,
  BASE_S,
  BASE_B,
  CANVAS_WIDTH,
  CANVAS_HEIGHT
) {
  for (let i = 0; i < density; i++) {
    p.stroke(
      BASE_H,
      BASE_S - rnd.random_between(0, 1) * 2,
      BASE_B - rnd.random_between(0, 1) * 4,
      rnd.random_between(0, 1) * 10 + 75
    );

    let x1 = rnd.random_between(0, 1) * CANVAS_WIDTH;
    let y1 = rnd.random_between(0, 1) * CANVAS_HEIGHT;
    let theta = rnd.random_between(0, 1) * 2 * p.PI;
    let segmentLength = rnd.random_between(0, 1) * 5 + 2;
    let x2 = p.cos(theta) * segmentLength + x1;
    let y2 = p.sin(theta) * segmentLength + y1;

    p.line(x1, y1, x2, y2);
  }
}
