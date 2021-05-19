import React from "react";
import { useParams } from "react-router-dom";

import Sketch from "react-p5";
import Random, { random_hash } from "utils/random";
import { hex2hsl } from "utils/color-converter";
import initPDS from "utils/pds";
import shuffle from "utils/shuffle";
import Point from "utils/point";

import Palettes from "nice-color-palettes/1000";

function Confetti() {
  let { id } = useParams();

  let seed, hash, tokenData;
  if (id) {
    hash = id;
  } else {
    tokenData = { hash: random_hash() };
    hash = tokenData.hash;
  }
  seed = parseInt(hash.slice(0, 16), 16);

  var DEFAULT_SIZE = 1024;
  const windowMargin = id ? 1 : 0.75;
  var width = window.innerWidth * windowMargin;
  var height = window.innerHeight * windowMargin;
  var dim = Math.min(width, height);
  var m = dim / DEFAULT_SIZE;

  // PDS
  var r = 50 * m;
  var k = 30;
  var w = r / Math.sqrt(2);

  const angleGrid = [];
  let ordered = [];
  var cols, rows;
  let paletteCopy;
  let rnd;

  const setup = (p, canvasParentRef) => {
    p.pixelDensity(1);
    p.createCanvas(width, height, p.SVG).parent(canvasParentRef);
    p.noLoop();
    p.colorMode(p.HSL);

    rnd = new Random(seed);
    p.noiseSeed(seed);

    let palette = Palettes[rnd.random_int(0, Palettes.length - 1)];
    paletteCopy = shuffle(palette.slice(), rnd);
    const bgColor = hex2hsl(paletteCopy.shift());
    p.background(p.color(bgColor[0]));
    /* if (rnd.random_int(0, 1) > -1) {
      paletteCopy.shift();
      paletteCopy.shift();
      console.log(paletteCopy);
    } */

    initAngleGrid(p);
    ordered = initPDS(p, r, k, w, width, height, rnd);

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas("confetti_" + hash, "png");
    };
  };

  const draw = (p) => {
    p.noFill();

    const flowFieldLines = getFlowField(p);
    drawFlowField(p, flowFieldLines);
  };

  function initAngleGrid(p) {
    cols = p.floor(width / w);
    rows = p.floor(height / w);
    for (let x = 0; x < cols + 1; x++) {
      angleGrid.push([]);
      for (let y = 0; y < rows + 1; y++) {
        const scaled_x = y * 0.008;
        const scaled_y = x * 0.008;

        //p.noiseDetail(2, 0.45);
        const noise_val = p.noise(scaled_x, scaled_y);
        const angle = p.map(noise_val, 0.0, 1.0, 0.0, 2 * p.PI);

        angleGrid[x].push(angle);
      }
    }
  }

  function drawFlowField(p, flowFieldLines) {
    for (let i = 0; i < flowFieldLines.length; i++) {
      if (flowFieldLines[i].length < 10) {
        continue;
      }
      p.stroke(p.color(paletteCopy[rnd.random_int(0, paletteCopy.length - 1)]));
      p.strokeCap(p.PROJECT);

      if (rnd.random_between(0, 1) > 0.4) {
        for (let j = 0; j < flowFieldLines[i].length; j += 4) {
          if (rnd.random_between(0, 1) > 0.0) {
            new IrregularShape(
              p,
              rnd.random_int(3, 10) * m,
              rnd.random_int(5, 8),
              flowFieldLines[i][j].x,
              flowFieldLines[i][j].y
            ).draw(
              p,
              p.color(paletteCopy[rnd.random_int(0, paletteCopy.length - 1)])
            );
          }
        }
      }
    }
  }

  function getFlowField(p) {
    const xy = [];
    shuffle(ordered, rnd);

    const polys = [];
    for (var f = 0; f < ordered.length; f++) {
      let x = ordered[f].x;
      let y = ordered[f].y;
      const currentpoly = [];
      loop1: for (let i = 0; i < 64; i++) {
        if (
          x < 64 * m ||
          x > width - 64 * m ||
          y < 64 * m ||
          y > height - 64 * m
        ) {
          break;
        }
        for (let v = 0; v < xy.length; v++) {
          if (p.dist(x, y, xy[v].x, xy[v].y) < 12 * m) {
            break loop1;
          }
        }

        currentpoly.push(new Point(x, y));

        const column_index = p.int(x / w);
        const row_index = p.int(y / w);

        const grid_angle = angleGrid[column_index][row_index];

        const x_step = width * 0.005 * p.cos(grid_angle);
        const y_step = height * 0.005 * p.sin(grid_angle);

        x += x_step;
        y += y_step;
      }
      currentpoly.forEach((v) => xy.push(v));
      polys.push(currentpoly);
    }
    return polys;
  }

  function IrregularShape(p, radius, numVertices, x, y) {
    this.radius = radius;
    this.numVertices = numVertices;
    this.vertices = [];
    this.vertices2 = [];
    this.theta = 360 / this.numVertices;

    for (var i = 0; i < this.numVertices; i++) {
      radius = rnd.random_between(this.radius / 2, this.radius * 2);
      this.vertices[i] = new Point(
        p.int(p.cos(p.radians(i * this.theta)) * radius),
        p.int(p.sin(p.radians(i * this.theta)) * radius)
      );
      this.vertices2[i] = new Point(
        p.int(p.cos(p.radians(i * this.theta)) * radius) + 2 * m,
        p.int(p.sin(p.radians(i * this.theta)) * radius) + 2 * m
      );
    }

    this.draw = function (p, color) {
      p.push();
      p.noStroke();
      p.translate(x, y);
      p.beginShape();
      for (var q = 0; q < this.numVertices; q++) {
        p.fill(0);
        p.curveVertex(this.vertices2[q].x, this.vertices2[q].y);
      }
      for (var w = 0; w < 3; w++) {
        p.curveVertex(this.vertices2[w].x, this.vertices2[w].y);
      }
      p.endShape();
      p.beginShape();
      for (var e = 0; e < this.numVertices; e++) {
        p.fill(color);
        //p.strokeWeight(1.5 * m);
        p.stroke(0, 0, 0, 0.5);
        p.curveVertex(this.vertices[e].x, this.vertices[e].y);
      }
      for (var r = 0; r < 3; r++) {
        p.curveVertex(this.vertices[r].x, this.vertices[r].y);
      }
      p.endShape();

      p.pop();
    };
  }

  return <Sketch setup={setup} draw={draw} />;
}

export default Confetti;
