import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import Sketch from "react-p5";
import * as tome from "chromotome";
import Random from "utils/random";
import { random_hash } from "utils/random";

import { Colors } from "utils/constants";
import Footer from "Footer";

const Page = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 12px;
  background-color: ${(props) => (props.inverted ? "black" : "white")};
`;

const StyledLink = css`
  text-decoration: none;
  color: ${(props) => (props.inverted ? "white" : Colors.palette.five)};
  border-bottom: ${(props) =>
    props.inverted ? `solid 1px white` : `solid 1px ${Colors.palette.five}`};
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

const tokenData = { hash: random_hash() };
const seed = parseInt(tokenData.hash.slice(0, 16), 16);
//const r = new Random(41126607537855070);
const r = new Random(seed);
const allPalettes = tome.getAll();
const palette = allPalettes[r.random_int(0, allPalettes.length - 1)];
const inverted = r.random_choice([0, 1]);

var DEFAULT_SIZE = 1000;
var width = window.innerWidth * 0.75;
var height = window.innerHeight * 0.75;
var dim = Math.min(width, height);
var m = dim / DEFAULT_SIZE;

function Sabers() {
  const setup = (p, canvasParentRef) => {
    p.createCanvas(dim, dim, p.SVG).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.angleMode(p.DEGREES);
    p.noLoop();

    p.push();
    p.background(inverted === 1 ? 0 : 255);
    p.pop();
  };

  const draw = (p) => {
    let y = 64 * m;
    for (let i = 1; i < dim; i++) {
      const x = r.random_between(64 * m, dim);
      drawLine(p, x, y);
      y += 10 * m;
    }

    displayBorder(p, 12);
  };

  return (
    <>
      <Page inverted={inverted}>
        <StyledRRLink to="/" inverted={inverted}>
          back to frontpage
        </StyledRRLink>
        <Info>
          <Title inverted={inverted}>sabers</Title>
          <Date inverted={inverted}>07.04.2021</Date>
        </Info>
        <Sketch setup={setup} draw={draw} />
      </Page>
    </>
  );
}

function drawLine(p, x, y) {
  const color = palette.colors[p.floor(r.random_between(0, palette.size))];
  p.stroke(color);
  p.strokeWeight(r.random_between(4, 8) * m);
  p.strokeCap(p.ROUND);
  const x2 = x + r.random_between(12, 128) * m;
  if (x2 < dim - 64 * m && y < dim - 64 * m) {
    p.line(x, y, x2, y);
  }
}

function displayBorder(p, e) {
  p.fill(inverted === 1 ? 255 : 0);
  p.stroke(inverted === 1 ? 255 : 0);
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

export default Sabers;
