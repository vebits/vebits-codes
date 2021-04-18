import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import Sketch from "react-p5";
import Random from "utils/random";
import { random_hash } from "utils/random";

import { Colors } from "utils/constants";
import Palettes from "nice-color-palettes/1000";

const Page = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 12px;
  background-color: "white";
`;

const StyledLink = css`
  text-decoration: none;
  color: ${Colors.palette.five};
  border-bottom: solid 1px ${Colors.palette.five};
  padding-bottom: 4px;
  margin-bottom: 24px;
  font-weight: 800;

  :hover {
    opacity: 0.7;
  }
`;

const StyledRRLink = styled(Link)`
  ${StyledLink}
`;

const Title = styled.h2`
  font-size: 3.5rem;
  color: ${Colors.palette.five};
  margin: 0;
  margin-bottom: 24px;
`;

const tokenData = { hash: random_hash() };
const seed = parseInt(tokenData.hash.slice(0, 16), 16);
//const r = new Random(41126607537855070);
const r = new Random(seed);
let palette = Palettes[r.random_int(0, Palettes.length - 1)];
console.log(palette);

var DEFAULT_SIZE = 1000;
var width = window.innerWidth * 0.75;
var height = window.innerHeight * 0.75;
var dim = Math.min(width, height);
var m = dim / DEFAULT_SIZE;

function ColorShadows() {
  const irrShapes = [];
  let res = r.random_choice([3, 4, 5, 6, 8, 10]);
  res = 3;
  const cols = res;
  const rows = res;

  const setup = (p, canvasParentRef) => {
    p.createCanvas(dim, dim, p.SVG).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.noLoop();

    p.background(255);

    let radius, xoff, yoff;
    if (res === 3) {
      radius = 60 * m;
      xoff = r.random_int(10, 25) * m;
      yoff = r.random_int(0, 1) ? xoff : -xoff;
      xoff = r.random_int(0, 1) ? xoff : -xoff;
    } else if (res === 4) {
      radius = 50 * m;
      xoff = r.random_int(10, 20) * m;
      yoff = r.random_int(0, 1) ? xoff : -xoff;
      xoff = r.random_int(0, 1) ? xoff : -xoff;
    } else if (res === 5) {
      radius = 40 * m;
      xoff = r.random_int(10, 15) * m;
      yoff = r.random_int(0, 1) ? xoff : -xoff;
      xoff = r.random_int(0, 1) ? xoff : -xoff;
    } else if (res === 6) {
      radius = 30 * m;
      xoff = r.random_int(10, 15) * m;
      yoff = r.random_int(0, 1) ? xoff : -xoff;
      xoff = r.random_int(0, 1) ? xoff : -xoff;
    } else if (res === 8) {
      radius = 25 * m;
      xoff = r.random_int(5, 10) * m;
      yoff = r.random_int(0, 1) ? xoff : -xoff;
      xoff = r.random_int(0, 1) ? xoff : -xoff;
    } else if (res === 10) {
      radius = 20 * m;
      xoff = r.random_int(5, 10) * m;
      yoff = r.random_int(0, 1) ? xoff : -xoff;
      xoff = r.random_int(0, 1) ? xoff : -xoff;
    }

    xoff = r.random_between(0, 1) > 0.9 ? 0 : xoff;
    yoff = r.random_between(0, 1) > 0.9 ? 0 : yoff;
    for (let i = 1; i < cols + 1; i++) {
      for (let j = 1; j < rows + 1; j++) {
        irrShapes.push(
          new IrregularShapeWithShadow(
            p,
            radius * m,
            r.random_int(5, 10),
            (i * dim) / (cols + 1),
            (j * dim) / (rows + 1),
            xoff,
            yoff
          )
        );
      }
    }
    console.log(irrShapes);
  };

  const draw = (p) => {
    let sameColorOnRow = r.random_between(0, 1) > 0.9 ? true : false;
    const alpha = r.random_between(0.5, 0.8);
    for (let i = 0; i < cols; i++) {
      let sameColor = p.color(palette[r.random_int(0, palette.length - 1)]);
      sameColor.setAlpha(alpha);
      for (let j = 0; j < rows; j++) {
        if (sameColorOnRow) {
          irrShapes[i + j * cols].draw(p, sameColor);
        } else {
          let rndColor = p.color(palette[r.random_int(0, palette.length - 1)]);
          rndColor.setAlpha(alpha);
          irrShapes[i + j * cols].draw(p, rndColor);
        }
      }
    }

    displayBorder(p, 12);
  };

  return (
    <Page>
      <StyledRRLink to="/">back to frontpage</StyledRRLink>
      <Title>color shadows</Title>
      <Sketch setup={setup} draw={draw} />
    </Page>
  );
}

function IrregularShapeWithShadow(p, radius, numVertices, x, y, xoff, yoff) {
  this.radius = radius;
  this.numVertices = numVertices;
  this.vertices = [];
  this.vertices2 = [];
  this.theta = 360 / this.numVertices;

  for (var i = 0; i < this.numVertices; i++) {
    radius = p.random(this.radius / 2, this.radius * 2);
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

/* function SymmetricalCell(p, radius, numVertices) {
  this.radius = radius;
  this.numVertices = numVertices;
  this.vertices = [];
  this.theta = 360 / this.numVertices;

  for (let i = 0; i < this.numVertices; i++) {
    if (i % 2) {
      radius = this.radius;
    } else {
      radius = this.radius / 2;
    }
    this.vertices[i] = new Point(
      p.int(p.cos(p.radians(i * this.theta)) * radius),
      p.int(p.sin(p.radians(i * this.theta)) * radius)
    );
  }

  this.draw = function () {
    p.beginShape();
    for (let i = 0; i < this.numVertices; i++) {
      p.curveVertex(this.vertices[i].x, this.vertices[i].y);
    }
    // draw the first three points again to close the shape with a curve
    for (let i = 0; i < 3; i++) {
      p.curveVertex(this.vertices[i].x, this.vertices[i].y);
    }
    p.endShape();
  };
} */

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function displayBorder(p, e) {
  p.fill(0);
  p.stroke(0);
  p.strokeJoin(p.MITER);
  p.beginShape();
  p.vertex(0, 0);
  p.vertex(dim, 0);
  p.vertex(dim, dim);
  p.vertex(0, dim);
  p.beginContour();
  p.vertex(e, e);
  p.vertex(e, dim - e);
  p.vertex(dim - e, dim - e);
  p.vertex(dim - e, e);
  p.endContour();
  p.endShape(p.CLOSE);
}

export default ColorShadows;
