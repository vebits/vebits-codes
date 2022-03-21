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
let seed = parseInt(tokenData.hash.slice(0, 16), 16);
//seed = 4255511610659292; ["#a43935", "#771916", "#e2daca"] ["#5e7b75", "#3f615a", "#f0ede6"] ["#e8c064", "#e8b643", "#eae6d9"]
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
width = 1024;
height = width * 1.5;

console.log(width, height);
var dim = Math.min(width, height);
var m = dim / DEFAULT_SIZE;

// PALETTE
let palette = Palettes[rnd.random_int(0, Palettes.length - 1)];
let paletteBg = Palettes[rnd.random_int(0, Palettes.length - 1)];
const bgColor = paletteBg[rnd.random_int(0, paletteBg.length - 1)];
const borderColor = paletteBg[rnd.random_int(0, paletteBg.length - 1)];
console.log(palette, bgColor, seed);

const cell_w = 32 * m;
const cell_h = 16 * m;
const mid_w = width / 2;
const mid_h = height / 2;

// seeds: 37930565674235220 37164958221039304 54336704747254100
// mono: bg: 77, rest black and white
function Cassettes() {
  const setup = (p, canvasParentRef) => {
    p.pixelDensity(1);
    p.createCanvas(width, height, p.SVG).parent(canvasParentRef);
    p.noLoop();
    p.colorMode(p.HSL);

    p.background(hex2hsl("#f0ede6")[0]); //"#ffcd57"

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas("cassettes_" + seed, "png");
    };
  };

  const draw = (p) => {
    //generateGrid(p);
    //drawLines(p);

    let i = 0;
    /* const black = false;
    for (let y = 0; y < height + 64; y += 32 * m * 4) {
      i++;
      for (let x = 0; x < width; x += 64 * m * 2) {
        const color = p.color(hex2hsl(palette[i % 5])[0]);
        drawWall(
          p,
          i % 2 === 0 ? x : x + 64 * m,
          y,
          rnd.random_choice([6]),
          rnd.random_choice([1]),
          42,
          42,
          86
        );
      }
    } */
    // Many shit
    for (let y = 0; y < height; y += 16 * m * 4) {
      i++;
      for (let x = 0; x < width; x += 32 * m * 2) {
        const color = p.color(hex2hsl(palette[i % 5])[0]);
        drawWall(
          p,
          i % 2 === 0 ? x : x + 32 * m,
          y,
          rnd.random_choice([1, 2, 4]),
          rnd.random_choice([1, 2, 4]),
          color,
          color,
          0
        );
      }
    }
    /* let x = mid_w / 64;
    let y = mid_h / 32;
    const black = false;
    const usedCords = [];
    for (let i = 0; i < 2000; i++) {
      const color = p.color(hex2hsl(palette[i % 5])[0]);
      if (!usedCords.some((a) => a.toString() === `${x},${y}`)) {
        drawWall(
          p,
          x * cell_w,
          y * cell_h,
          rnd.random_choice([1]),
          rnd.random_choice([1]),
          black ? 0 : 100,
          black ? 100 : 0,
          color
        );
      }
      if (x * cell_w === 0) {
        x += 1;
      } else if (x * cell_w === width) {
        x -= 1;
      } else if (y * cell_h === 0) {
        y += 1;
      } else if (y * cell_h === height) {
        y -= 1;
      } else {
        const r = rnd.random_choice([0, 1, 2, 3]);
        switch (r) {
          case 0:
            x = x + 1;
            break;
          case 1:
            x = x - 1;
            break;
          case 2:
            y = y + 1;
            break;
          case 3:
            y = y - 1;
            break;
          default:
            break;
        }
      }
      usedCords.push([x, y]);
    } */
    displayBorder(p, 96 * m, hex2hsl("#f0ede6")[0]);
  };

  function drawWall(p, x, y, height, width, shade1, shade2, shade3) {
    p.strokeJoin(p.ROUND);
    p.strokeWeight(1 * m);

    // draw top
    p.fill(shade1);
    p.stroke(shade1);
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

    /* p.stroke(shade1);
    p.strokeWeight(1);
    for (let i = 0; i < height * 8; i++) {
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
      for (let j = 0; j <= height / cell_h; j++) {
        p.strokeWeight(1 * m);
        p.stroke(0);
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

        /* if (i % 2 === 0) {
          p.line(
            (i * cell_w) / 2,
            j * cell_h,
            ((i + 1) * cell_w) / 2,
            j * cell_h + cell_h / 2
          );
        } else {
          p.line(
            (i * cell_w) / 2,
            j * cell_h + cell_h / 2,
            ((i + 1) * cell_w) / 2,
            j * cell_h + cell_h
          );
        } */
      }
    }
  }

  function displayBorder(p, e, color) {
    p.fill(color);
    p.stroke(color);
    p.strokeWeight(2 * m);
    p.strokeJoin(p.MITER);
    p.beginShape();
    p.vertex(-1 * m, -1 * m);
    p.vertex(width + 1 * m, -1 * m);
    p.vertex(width + 1 * m, height + 1 * m);
    p.vertex(-1 * m, height + 1 * m);
    p.beginContour();
    p.stroke(0);
    p.vertex(e, e);
    p.vertex(e, height - e);
    p.vertex(width - e, height - e);
    p.vertex(width - e, e);
    p.endContour();
    p.endShape(p.CLOSE);
  }

  return <Sketch setup={setup} draw={draw} />;
}

export default Cassettes;
