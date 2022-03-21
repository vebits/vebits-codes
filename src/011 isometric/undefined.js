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
    p.createCanvas(1000, 1200, p.SVG).parent(canvasParentRef);
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
    p.quad(0, 0, 64, 0, 1000 / 2, 1200 / 2, 1000 / 2 - 64, 1200 / 2);
    p.quad(0, 0, 0, 64, 1000 / 2 - 64, 1200 / 2 + 64, 1000 / 2 - 64, 1200 / 2);
    p.quad(
      1000 / 2,
      1200 / 2,
      1000 / 2 - 64,
      1200 / 2,
      1000 / 2 - 64,
      1200 / 2 + 64,
      1000 / 2,
      1200 / 2 + 64
    );
  };

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
