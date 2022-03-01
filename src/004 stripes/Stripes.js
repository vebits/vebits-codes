import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import Sketch from "react-p5";
import Random from "utils/random";
import { random_hash } from "utils/random";
import Palettes from "nice-color-palettes/1000";

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
let palette = Palettes[r.random_int(0, Palettes.length - 1)];
const inverted = 0;

var DEFAULT_SIZE = 1000;
var width = window.innerWidth * 0.75;
var height = window.innerHeight * 0.75;
var dim = Math.min(width, height);
var m = dim / DEFAULT_SIZE;

function Project() {
  const setup = (p, canvasParentRef) => {
    p.createCanvas(dim, dim, p.SVG).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.noLoop();

    p.background(255);
  };

  const draw = (p) => {
    for (let i = 0; i < 10; i++) {
      const startSide = r.random_choice([1, 2, 3, 4]);
      let x1, y1, x2, y2;
      if (startSide === 1) {
        x1 = 0;
        y1 = r.random_int(0, dim);
        x2 = r.random_int(0, dim);
        y2 = dim;
      } else if (startSide === 2) {
        x1 = r.random_int(0, dim);
        y1 = 0;
        x2 = r.random_int(0, dim);
        y2 = dim;
      } else if (startSide === 3) {
        x1 = dim;
        y1 = r.random_int(0, dim);
        x2 = 0;
        y2 = r.random_int(0, dim);
      } else if (startSide === 4) {
        x1 = r.random_int(0, dim);
        y1 = dim;
        x2 = r.random_int(0, dim);
        y2 = 0;
      }
      const rndwidth = r.random_int(10, 20);
      for (let j = 0; j < rndwidth; j++) {
        const strokeW = r.random_int(10, 10) * m;
        const color = palette[r.random_int(0, palette.length - 1)];
        p.strokeWeight(strokeW);
        p.stroke(color);
        p.line(x1, y1, x2, y2);
        if (startSide === 1) {
          y1 += strokeW - 1;
          x2 -= strokeW + 1;
        } else if (startSide === 2) {
          x1 += strokeW - 1;
          x2 += strokeW - 1;
        } else if (startSide === 3) {
          y1 += strokeW - 1;
          y2 += strokeW - 1;
        } else if (startSide === 4) {
          x1 += strokeW - 1;
          x2 += strokeW - 1;
        }
      }
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
          <Title inverted={inverted}>Stripes</Title>
          <Date>16.04.2021</Date>
        </Info>
        <Sketch setup={setup} draw={draw} />
      </Page>
    </>
  );
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

export default Project;
