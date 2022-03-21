import React from "react";
import { useParams } from "react-router-dom";
import Sketch from "react-p5";

import Palettes from "nice-color-palettes/1000";

import Random, { random_hash } from "utils/random";
import Point from "utils/point";

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
  const shapes = [];
  const draw = (p) => {
    for (let i = 0; i < 50; i++) {
      drawShape(p, rnd.random_int(0, dim), rnd.random_int(0, dim));
    }
  };

  function drawShape(p, x, y) {
    const shape = [[x, y]];
    p.fill(p.color(palette[rnd.random_int(0, palette.length - 1)]));
    p.noStroke();
    p.beginShape();
    p.curveVertex(x, y);
    for (let i = 0; i < rnd.random_int(2, 12); i++) {
      const x_2 = x + rnd.random_int(-256, 256);
      const y_2 = y + rnd.random_int(-256, 256);

      p.curveVertex(x_2, y_2);
      shape.push([x_2, y_2]);
    }
    console.log(rnd.random_int(-12, 12));
    if (rnd.random_between(0, 1) > 0.8) {
      for (let i = 0; i < 10; i++) {
        p.endShape(p.CLOSE);
        p.fill(p.color(palette[rnd.random_int(0, palette.length - 1)]));
        p.beginShape();
        for (let j = 0; j < shape.length; j++) {
          p.curveVertex(
            shape[j][0] - rnd.random_int(-12, 12),
            shape[j][1] - rnd.random_int(-12, 12)
          );
        }
        p.endShape(p.CLOSE);
      }
    }
  }

  return <Sketch setup={setup} draw={draw} />;
}

export default AB;
