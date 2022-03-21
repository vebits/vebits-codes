import React from "react";
import { useParams } from "react-router-dom";

import Sketch from "react-p5";
import Random, { random_hash } from "utils/random";
import { hex2hsl } from "utils/color-converter";

import Palettes from "nice-color-palettes/1000";

function Flow3() {
  let { id } = useParams();

  let seed, hash, tokenData;
  if (id) {
    hash = id;
  } else {
    tokenData = { hash: random_hash() };
    hash = tokenData.hash;
  }
  seed = parseInt(hash.slice(0, 16), 16);
  //const rnd = new Random(57629394378061160);
  const rnd = new Random(seed);
  console.log(seed);

  // DIMENSIONS
  var DEFAULT_SIZE = 1024;
  var width = window.innerWidth * 0.75;
  var height = window.innerHeight * 0.75;
  width = 1024;
  height = 1024;
  var dim = Math.min(width, height);
  var m = dim / DEFAULT_SIZE;

  // PALETTE
  let palette = Palettes[rnd.random_int(0, Palettes.length - 1)];

  // PDS
  var r = 20 * m;
  var w = r / Math.sqrt(2);

  const angleGrid = [];

  var cols, rows;

  let margin = rnd.random_choice([0, 64, 128, 256]);

  //const outlined = true;
  //const noFillAtAll = true;
  const alpha = true;
  //const symmetry = false;
  const outlined = rnd.random_int(0, 1);
  const noFillAtAll = rnd.random_between(0, 1) > 0.9;
  //const alpha = rnd.random_int(0, 1);
  const symmetry = rnd.random_between(0, 1) > 0.9;
  const tri = rnd.random_int(0, 1);
  console.log(margin, outlined, noFillAtAll, alpha, symmetry);

  var c1, c2;

  const setup = (p, canvasParentRef) => {
    c1 = p.color(255, 204, 0);
    c2 = p.color(255);

    p.pixelDensity(1);
    p.createCanvas(width, height, p.SVG).parent(canvasParentRef);
    p.noLoop();
    p.colorMode(p.HSL);

    let bgColor;
    if (tri) {
      palette.pop();
      palette.pop();
    }
    bgColor = hex2hsl(palette[rnd.random_int(0, palette.length - 1)]);
    p.background(p.color(bgColor[0]));
    //p.background(90);

    p.noiseSeed(seed);

    initPDS(p);

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas("colorflow_" + hash, "png");
    };
  };

  const draw = (p) => {
    p.noFill();
    //pds(p);

    /* for (var f = 0; f < ordered.length; f++) {
      let x = ordered[f].x;
      let y = ordered[f].y;
      p.strokeWeight(3);
      p.point(x, y);
    } */

    /* for (let x = 0; x < angleGrid.length; x++) {
      for (let y = 0; y < angleGrid[x].length; y++) {
        console.log(angleGrid[x][y]);
        p.stroke(0);
        p.push();
        p.translate(x * w, y * w);
        p.rotate(angleGrid[x][y]);
        p.line(0, 0, 10, 0);
        p.pop();
      }
    } */

    const polys = drawFlowField(p);
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
      if (polys[i].length < 64) {
        continue;
      }

      const color = p.color(
        hex2hsl(palette[rnd.random_int(0, palette.length - 1)])[0]
      );
      const color2 = p.color(
        hex2hsl(palette[rnd.random_int(0, palette.length - 1)])[0]
      );

      /* if (alpha) {
        color.setAlpha(rnd.random_between(0.1, 0.3));
      } */

      /* if (rnd.random_between(0, 1) > 0.0 && !noFillAtAll) {
        p.fill(color);
      } else {
        p.noFill();
      } */

      p.beginShape();
      let last_x = 0;
      let last_y = 0;
      if (polys[i].length % 2 !== 0) {
        polys[i].pop();
      }
      for (let j = 0; j < polys[i].length; j++) {
        var inter = p.map(polys[i][j].x, 0, dim - margin, 0, 1);
        var c = p.lerpColor(color, color2, inter);
        p.stroke(c);
        p.line(polys[i][j].x, dim - margin, polys[i][j].x, polys[i][j].y);

        /* if (symmetry) {
          if (polys[i][polys[i].length - 1].x < dim - margin - 2) break loop1;
          if (j > polys[i].length / 2) {
            p.vertex(polys[i][j].x, polys[i][polys[i].length - j].y);
            last_x = polys[i][j].x;
            last_y = polys[i][polys[i].length - j].y;
          } else {
            p.vertex(polys[i][j].x, polys[i][j].y);
            last_x = polys[i][j].x;
            last_y = polys[i][j].y;
          }
        } else {
          p.vertex(polys[i][j].x, polys[i][j].y);
          last_x = polys[i][j].x;
          last_y = polys[i][j].y;
        } */
      }

      /* if (margin === 0) {
        if (last_x < dim - margin - 2) {
          p.vertex(last_x, dim);
        } else {
          p.vertex(dim, last_y);
          p.vertex(dim, dim);
        }
        p.vertex(0, dim);
      } else if (margin === 64) {
        if (last_x < dim - margin - 8) {
          p.vertex(last_x, dim - 64);
          p.vertex(64, dim - 64);
        } else {
          p.vertex(dim - 64, last_y);
          p.vertex(dim - 64, dim - 64);
        }
        p.vertex(64, dim - 64);
      } else {
        if (last_x < dim - margin - 8) {
          p.vertex(last_x, dim);
        } else {
          p.vertex(dim - margin, last_y);
          p.vertex(dim, dim);
        }
        p.vertex(0, dim);
      } */
      p.endShape(p.CLOSE);
    }
  };

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  function drawFlowField(p) {
    const polys = [];
    const density = rnd.random_int(1, 64);
    console.log(density, margin);
    for (var a = margin; a < height; a += 64) {
      let x = margin;
      let y = a;

      let currentpoly = [];

      while (x < width) {
        if (y < margin) {
          currentpoly = [];
          break;
        }

        if (
          x < margin ||
          x > width - (margin === 0 ? 0 : margin) ||
          y < margin ||
          y > height - (margin === 64 ? 64 : 0)
        ) {
          break;
        }
        /* for (let v = 0; v < xy.length; v++) {
          if (p.dist(x, y, xy[v].x, xy[v].y) < sizes[0] * m) {
            break loop1;
          }
        } */
        currentpoly.push(new Point(x, y));

        const column_index = p.int(x / w);
        const row_index = p.int(y / w);

        const grid_angle = angleGrid[column_index][row_index];

        const x_step = width * 0.0001 * p.cos(grid_angle);
        const y_step = height * 0.0001 * p.sin(grid_angle);

        x -= x_step;
        y -= y_step;
      }
      polys.push(currentpoly);
    }
    return polys;
  }

  function initPDS(p) {
    cols = p.floor(width / w);
    rows = p.floor(height / w);

    for (let x = 0; x < cols + 1; x++) {
      angleGrid.push([]);
      for (let y = 0; y < rows + 1; y++) {
        const scaled_x = y * 0.05;
        const scaled_y = x * 0.05;

        //p.noiseDetail(2, 0.45);
        const noise_val = p.noise(scaled_x, scaled_y);
        const angle = p.map(noise_val, 0.0, 1.0, (3 / 2) * p.PI, p.PI / 2);

        angleGrid[x].push(angle);
      }
    }
  }

  return <Sketch setup={setup} draw={draw} />;
}

export default Flow3;
