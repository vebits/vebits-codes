import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import Sketch from "react-p5";
import Random, { random_hash } from "utils/random";
import { Colors } from "utils/constants";

import paperColors from "paper-colors";
import { hex2hsl } from "utils/color-converter";

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
var DEFAULT_SIZE = 1024;
var width = window.innerWidth * 0.75;
var height = window.innerHeight * 0.75;
width = 1024;
height = 1024;
var m = height / DEFAULT_SIZE;

function FriederNake() {
  const setup = (p, canvasParentRef) => {
    p.pixelDensity(1);
    p.createCanvas(width, height, p.SVG).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.noLoop();

    p.background(80);
    p.noiseSeed(seed);
  };
  const draw = (p) => {
    const seqPalette = paperColors.slice();
    for (let i = 0; i < 12; i++) {
      let color;
      if (seqPalette.length !== 0) {
        color = seqPalette.shift().hex;
      } else {
        color = paperColors[Math.floor(Math.random() * paperColors.length)].hex;
      }

      const horizontal = rnd.random_int(0, 1);
      const forward = rnd.random_int(0, 1);
      drawPiece(
        p,
        rnd.random_int(10, 250) * m,
        rnd.random_int(2, 10) * m,
        rnd.random_int(2, 10) * m,
        color,
        horizontal,
        forward
      );
    }
  };

  function drawPiece(p, length, xoffinc, yoffinc, color, horizontal, forward) {
    const x = rnd.random_int(250 * m, 750 * m);
    const y = rnd.random_int(250 * m, 750 * m);
    let xoff = 0;
    let yoff = 0;
    p.stroke(p.color(color));
    p.strokeWeight(2);
    const numOfLines = rnd.random_int(20, 30);
    for (let i = 0; i < numOfLines; i++) {
      if (horizontal) {
        if (forward) {
          p.line(x, y + yoff, x + length, y + yoff);
        } else {
          p.line(x, y - yoff, x + length, y - yoff);
        }
      } else {
        if (forward) {
          p.line(x + xoff, y, x + xoff, y + length);
        } else {
          p.line(x - xoff, y, x - xoff, y + length);
        }
      }
      xoff += xoffinc;
      yoff += yoffinc;
    }
  }

  return (
    <Page>
      <StyledRRLink to="/">back to frontpage</StyledRRLink>
      <Info>
        <Title>jane</Title>
        <Date>03.05.2021</Date>
      </Info>
      <Sketch setup={setup} draw={draw} />
    </Page>
  );
}

export default FriederNake;
