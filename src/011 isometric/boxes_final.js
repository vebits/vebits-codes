import React from "react";

import Sketch from "react-p5";
import Random, { random_hash } from "utils/random";
import { hex2hsl } from "utils/color-converter";

import paperColors from "paper-colors";
import shuffle from "utils/shuffle";

// TOKEN AND RANDOM
const tokenData = { hash: random_hash() };
let seed = parseInt(tokenData.hash.slice(0, 16), 16);
const rnd = new Random(14727438185957228);
console.log("seed:", seed);

// DIMENSIONS
let width, height;
if (window.innerHeight >= 1.5 * window.innerWidth) {
  width = window.innerWidth;
  height = 1.5 * window.innerWidth;
} else {
  height = window.innerHeight;
  width = window.innerHeight / 1.5;
}

let dim = Math.min(width, height);
let m = dim / 1e3;

/* height = 9000;
width = 6000; */
console.log(width, height);

const cell_w = 16 * m;
const cell_h = 8 * m;
console.log(cell_h, cell_w);

function Boxes() {
  const setup = (p, canvasParentRef) => {
    p.createCanvas(width, height).parent(canvasParentRef);
    p.noLoop();
    p.colorMode(p.HSL);

    p.background(hex2hsl("#f4f0e7")[0]); //"#ffcd57"

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas("cassettes_" + seed, "png");
    };
  };

  const draw = (p) => {
    shuffle(paperColors, rnd);
    let i = 0;
    for (let y = -32 * m; y < height + 32 * m; y += cell_h) {
      for (let x = -32 * m; x < width + 32 * m; x += cell_w) {
        i++;
        if (rnd.random_dec() > 0.3) {
          drawWall2(
            p,
            x,
            y,
            rnd.random_choice([1, 2, 4]),
            rnd.random_choice([1, 2, 4, 6, 8]),
            rnd.random_choice([1, 2, 4]),
            p.color(hex2hsl(paperColors[i % 12].hex)[0]),
            p.color(hex2hsl(paperColors[i % 12].hex)[0]),
            p.color(hex2hsl(paperColors[i % 12].hex)[0])
          );
        } else {
          drawWall(
            p,
            x,
            y,
            rnd.random_choice([1, 2, 4, 8]),
            rnd.random_choice([1, 2, 4, 6, 8]),
            rnd.random_choice([1, 2, 4]),
            p.color(hex2hsl(paperColors[i % 12].hex)[0]),
            p.color(hex2hsl(paperColors[i % 12].hex)[0]),
            p.color(hex2hsl(paperColors[i % 12].hex)[0])
          );
        }
      }
    }

    displayBorder(p, 32 * m, hex2hsl("#f4f0e7")[0]);
  };

  function drawWall2(p, x, y, h, w, d, shade1, shade2, shade3) {
    p.strokeJoin(p.ROUND);
    p.strokeWeight(2 * m);

    shade1.setAlpha(rnd.random_between(0.5, 1));
    shade2.setAlpha(rnd.random_between(0.5, 1));
    shade3.setAlpha(rnd.random_between(0.5, 1));

    // draw top
    p.fill(shade1);
    p.stroke(hex2hsl("#333533")[0]);
    p.stroke(shade1);
    p.quad(
      x,
      y - cell_h * h,
      x + (cell_w / 2) * w,
      y - cell_h * h - (cell_h / 2) * w,
      x + (cell_w / 2) * w + (cell_w / 2) * d,
      y - cell_h * h - (cell_h / 2) * w + (cell_h / 2) * d,
      x + (cell_w / 2) * d,
      y - cell_h * h + (cell_h / 2) * d
    );

    // draw left side
    p.fill(shade2);
    p.stroke(shade2);
    p.quad(
      x,
      y,
      x,
      y - cell_h * h,
      x + (cell_w / 2) * d,
      y - cell_h * h + (cell_h / 2) * d,
      x + (cell_w / 2) * d,
      y + (cell_h / 2) * d
    );

    // draw right side
    p.fill(shade3);
    p.stroke(shade3);
    p.quad(
      x + (cell_w / 2) * d,
      y + (cell_h / 2) * d,
      x + (cell_w / 2) * d,
      y - cell_h * h + (cell_h / 2) * d,
      x + (cell_w / 2) * w + (cell_w / 2) * d,
      y - cell_h * h - (cell_h / 2) * w + (cell_h / 2) * d,
      x + (cell_w / 2) * w + (cell_w / 2) * d,
      y - (cell_h / 2) * w + (cell_h / 2) * d
    );
  }

  function drawWall(p, x, y, h, w, d, shade1, shade2, shade3) {
    p.strokeJoin(p.ROUND);
    p.strokeWeight(2 * m);

    // draw top

    p.noStroke();
    p.strokeWeight(2 * m);
    const color = shade1;
    p.fill(color);
    p.stroke(color);

    const side = rnd.random_int(1, 3);
    if (rnd.random_between(0, 1) > 0.0) {
      p.quad(
        x,
        y - cell_h * h,
        x + (cell_w / 2) * w,
        y - cell_h * h - (cell_h / 2) * w,
        x + cell_w / 2 + (cell_w / 2) * w,
        y - cell_h * h - (cell_h / 2) * w + cell_h / 2,
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * h
      );

      p.quad(
        x,
        y - cell_h * h,
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * h,
        x + cell_w / 2,
        y + cell_h / 2,
        x,
        y
      );

      p.quad(
        x + cell_w / 2,
        y + cell_h / 2,
        x + (cell_w / 2) * w + cell_w / 2,
        y - (cell_h / 2) * w + cell_h / 2,
        x + (cell_w / 2) * w + cell_w / 2,
        y - cell_h * h - (cell_h / 2) * w + cell_h / 2,
        x + cell_w / 2,
        y - cell_h * h + cell_h / 2
      );
      /* p.stroke(100);
      if (side === 4) {
        for (let i = 1; i < h * 8; i++) {
          p.line(
            x,
            y - (cell_h * i) / 8,
            x + cell_w / 2,
            y - (cell_h * i) / 8 + cell_h / 2
          );
        }
      }
      if (side === 5) {
        for (let i = 1; i < h * 8; i++) {
          p.line(
            x + cell_w / 2,
            y - (cell_h * i) / 8 + cell_h / 2,
            x + cell_w - cell_w / 4,
            y - (cell_h * i) / 8 + cell_h / 2 - 8
          );
        }
      } */
    }
    p.stroke(hex2hsl("#333533")[0]);
    if (rnd.random_between(0, 1) > 0.3 && side !== 1)
      p.line(
        x,
        y - cell_h * h,
        x + (cell_w / 2) * w,
        y - cell_h * h - (cell_h / 2) * w
      );
    if (rnd.random_between(0, 1) > 0.3 && side !== 1)
      p.line(
        x + (cell_w / 2) * w,
        y - cell_h * h - (cell_h / 2) * w,
        x + cell_w / 2 + (cell_w / 2) * w,
        y - cell_h * h - (cell_h / 2) * w + cell_h / 2
      );
    if (rnd.random_between(0, 1) > 0.3 && side === 2)
      p.line(
        x + cell_w / 2 + (cell_w / 2) * w,
        y - cell_h * h - (cell_h / 2) * w + cell_h / 2,
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * h
      );
    if (rnd.random_between(0, 1) > 0.3 && side === 3) {
      p.line(x + cell_w / 2, y + cell_h / 2 - cell_h * h, x, y - cell_h * h);
    }

    if (rnd.random_between(0, 1) > 0.3 && side === 1)
      p.line(
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * h,
        x + cell_w / 2,
        y + cell_h / 2
      );
    if (rnd.random_between(0, 1) > 0.3 && side !== 2)
      p.line(x + cell_w / 2, y + cell_h / 2, x, y);
    if (rnd.random_between(0, 1) > 0.3 && side !== 2)
      p.line(x, y, x, y - cell_h * h);

    if (rnd.random_between(0, 1) > 0.3 && side !== 3)
      p.line(
        x + cell_w / 2,
        y + cell_h / 2,
        x + (cell_w / 2) * w + cell_w / 2,
        y - (cell_h / 2) * w + cell_h / 2
      );
    if (rnd.random_between(0, 1) > 0.3 && side !== 3)
      p.line(
        x + (cell_w / 2) * w + cell_w / 2,
        y - (cell_h / 2) * w + cell_h / 2,
        x + (cell_w / 2) * w + cell_w / 2,
        y - cell_h * h - (cell_h / 2) * w + cell_h / 2
      );

    /*if (rnd.random_between(0, 1) > 0.5)
      p.line(x + cell_w / 2, y + cell_h / 2 - cell_h * h, x, y);
        if (rnd.random_between(0, 1) > 0.5)
      p.line(
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * h,
        x + cell_w / 2,
        y + cell_h / 2
      );

    if (rnd.random_between(0, 1) > 0.5)
      p.line(
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * h,
        x + (cell_w / 2) * w + cell_w / 2,
        y - (cell_h / 2) * w + cell_h / 2
      );

    if (rnd.random_between(0, 1) > 0.5)
      p.line(
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * h,
        x + (cell_w / 2) * w,
        y - cell_h * h - (cell_h / 2) * w
      ); */
  }

  function displayBorder(p, e, color) {
    p.fill(hex2hsl("#333533")[0]); // f4f0e7 333533
    p.stroke(100);
    p.strokeWeight(2 * m);
    p.noStroke();
    p.strokeJoin(p.MITER);
    p.beginShape();
    p.vertex(-1 * m, -1 * m);
    p.vertex(width + 1 * m, -1 * m);
    p.vertex(width + 1 * m, height + 1 * m);
    p.vertex(-1 * m, height + 1 * m);
    p.beginContour();
    //p.stroke(hex2hsl("#333533")[0]);
    p.vertex(e, e);
    p.vertex(e, height - e);
    p.vertex(width - e, height - e);
    p.vertex(width - e, e);
    p.endContour();
    p.endShape(p.CLOSE);
  }

  return <Sketch setup={setup} draw={draw} />;
}

export default Boxes;
