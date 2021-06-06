import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import Sketch from "react-p5";
import Random, { random_hash } from "utils/random";
import { Colors } from "utils/constants";

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
var DEFAULT_SIZE = 1000;
var width = window.innerWidth * 0.75;
var height = window.innerHeight * 0.75;
var dim = Math.min(width, height);
dim = 1000;
var m = dim / DEFAULT_SIZE;

// PALETTE
let palette = Palettes[rnd.random_int(0, Palettes.length - 1)];
let paletteBg = Palettes[rnd.random_int(0, Palettes.length - 1)];
const bgColor = paletteBg[rnd.random_int(0, paletteBg.length - 1)];
console.log(palette, bgColor, seed);

function Flow2() {
  let res = rnd.random_choice([3, 4, 5, 6, 8, 10]);
  res = 24;
  const cols = res;
  const rows = res;
  const grid = [];

  const setup = (p, canvasParentRef) => {
    p.pixelDensity(1);
    p.createCanvas(dim, dim, p.SVG).parent(canvasParentRef);
    p.noLoop();
    p.colorMode(p.HSL);

    p.background(bgColor);

    p.noiseSeed(seed);
  };

  const draw = (p) => {
    p.noFill();

    for (let i = 1; i < cols + 1; i++) {
      for (let j = 1; j < rows + 1; j++) {
        grid.push(new Point((i * dim) / (cols + 1), (j * dim) / (rows + 1)));
      }
    }
    const dot = rnd.random_choice([0, 1, 2]);
    for (let i = 0; i < grid.length; i++) {
      p.rectMode(p.CENTER);
      const x = grid[i].x;
      const y = grid[i].y;
      p.stroke(rnd.random_between(0, 1) > 0.5 ? 0 : 255);
      if (rnd.random_between(0, 1) > 0.5) {
        p.noStroke();
        //p.fill(255);
        p.fill(p.color(palette[rnd.random_int(0, palette.length - 1)]));
        const circle = rnd.random_choice([0, 1, 2, 3]);
        if (circle === 0) {
          if (rnd.random_between(0, 1) > 0.5) {
            p.arc(x, y, 24 * m, 24 * m, 0, p.PI);
          } else {
            p.noFill();
            p.stroke(p.color(palette[rnd.random_int(0, palette.length - 1)]));
            p.strokeWeight(1);
            p.arc(x, y, 24 * m, 24 * m, 0, p.PI);
          }
        } else if (circle === 1) {
          if (rnd.random_between(0, 1) > 0.5) {
            p.arc(x, y, 24 * m, 24 * m, p.PI, p.PI * 2);
          } else {
            p.noFill();
            p.stroke(p.color(palette[rnd.random_int(0, palette.length - 1)]));
            p.strokeWeight(1);
            p.arc(x, y, 24 * m, 24 * m, p.PI, p.PI * 2);
          }
        } else if (circle === 2) {
          if (rnd.random_between(0, 1) > 0.5) {
            p.arc(x, y, 24 * m, 24 * m, 0, p.PI * 2);
          } else {
            p.noFill();
            p.stroke(p.color(palette[rnd.random_int(0, palette.length - 1)]));
            p.strokeWeight(1);
            p.arc(x, y, 24 * m, 24 * m, 0, p.PI * 2);
          }
        } else if (circle === 3) {
          p.rect(x, y, 24 * m, (24 * m) / 2);
        }
      } else {
        p.strokeWeight(5 * m);
        if (dot === 0) {
          p.noStroke();
        } else if (dot === 1) {
          p.stroke(255);
        } else if (dot === 2) {
          p.stroke(0);
        }
        p.point(x, y);
      }
    }
  };

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  return (
    <Page>
      <StyledRRLink to="/">back to frontpage</StyledRRLink>
      <Info>
        <Title>color circles</Title>
        <Date>04.06.2021</Date>
      </Info>
      <Sketch setup={setup} draw={draw} />
    </Page>
  );
}

export default Flow2;
