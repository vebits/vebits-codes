/* import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Sketch from "react-p5";
import Random, { random_hash } from "utils/random";
import Palettes from "nice-color-palettes/1000";

const Page = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

function HENCordillera() {
  let { id } = useParams();
  console.log(id);
  // TOKEN AND RANDOM
  let seed, hash, tokenData;
  if (id) {
    hash = id;
  } else {
    tokenData = { hash: random_hash() };
    hash = tokenData.hash;
  }
  seed = parseInt(hash.slice(0, 16), 16);
  console.log(seed);

  // DIMENSIONS
  var DEFAULT_SIZE = 1000;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var dim = Math.min(width, height);
  dim = 1000;
  var m = dim / DEFAULT_SIZE;

  // PALETTE
  let palette, layers, rnd;
  const setup = (p, canvasParentRef) => {
    rnd = initRndAndNoise(p, seed);
    palette = Palettes[rnd.random_int(0, Palettes.length - 1)];
    layers = rnd.random_int(8, 10);
    p.pixelDensity(1);
    p.createCanvas(dim, dim, p.SVG).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.noLoop();

    p.noiseSeed(seed);

    p.background(255);

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas("cordillera_" + tokenData.hash, "png");
    };
  };

  const draw = (p) => {
    p.noFill();
    for (let l = 0; l < layers; l++) {
      const layerPosition = l * (dim / layers);
      drawRidge(p, layerPosition);
    }
  };

  function drawRidge(p, y) {
    p.fill(255);
    p.stroke(255);
    p.strokeWeight(10 * m);
    const vertices = [];
    p.beginShape();

    for (let x = 0; x <= dim; x += 4) {
      const noisedY = p.noise(x * 0.002, y / m) * m;
      p.vertex(x * m, y - noisedY * 350);
      vertices.push([x * m, y - noisedY * 350]);
    }
    p.vertex(dim, dim);
    p.vertex(0 * m, dim);
    p.endShape(p.CLOSE);

    p.stroke(p.color(palette[rnd.random_int(0, palette.length - 1)]));
    p.strokeWeight(1 * m);
    const direction = rnd.random_choice(["left", "straight", "right"]);
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
    for (let j = start; j <= vertices.length - num; j += inc ? 2 : 1) {
      if (direction === "right") {
        p.line(vertices[j][0], dim, vertices[j + 1][0], vertices[j + 1][1]);
      } else if (direction === "left") {
        p.line(vertices[j][0], dim, vertices[j - 1][0], vertices[j - 1][1]);
      } else if (direction === "straight") {
        p.line(vertices[j][0], dim, vertices[j][0], vertices[j][1]);
      }
    }
  }

  return (
    <Page>
      <Sketch setup={setup} draw={draw} />
    </Page>
  );
}

export default HENCordillera;
 */
