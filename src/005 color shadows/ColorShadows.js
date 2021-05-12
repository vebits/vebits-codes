import React from "react";
import { useParams } from "react-router-dom";

import Sketch from "react-p5";
import Random from "utils/random";
import { random_hash } from "utils/random";
import Point from "utils/point";
import texturize from "utils/textureBg";
import { hex2hsl } from "utils/color-converter";

import Palettes from "nice-color-palettes/1000";

function ColorShadows() {
  let { id } = useParams();

  let seed, hash, tokenData;
  if (id) {
    hash = id;
  } else {
    tokenData = { hash: random_hash() };
    hash = tokenData.hash;
  }
  seed = parseInt(hash.slice(0, 16), 16);

  const rnd = new Random(seed);
  let palette = Palettes[rnd.random_int(0, Palettes.length - 1)];

  var DEFAULT_SIZE = 1024;
  const windowMargin = id ? 1 : 0.75;
  var width = window.innerWidth * windowMargin;
  var height = window.innerHeight * windowMargin;
  var dim = Math.min(width, height);
  var m = dim / DEFAULT_SIZE;

  const irrShapes = [];
  let res = rnd.random_choice([3, 4, 5, 6, 8, 10]);
  const cols = res;
  const rows = res;

  let BASE_H,
    BASE_S = rnd.random_int(0, 50),
    BASE_B = 90;
  const setup = (p, canvasParentRef) => {
    p.pixelDensity(1);
    p.createCanvas(dim, dim, p.SVG).parent(canvasParentRef);
    p.colorMode(p.HSL);
    p.noLoop();

    const bgColor = hex2hsl(palette.shift());
    BASE_H = bgColor[1][0];
    console.log(BASE_H, BASE_S);
    p.background(BASE_H, BASE_S, BASE_B);
    texturize(p, rnd, 500000, BASE_H, BASE_S, BASE_B, dim, dim);

    let radius, xoff, yoff;
    if (res === 3) {
      radius = 60;
      console.log(radius);
      xoff = rnd.random_int(10, 25);
    } else if (res === 4) {
      radius = 45;
      xoff = rnd.random_int(10, 20);
    } else if (res === 5) {
      radius = 40;
      xoff = rnd.random_int(10, 15);
    } else if (res === 6) {
      radius = 30;
      xoff = rnd.random_int(10, 15);
    } else if (res === 8) {
      radius = 25;
      xoff = rnd.random_int(10, 15);
    } else if (res === 10) {
      radius = 20;
      xoff = rnd.random_int(8, 12);
    }
    yoff = rnd.random_int(0, 1) ? xoff : -xoff;
    xoff = rnd.random_int(0, 1) ? xoff : -xoff;

    xoff = rnd.random_between(0, 1) > 0.9 ? 0 : xoff;
    yoff = rnd.random_between(0, 1) > 0.9 ? 0 : yoff;
    for (let i = 1; i < cols + 1; i++) {
      for (let j = 1; j < rows + 1; j++) {
        irrShapes.push(
          new IrregularShapeWithShadow(
            p,
            radius * m,
            rnd.random_int(5, 10),
            (i * dim) / (cols + 1),
            (j * dim) / (rows + 1),
            xoff * m,
            yoff * m
          )
        );
      }
    }

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas("color_shadows_" + hash, "png");
    };
  };

  const draw = (p) => {
    let sameColorOnRow = rnd.random_between(0, 1) > 0.8 ? true : false;
    const alpha = rnd.random_between(0.5, 0.5);
    for (let i = 0; i < cols; i++) {
      let sameColor;
      if (res === 4 && sameColorOnRow) {
        sameColor = p.color(palette.shift());
      } else {
        sameColor = p.color(palette[rnd.random_int(0, palette.length - 1)]);
      }
      sameColor.setAlpha(alpha);
      for (let j = 0; j < rows; j++) {
        if (sameColorOnRow) {
          irrShapes[i + j * cols].draw(p, sameColor);
        } else {
          let rndColor = p.color(
            palette[rnd.random_int(0, palette.length - 1)]
          );
          rndColor.setAlpha(alpha);
          irrShapes[i + j * cols].draw(p, rndColor);
        }
      }
    }
  };

  function IrregularShapeWithShadow(p, radius, numVertices, x, y, xoff, yoff) {
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
        p.int(p.cos(p.radians(i * this.theta)) * radius) + xoff,
        p.int(p.sin(p.radians(i * this.theta)) * radius) + yoff
      );
    }

    this.draw = function (p, color) {
      p.push();
      p.translate(x, y);
      p.beginShape();
      for (var q = 0; q < this.numVertices; q++) {
        p.noStroke();
        p.curveVertex(this.vertices2[q].x, this.vertices2[q].y);
        p.fill(color);
      }
      for (var w = 0; w < 3; w++) {
        p.curveVertex(this.vertices2[w].x, this.vertices2[w].y);
      }
      p.endShape();

      p.beginShape();
      for (var e = 0; e < this.numVertices; e++) {
        p.noFill();
        p.strokeWeight(1.5 * m);
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

export default ColorShadows;
