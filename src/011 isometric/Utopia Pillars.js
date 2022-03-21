import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import Sketch from "react-p5";
import Random, { random_hash } from "utils/random";
import { Colors } from "utils/constants";
import { hex2hsl } from "utils/color-converter";
import texturize from "utils/textureBg";

import Palettes from "nice-color-palettes/1000";

const Page = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 12px;
  background-color: white;
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

const Info = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${(props) => (props.inverted ? "white" : Colors.palette.five)};
  margin: 0;
`;

const Date = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.inverted ? "white" : Colors.palette.five)};
  margin: 0;
  margin-bottom: 24px;
`;

// TOKEN AND RANDOM
const tokenData = { hash: random_hash() };
const seed = parseInt(tokenData.hash.slice(0, 16), 16);
const rnd = new Random(seed);

// DIMENSIONS
let DEFAULT_SIZE = 1024; // kan endre mengde her!!
let width, height;
if (window.innerHeight >= 1.5 * window.innerWidth) {
  width = window.innerWidth;
  height = 1.5 * window.innerWidth;
} else {
  height = window.innerHeight;
  width = window.innerHeight / 1.5;
}
/* const windowMargin = 0.75;
width = width * windowMargin;
height = height * windowMargin; */
/* width = 4096;
height = width * 1.5; */

console.log(width, height);
var dim = Math.min(width, height);
var m = dim / DEFAULT_SIZE;

// PALETTE
let palette = Palettes[rnd.random_int(0, Palettes.length - 1)];
let paletteBg = Palettes[rnd.random_int(0, Palettes.length - 1)];
const bgColor = paletteBg[rnd.random_int(0, paletteBg.length - 1)];
console.log(palette, bgColor, seed);

const cell_w = 64 * m;
const cell_h = 32 * m;
const mid_w = width / 2;
const mid_h = height / 2;

