import React from "react";
import { useParams } from "react-router-dom";
import Sketch from "react-p5";

import Palettes from "nice-color-palettes/1000";

import Random, { random_hash } from "utils/random";

function Cordillera() {
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

  const layers = rnd.random_int(64, 64);
  const setup = (p, canvasParentRef) => {
    p.pixelDensity(1);
    p.createCanvas(dim, dim, p.SVG).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.noLoop();

    p.noiseSeed(seed);

    p.background(Palettes[rnd.random_int(0, Palettes.length - 1)].shift());

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas("cordillera_" + hash, "png");
    };
  };

  const draw = (p) => {
    p.noFill();

    for (let l = 0; l < layers; l++) {
      const layerPosition = l * (dim / layers);
      drawRidge(p, l, layerPosition);
    }
  };

  function drawRidge(p, l, y) {
    if (rnd.random_between(0, 1) > 0.2) {
      p.fill(p.color(palette[rnd.random_int(0, palette.length - 1)]));
    } else {
      p.noFill();
    }
    p.stroke(0);
    p.strokeWeight(1 * m);

    p.beginShape();
    let x_stop;

    for (let y = 0; y < dim; y += 12)
      for (let x = 0; x <= 750; x += 4) {
        const noisedY = p.noise(x * 0.002, y * 0.002);
        p.vertex(x, y - noisedY);
      }
    p.vertex(x_stop, dim);
    p.vertex(0, dim);
    p.endShape(p.CLOSE);

    p.stroke(p.color(palette[rnd.random_int(0, palette.length - 1)]));
    p.strokeWeight(1 * m);
    let direction = rnd.random_choice(["left", "straight", "right"]);

    let start, num;
    if (direction === "straight") {
      start = 0;
      num = 1;
    } else if (direction === "left") {
      start = 1;
      num = 1;
    } else if (direction === "right") {
      start = 0;
      num = 2;
    }
    const inc = rnd.random_between(0, 1) > 0.7;
    /* for (let j = start; j <= vertices.length - num; j += inc ? 2 : 1) {
      if (direction === "right") {
        p.line(
          vertices[j][0] * 1.015,
          dim,
          vertices[j + 1][0] * 1.015,
          vertices[j + 1][1] * 1.015
        );
      } else if (direction === "left") {
        p.line(
          vertices[j][0] * 1.015,
          dim,
          vertices[j - 1][0] * 1.015,
          vertices[j - 1][1] * 1.015
        );
      } else if (direction === "straight") {
        p.line(
          vertices[j][0] * 1.015,
          dim,
          vertices[j][0] * 1.015,
          vertices[j][1] * 1.015
        );
      }
    } */
  }

  return <Sketch setup={setup} draw={draw} />;
}

export default Cordillera;
