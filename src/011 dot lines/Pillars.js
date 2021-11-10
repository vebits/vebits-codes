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
let DEFAULT_SIZE = 1024;
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
width = 1024;
height = width * 1.5;

console.log(width, height);
var dim = Math.min(width, height);
var m = dim / DEFAULT_SIZE;

// PALETTE
let palette = Palettes[rnd.random_int(0, Palettes.length - 1)];
let paletteBg = Palettes[rnd.random_int(0, Palettes.length - 1)];
const bgColor = paletteBg[rnd.random_int(0, paletteBg.length - 1)];
//console.log(palette, bgColor, seed);

const cell_w = 64;
const cell_h = 32;

function DotLines() {
  const setup = (p, canvasParentRef) => {
    p.pixelDensity(1);
    p.createCanvas(width, height, p.SVG).parent(canvasParentRef);
    p.noLoop();
    p.colorMode(p.HSL);

    p.background(96);

    p.noiseSeed(seed);
    p.noStroke();
  };

  const draw = (p) => {
    generateGrid(p);
    drawLines(p);

    /* const topShade = rnd.random_between(0, 90);
    const leftShade = rnd.random_between(0, 90);
    const rightShade = rnd.random_between(0, 90); */

    /* const leftRightShade = p.color(
      hex2hsl(palette[rnd.random_int(0, palette.length - 1)])[0]
    );
    const topDownShade = p.color(
      hex2hsl(palette[rnd.random_int(0, palette.length - 1)])[0]
    );
    const leftShade = p.color(
      hex2hsl(palette[rnd.random_int(0, palette.length - 1)])[0]
    );
    const rightShade = p.color(
      hex2hsl(palette[rnd.random_int(0, palette.length - 1)])[0]
    );

    p.strokeWeight(1);
    p.fill(leftShade);
    p.quad(512 - 128, 768, 512 - 96, 768 + 16, 0, 32 * 31, 0, 32 * 30);
    p.quad(512 + 128, 768, 512 + 96, 768 - 16, 1024, 32 * 17, 1024, 32 * 18);
    p.quad(512, 768 - 64, 1024, 32 * 14, 1024, 32 * 15, 512 + 32, 768 - 48);
    p.quad(512 - 32, 768 + 48, 512, 768 + 64, 0, 32 * 34, 0, 32 * 33);

    p.fill(rightShade);
    p.quad(512, 768 + 64, 512 + 32, 768 + 48, 1024, 32 * 33, 1024, 32 * 34);
    p.quad(512 - 32, 768 - 48, 0, 32 * 15, 0, 32 * 14, 512, 768 - 64);
    p.quad(512 - 128, 768, 0, 32 * 18, 0, 32 * 17, 512 - 96, 768 - 16);
    p.quad(512 + 128, 768, 1024, 32 * 30, 1024, 32 * 31, 512 + 96, 768 + 16);

    drawTop(p, 512 - 128, 768 - 32 * 8, topDownShade);
    drawLeftSide(p, 512 - 128, 768 - 32 * 8, leftShade);
    drawRightSide(p, 512 - 128, 768 - 32 * 8, rightShade);

    drawTop(p, 512 - 32, 768 - 9 * 32 - 16, leftRightShade);
    drawLeftSide(p, 512 - 32, 768 - 9 * 32 - 16, leftShade);
    drawRightSide(p, 512 - 32, 768 - 9 * 32 - 16, rightShade);

    p.fill(leftShade);
    p.fill(rightShade);
    drawTop(p, 512 + 64, 768 - 32 * 8, topDownShade);
    drawLeftSide(p, 512 + 64, 768 - 32 * 8, leftShade);
    drawRightSide(p, 512 + 64, 768 - 32 * 8, rightShade);

    p.fill(leftShade);
    drawTop(p, 512 - 32, 768 - 7 * 32 + 16, leftRightShade);
    drawLeftSide(p, 512 - 32, 768 - 7 * 32 + 16, leftShade);
    drawRightSide(p, 512 - 32, 768 - 7 * 32 + 16, rightShade);

    p.stroke(0);
    p.strokeWeight(6);
    const x = 32 * 16;
    const y = 32 * 24;
    console.log(x, y);
    p.point(x, y);
    p.point(1024, findEdgePointDownwards(x, y));
    p.point(1024, findEdgePointUpwards(x, y));
    console.log(findEdgePointDownwards(x, y));
    console.log(findEdgePointUpwards(x, y)); */
  };

  function drawTop(p, x, y, shade) {
    p.fill(shade);
    p.stroke(shade);
    p.strokeWeight(1);
    p.quad(
      x,
      y,
      x + cell_w / 2,
      y - cell_h / 2,
      x + cell_w,
      y,
      x + cell_w / 2,
      y + cell_h / 2
    );
  }

  function drawLeftSide(p, x, y, shade) {
    p.fill(shade);
    p.stroke(shade);
    p.strokeWeight(1);
    p.quad(x, y, x + 32, y + 16, x + 32, y + 32 * 8 + 16, x, y + 32 * 8);
  }

  function drawRightSide(p, x, y, shade) {
    p.fill(shade);
    p.stroke(shade);
    p.strokeWeight(1);
    p.quad(
      x + 32,
      y + 16,
      x + 64,
      y,
      x + 64,
      y + 32 * 8,
      x + 32,
      y + 32 * 8 + 16
    );
  }

  function findEdgePointDownwards(x, y) {
    return x <= 1024 / 2
      ? x / 2 + (y / 32) * 32
      : (1024 - x) / 2 + (y / 32) * 32;
  }

  function findEdgePointUpwards(x, y) {
    return x <= 1024 / 2
      ? (y / 32) * 32 - x / 2
      : (y / 32) * 32 - (1024 - x) / 2;
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
        p.strokeWeight(3);
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

export default DotLines;
