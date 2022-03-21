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
if (window.innerHeight >= 1.2 * window.innerWidth) {
  width = window.innerWidth;
  height = 1.2 * window.innerWidth;
} else {
  height = window.innerHeight;
  width = window.innerHeight / 1.2;
}
const windowMargin = 0.75;
width = width * windowMargin;
height = height * windowMargin;
console.log(width, height);
var dim = Math.min(width, height);
var m = dim / DEFAULT_SIZE;

// PALETTE
let palette = Palettes[rnd.random_int(0, Palettes.length - 1)];
let paletteBg = Palettes[rnd.random_int(0, Palettes.length - 1)];
const bgColor = paletteBg[rnd.random_int(0, paletteBg.length - 1)];
//console.log(palette, bgColor, seed);

function DotLines() {
  const setup = (p, canvasParentRef) => {
    p.pixelDensity(1);
    p.createCanvas(width, height, p.SVG).parent(canvasParentRef);
    p.noLoop();
    p.colorMode(p.HSL);

    p.background(98);

    p.noiseSeed(seed);
    /*     texturize(
      p,
      rnd,
      750000,
      rnd.random_between(10, 255),
      10,
      80,
      width,
      height
    ); */
  };

  const draw = (p) => {
    for (let i = 16; i <= height * 2; i += 16) {
      p.line(0, i, i * 3, 0);
    }

    /* for (let i = 0; i < 2; i++) {
      const color = p.color(
        hex2hsl(palette[rnd.random_int(0, palette.length - 1)])[0]
      );
      drawPH(
        p,
        rnd.random_between(0, width),
        rnd.random_between(0, height),
        color
      );
    } */
    //drawPH(p, 150, 350, color2);
    /* drawPH(p, width / 2, height / 2, color3);
    drawPH(p, width / 2, height / 2, color4);
    drawPH(p, width / 2, height / 2, color5); */

    /* p.arc(width / 2, height / 2 + 100, 200, 100, 0, p.PI + p.PI * 2, p.PIE);
    p.arc(width / 2, height / 2 + 200, 50, 100, 0, p.PI + p.PI * 2, p.PIE); */
    drawCube(p, 50);

    /*   for (let x = 100 * m; x < width - 100 * m; x += offset) {
      console.log(x, width);
      const size = rnd.random_between(50, 50) * m;
      drawDotLine(p, x + size / 2, rnd.random_between(150, 400) * m, size);
      offset = size + 1;
      if (rnd.random_between(0, 1) > 0.25) {
        offset += rnd.random_between(0, 50) * m;
      }
    } */
  };

  function drawPH(p, x, y, color) {
    p.strokeWeight(2);
    p.stroke(0);
    //p.line(x, y, x, y + 300);
    p.strokeWeight(2);
    p.stroke(98);
    p.fill(100);
    p.circle(x, y + 300, rnd.random_between(30, 100));
    p.stroke(0);
    p.strokeWeight(1);
    p.stroke(98);
    p.strokeWeight(3);
    p.arc(x, y, 500, 250, 0, p.PI + p.PI * 2, p.PIE);
  }

  function drawCube(p, xx) {
    var cW = width / 2; //x coordinate for center
    var cH = height / 2; //y coordinate for center
    var yy = xx / 2; //half of side length
    p.fill(255, 0, 0); //sets fill color to red
    p.stroke(0);
    //p.quad(cW, cH, cW + 200, cH + 100, cW, cH + xx, cW - xx, cH + yy); //draws the top quad of a cube
    p.fill(255, 0, 255); //sets fill color to magenta
    //p.quad(cW, cH + xx, cW + xx, cH + yy, cW + xx, cH + yy, cW, cH + yy * p.PI); //draws the right quad of a cube
    //p.fill(0, 0, 255); //sets the fill color to blue
    p.quad(cW, cH, cW, cH + 200, cW - 50, cH + 150, cW - 50, cH - 40); //draws the left quad of a cube
    p.fill(0);
    p.quad(0, cH + 312, cW, cH + 200, cW - 50, cH + 150, 0, cH + 244);
    /*   p.stroke("purple");
    p.strokeWeight(10);
    p.point(cW - xx, cH + xx); */
  }

  function drawDotLine(p, x, y, size) {
    const y_end = y + rnd.random_between(200, 800) * m;
    const color = p.color(
      hex2hsl(palette[rnd.random_int(0, palette.length - 1)])[0]
    );
    color.setAlpha(0.25);
    p.strokeWeight(size);
    p.stroke(color);
    p.line(x, y + 1, x, y_end - 1);
    p.strokeWeight(0);
    p.fill(rnd.random_between(40, 40));
    p.circle(x, y, size);
    p.circle(x, y_end, size);
  }

  return (
    <Page>
      <StyledRRLink to="/">back to frontpage</StyledRRLink>
      <Info>
        <Title>dot lines 2</Title>
        <Date>03.11.2021</Date>
      </Info>
      <Sketch setup={setup} draw={draw} />
    </Page>
  );
}

export default DotLines;