// seeds: 37930565674235220 37164958221039304 54336704747254100
function Pillars() {
  const setup = (p, canvasParentRef) => {
    p.pixelDensity(1);
    p.createCanvas(width, height, p.SVG).parent(canvasParentRef);
    p.noLoop();
    p.colorMode(p.HSL);

    p.background(96);

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas("pillars_" + seed, "png");
    };
  };

  const draw = (p) => {
    //generateGrid(p);
    //drawLines(p);

    /* const topShade = rnd.random_between(0, 90);
    const leftShade = rnd.random_between(0, 90);
    const rightShade = rnd.random_between(0, 90); */

    const leftRightShade = p.color(hex2hsl(palette[0])[0]);
    const topDownShade = p.color(hex2hsl(palette[1])[0]);
    const leftShade = p.color(hex2hsl(palette[2])[0]);
    const rightShade = p.color(hex2hsl(palette[3])[0]);

    p.strokeWeight(1 * m);
    p.stroke(leftShade);
    p.fill(leftShade);
    p.quad(
      mid_w - cell_w * 2,
      mid_h,
      mid_w - cell_w * 1.5,
      mid_h + cell_h / 2,
      0,
      findEdgePointDownwards(mid_w - cell_w * 2, mid_h) + cell_h,
      0,
      findEdgePointDownwards(mid_w - cell_w * 2, mid_h)
    );
    p.quad(
      mid_w - cell_w / 2,
      mid_h + cell_h * 1.5,
      mid_w,
      mid_h + cell_h * 2,
      0,
      findEdgePointDownwards(mid_w - cell_w / 2, mid_h + cell_h * 1.5) + cell_h,
      0,
      findEdgePointDownwards(mid_w - cell_w / 2, mid_h + cell_h * 1.5)
    );
    p.quad(
      mid_w + cell_w * 2,
      mid_h,
      mid_w + cell_w * 1.5,
      mid_h - cell_h / 2,
      width,
      findEdgePointUpwards(mid_w + cell_w * 2, mid_h) - cell_h,
      width,
      findEdgePointUpwards(mid_w + cell_w * 2, mid_h)
    );
    p.quad(
      mid_w,
      mid_h - cell_h * 2,
      width,
      findEdgePointUpwards(mid_w, mid_h - cell_h * 2),
      width,
      findEdgePointUpwards(mid_w, mid_h - cell_h * 2) + cell_h,
      mid_w + cell_w / 2,
      mid_h - cell_h * 1.5
    );

    p.fill(rightShade);
    p.stroke(rightShade);
    p.quad(
      mid_w,
      mid_h + cell_h * 2,
      mid_w + cell_w / 2,
      mid_h + cell_h * 1.5,
      width,
      findEdgePointDownwards(mid_w, mid_h + cell_h * 2) - cell_h,
      width,
      findEdgePointDownwards(mid_w, mid_h + cell_h * 2)
    );
    p.quad(
      mid_w - cell_w / 2,
      mid_h - cell_h * 1.5,
      0,
      findEdgePointUpwards(mid_w - cell_w / 2, mid_h - cell_h * 1.5),
      0,
      findEdgePointUpwards(mid_w - cell_w / 2, mid_h - cell_h * 1.5) - cell_h,
      mid_w,
      mid_h - cell_h * 2
    );
    p.quad(
      mid_w - cell_w * 2,
      mid_h,
      0,
      findEdgePointUpwards(mid_w - cell_w * 2, mid_h),
      0,
      findEdgePointUpwards(mid_w - cell_w * 2, mid_h) - cell_h,
      mid_w - cell_w * 1.5,
      mid_h - cell_h / 2
    );
    p.quad(
      mid_w + cell_w * 2,
      mid_h,
      width,
      findEdgePointDownwards(mid_w + cell_w * 2, mid_h),
      width,
      findEdgePointDownwards(mid_w + cell_w * 2, mid_h) + cell_h,
      mid_w + cell_w * 1.5,
      mid_h + cell_h / 2
    );

    drawWall(
      p,
      mid_w - cell_w / 2,
      mid_h - cell_h * 1.5,
      8,
      1,
      leftRightShade,
      leftShade,
      rightShade
    );

    drawWall(
      p,
      mid_w - cell_w * 2,
      mid_h,
      8,
      1,
      topDownShade,
      leftShade,
      rightShade
    );

    drawWall(
      p,
      mid_w - cell_w / 2,
      mid_h + cell_h * 1.5,
      8,
      1,
      leftRightShade,
      leftShade,
      rightShade
    );

    drawWall(
      p,
      mid_w + cell_w,
      mid_h,
      8,
      1,
      topDownShade,
      leftShade,
      rightShade
    );

    /*     p.stroke(0);
    p.strokeWeight(6);
    p.point(mid_w, mid_h); */
  };

  function drawWall(p, x, y, height, width, shade1, shade2, shade3) {
    p.strokeJoin(p.ROUND);
    p.stroke(0);

    p.fill(shade1);
    p.stroke(shade1);
    p.strokeWeight(1 * m);

    // draw top
    p.quad(
      x,
      y - cell_h * height,
      x + (cell_w / 2) * width,
      y - cell_h * height - (cell_h / 2) * width,
      x + cell_w / 2 + (cell_w / 2) * width,
      y - cell_h * height - (cell_h / 2) * width + cell_h / 2,
      x + cell_w / 2,
      y + cell_h / 2 - cell_h * height
    );

    // draw left side
    p.fill(shade2);
    p.stroke(shade2);
    p.quad(
      x,
      y - cell_h * height,
      x + cell_w / 2,
      y + cell_h / 2 - cell_h * height,
      x + cell_w / 2,
      y + cell_h / 2,
      x,
      y
    );

    // draw right side
    p.fill(shade3);
    p.stroke(shade3);
    p.quad(
      x + cell_w / 2,
      y + cell_h / 2,
      x + (cell_w / 2) * width + cell_w / 2,
      y - (cell_h / 2) * width + cell_h / 2,
      x + (cell_w / 2) * width + cell_w / 2,
      y - cell_h * height - (cell_h / 2) * width + cell_h / 2,
      x + cell_w / 2,
      y - cell_h * height + cell_h / 2
    );

    /*     p.strokeWeight(1);
    for (let i = 1; i < height * 8; i++) {
      p.line(
        x,
        y - (cell_h * i) / 8,
        x + cell_w / 2,
        y - (cell_h * i) / 8 + cell_h / 2
      );
    } */
  }

  function findEdgePointDownwards(x, y) {
    return x <= width / 2
      ? x / 2 + (y / 32) * 32
      : (width - x) / 2 + (y / 32) * 32;
  }

  function findEdgePointUpwards(x, y) {
    return x <= width / 2
      ? (y / 32) * 32 - x / 2
      : (y / 32) * 32 - (width - x) / 2;
  }

  function generateGrid(p) {
    for (let i = 0; i <= (width / cell_w) * 2; i++) {
      for (let j = 0; j <= height / cell_h; j++) {
        var offsetY = 0;
        if (i % 2 === 0) {
          offsetY = 0;
        } else {
          offsetY = cell_h / 2.0;
        }
        p.stroke(0);
        p.strokeWeight(3 * m);
        p.point((i * cell_w) / 2, j * cell_h - offsetY);
      }
    }
  }

  function drawLines(p) {
    for (let i = 0; i <= (width / cell_w) * 2; i++) {
      for (let j = 1; j <= height / cell_h; j++) {
        p.strokeWeight(1);
        if (i % 2 === 0) {
          p.line(
            (i * cell_w) / 2,
            j * cell_h,
            ((i + 1) * cell_w) / 2,
            j * cell_h - cell_h / 2
          );
        } else {
          p.line(
            (i * cell_w) / 2,
            j * cell_h - cell_h / 2,
            ((i + 1) * cell_w) / 2,
            j * cell_h - cell_h
          );
        }
      }
    }
  }

  return <Sketch setup={setup} draw={draw} />;
}

export default Pillars;
