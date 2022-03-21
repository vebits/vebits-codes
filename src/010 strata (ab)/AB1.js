import React from "react";
import { useParams } from "react-router-dom";
import Sketch from "react-p5";

import Palettes from "nice-color-palettes/1000";

import Random, { random_hash } from "utils/random";

function AB() {
  let { id } = useParams();

  let seed, hash, tokenData;
  if (id) {
    hash = id;
  } else {
    tokenData = { hash: random_hash() };
    hash = tokenData.hash;
  }
  seed = parseInt(hash.slice(0, 16), 16);
  console.log(seed);

  const rnd = new Random(seed);

  // DIMENSIONS
  var DEFAULT_SIZE = 1024;
  const windowMargin = id ? 1 : 0.75;
  var width = window.innerWidth * windowMargin;
  var height = window.innerHeight * windowMargin;
  var dim = Math.min(width, height);
  dim = 1024;
  if (dim < 1024) {
    dim = 1024;
    console.log("minimum size is 1024x1024");
    console.log(`width: ${dim}`, `height: ${dim}`);
  } else {
    console.log(`width: ${dim}`, `height: ${dim}`);
  }
  var m = dim / DEFAULT_SIZE;

  // PALETTE
  const palette = Palettes[rnd.random_int(0, Palettes.length - 1)];
  const palette2 = Palettes[rnd.random_int(0, Palettes.length - 1)];

  const setup = (p, canvasParentRef) => {
    p.pixelDensity(1);
    p.createCanvas(dim, dim, p.SVG).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.noLoop();

    p.noiseSeed(seed);

    p.background(90);

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas("AB_" + hash, "png");
    };
  };

  const rects = [];
  const all_x = [];
  const left_color = palette.shift();
  const right_color = palette2.shift();
  const draw = (p) => {
    if (rnd.random_int(0, 1)) {
      p.noStroke();
    }

    let noise = 250;
    let y = 0;
    let x = rnd.random_int(350, 650);
    const length = rnd.random_int(128, 256);

    while (y < dim) {
      let x_offset = p.noise(noise) * 256;
      rects.push([x, y, length, x_offset]);
      all_x.push(x + x_offset);
      y += 16;
      noise += 32;
    }
    const sum = all_x.reduce((a, b) => a + b, 0);
    const vertical = rnd.random_int(0, 1);
    const avg_x = sum / all_x.length || 0;

    if (vertical) {
      p.fill(p.color(left_color));
      p.rect(0, 0, avg_x, dim);
      p.fill(p.color(right_color));
      p.rect(avg_x, 0, dim - avg_x, dim);

      for (let i = 0; i < rects.length; i++) {
        drawVerticalRects(
          p,
          rects[i][0],
          rects[i][1],
          rects[i][2],
          rects[i][3],
          rects[i][4]
        );
      }
    } else {
      p.fill(p.color(left_color));
      p.rect(0, 0, dim, avg_x);
      p.fill(p.color(right_color));
      p.rect(0, avg_x, dim, dim - avg_x);

      for (let i = 0; i < rects.length; i++) {
        drawHorizontalRects(
          p,
          rects[i][0],
          rects[i][1],
          rects[i][2],
          rects[i][3],
          rects[i][4]
        );
      }
    }
  };

  function drawVerticalRects(p, x, y, length, x_offset) {
    if (rnd.random_int(0, 1)) {
      p.fill(p.color(right_color));
      p.rect(x - length + x_offset, y, length, 16);
    } else {
      p.fill(p.color(right_color));
      p.rect(x - length + x_offset, y, length, 16);
    }

    if (rnd.random_int(0, 1)) {
      p.fill(p.color(left_color));
      p.rect(x + x_offset - 1, y, length, 16);
    } else {
      p.fill(p.color(left_color));
      p.rect(x + x_offset - 1, y, length, 16);
    }
  }

  function drawHorizontalRects(p, x, y, length, x_offset) {
    if (rnd.random_int(0, 1)) {
      p.fill(p.color(palette[rnd.random_int(0, palette.length - 1)]));
      p.rect(y, x - length + x_offset, 16, length);
    } else {
      p.fill(p.color(palette2[rnd.random_int(0, palette2.length - 1)]));
      p.rect(y, x - length + x_offset, 16, length);
    }

    if (rnd.random_int(0, 1)) {
      p.fill(p.color(palette[rnd.random_int(0, palette.length - 1)]));
      p.rect(y, x + x_offset - 1, 16, length);
    } else {
      p.fill(p.color(palette2[rnd.random_int(0, palette2.length - 1)]));
      p.rect(y, x + x_offset - 1, 16, length);
    }
  }

  return <Sketch setup={setup} draw={draw} />;
}

export default AB;
