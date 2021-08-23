import React from "react";
import { useParams } from "react-router-dom";

import Sketch from "react-p5";
import Random, { random_hash } from "utils/random";
import { hex2hsl } from "utils/color-converter";

import Palettes from "nice-color-palettes/1000";

function AB() {
  let { id } = useParams();

  let seed, hash, tokenData;
  tokenData = { hash: random_hash() };
  if (id) {
    hash = id;
  } else {
    hash = tokenData.hash;
  }
  seed = parseInt(hash.slice(0, 16), 16);
  const rnd = new Random(seed);
  console.log(tokenData.hash);

  // DIMENSIONS
  var DEFAULT_SIZE = 1024;
  const windowMargin = id ? 1 : 0.75;
  var width = window.innerWidth * windowMargin;
  var height = window.innerHeight * windowMargin;

  var dim = Math.min(width, height);
  var m = dim / DEFAULT_SIZE;

  // PALETTE
  let palette = Palettes[rnd.random_int(0, Palettes.length - 1)];
  console.log(palette);

  // PDS
  var r = 20 * m;
  var w = r / Math.sqrt(2);

  const angleGrid = [];

  var cols, rows;

  const setup = (p, canvasParentRef) => {
    p.pixelDensity(1);
    p.createCanvas(dim, dim, p.SVG).parent(canvasParentRef);
    p.noLoop();
    p.colorMode(p.HSL);
    p.noiseSeed(seed);

    let margin = rnd.random_choice([0, 64, 128, 256]);
    margin = margin * m;
    let density = rnd.random_int(1, 64);
    let outlined = rnd.random_between(0, 1) > 0.95;
    let noFillAtAll = rnd.random_between(0, 1) > 0.95;
    let alpha = rnd.random_between(0, 1) > 0.6;
    let symmetry = rnd.random_between(0, 1) > 0.95;
    let tri = rnd.random_between(0, 1) > 0.8;
    let wobbly = rnd.random_between(0, 1) > 0.7;
    let straight = rnd.random_between(0, 1) > 0.7;
    console.log("margin: ", margin);
    console.log("density: ", density);
    console.log("outlined: ", outlined);
    console.log("noFillAtAll: ", noFillAtAll);
    console.log("alpha: ", alpha);
    console.log("symmetry: ", symmetry);
    console.log("tri: ", tri);
    console.log("wobbly: ", wobbly);
    console.log("straight: ", straight);

    let bgColor;
    if (tri) {
      palette.pop();
      palette.pop();
    }
    bgColor = hex2hsl(palette[rnd.random_int(0, palette.length - 1)]);
    p.background(p.color(bgColor[0]));
    //p.background(100);

    initAngleGrid(p, wobbly, straight);
    draw1(p, margin, density, outlined, noFillAtAll, alpha, symmetry);

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas("colorflow_" + hash, "png");
    };
  };

  const draw = (p) => {};

  const draw1 = (
    p,
    margin,
    density,
    outlined,
    noFillAtAll,
    alpha,
    symmetry
  ) => {
    p.noFill();

    const polys = drawFlowField(p, margin, density);
    console.log(polys);

    if (outlined || noFillAtAll) {
      p.stroke(0);
      p.strokeWeight(1.5 * m);
      p.strokeCap(p.ROUND);

      if (noFillAtAll) {
        p.noFill();
      }
    } else {
      p.noStroke();
    }

    loop1: for (let i = 0; i < polys.length; i++) {
      if (polys[i].length < 64 * m) {
        continue;
      }

      const color = p.color(
        hex2hsl(palette[rnd.random_int(0, palette.length - 1)])[0]
      );

      if (alpha) {
        color.setAlpha(rnd.random_between(0.1, 0.3));
      }

      if (rnd.random_between(0, 1) > 0.2 && !noFillAtAll) {
        console.log(color);
        p.fill(color);
      } else {
        console.log(i);
        p.noFill();
      }

      p.beginShape();
      let last_x = 0;
      let last_y = 0;
      if (polys[i].length % 2 !== 0) {
        polys[i].pop();
      }

      for (let j = 0; j < polys[i].length; j++) {
        if (symmetry) {
          if (polys[i][polys[i].length - 1].x < dim - margin - 2 * m)
            break loop1;
          if (j > polys[i].length / 2) {
            if (j === 0) {
              p.vertex(
                Math.round(polys[i][j].x),
                polys[i][polys[i].length - j].y
              );
            } else {
              p.vertex(polys[i][j].x, polys[i][polys[i].length - j].y);
            }

            last_x = polys[i][j].x;
            last_y = polys[i][polys[i].length - j].y;
          } else {
            if (j === 0) {
              p.vertex(Math.round(polys[i][j].x), polys[i][j].y);
            } else {
              p.vertex(polys[i][j].x, polys[i][j].y);
            }
            last_x = polys[i][j].x;
            last_y = polys[i][j].y;
          }
        } else {
          if (j === 0) {
            p.vertex(Math.round(polys[i][j].x), polys[i][j].y);
          } else {
            p.vertex(polys[i][j].x, polys[i][j].y);
          }
          last_x = polys[i][j].x;
          last_y = polys[i][j].y;
        }
      }
      last_x = Math.round(last_x);
      let dimWithMargin = Math.round(dim - 64 * m);
      if (margin === 0) {
        if (last_x < dim - margin - 2 * m) {
          p.vertex(last_x, dim);
        } else {
          p.vertex(dim, last_y);
          p.vertex(dim, dim);
        }
        p.vertex(0, dim);
      } else if (margin === 64 * m) {
        if (last_x < dim - margin - 8 * m) {
          p.vertex(last_x, dimWithMargin);
          p.vertex(64 * m, dimWithMargin);
        } else {
          p.vertex(dimWithMargin, last_y);
          p.vertex(dimWithMargin, dimWithMargin);
        }
        p.vertex(Math.round(64 * m), dimWithMargin);
      } else {
        if (last_x < dim - margin - 8 * m) {
          p.vertex(last_x, dim);
        } else {
          p.vertex(dim - margin, last_y);
          p.vertex(dim, dim);
        }
        p.vertex(0, dim);
      }
      p.endShape(p.CLOSE);
    }
  };

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  function drawFlowField(p, margin, density) {
    const polys = [];

    for (var a = margin; a < dim; a += density * m) {
      let x = margin;
      let y = a;
      let currentpoly = [];

      while (x < dim) {
        if (y < margin) {
          currentpoly = [];
          break;
        }

        if (
          x < margin ||
          x > dim - (margin === 0 ? 0 : margin) ||
          y < margin ||
          y > dim - (margin === 64 * m ? 64 * m : 0)
        ) {
          break;
        }

        currentpoly.push(new Point(x, y));

        const column_index = p.int(x / w);
        const row_index = p.int(y / w);

        const grid_angle = angleGrid[column_index][row_index];

        const x_step = dim * 0.0001 * p.cos(grid_angle);
        const y_step = dim * 0.0001 * p.sin(grid_angle);

        x -= x_step;
        y -= y_step;
      }
      polys.push(currentpoly);
    }
    return polys;
  }

  function initAngleGrid(p, wobbly, straight) {
    cols = p.floor(dim / w);
    rows = p.floor(dim / w);
    const cord_scale = wobbly ? 0.1 : straight ? 0.005 : 0.05;

    for (let x = 0; x < cols + 1; x++) {
      angleGrid.push([]);
      for (let y = 0; y < rows + 1; y++) {
        const scaled_x = y * cord_scale;
        const scaled_y = x * cord_scale;

        p.noiseDetail(8, 0.2);
        const noise_val = p.noise(scaled_x, scaled_y);
        const angle = p.map(noise_val, 0.0, 1.0, (3 / 2) * p.PI, p.PI / 2);

        angleGrid[x].push(angle);
      }
    }
  }

  return <Sketch setup={setup} draw={draw} />;
}

export default AB;
