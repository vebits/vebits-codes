import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import Sketch from "react-p5";
import * as tome from "chromotome";
import Random from "utils/random";
import { random_hash } from "utils/random";

import { Colors } from "utils/constants";

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

const Title = styled.h2`
  font-size: 3.5rem;
  color: ${(props) => (props.inverted ? "white" : Colors.palette.five)};
  margin: 0;
  margin-bottom: 24px;
`;

const tokenData = { hash: random_hash() };
const seed = parseInt(tokenData.hash.slice(0, 16), 16);
//const r = new Random(41126607537855070);
const r = new Random(seed);
const allPalettes = tome.getAll();
let palette = allPalettes[r.random_int(0, allPalettes.length - 1)];
/* while (palette.size > 2) {
  palette = allPalettes[r.random_int(0, allPalettes.length - 1)];
} */
const inverted = 0;

//var DEFAULT_SIZE = 1000;
var width = window.innerWidth * 0.75;
var height = window.innerHeight * 0.75;
var dim = Math.min(width, height);
//var m = dim / DEFAULT_SIZE;

function Project() {
  const setup = (p, canvasParentRef) => {
    p.createCanvas(dim, dim, p.SVG).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.noLoop();

    p.background(
      p.color(
        palette.background && palette.background !== "#000000"
          ? palette.background
          : "#fff"
      )
    );
    if (palette.background === "#000") {
      console.log("yey");
    }
  };

  const draw = (p) => {
    const startSide = r.random_choice([1, 2, 3, 4]);
    const reso = r.random_int(2, 4);
    const count = r.random_int(3, 6);
    for (let i = 0; i < count; i++) {
      console.log(startSide);
      let x, y, w, h;
      if (startSide === 1) {
        x = 0;
        y = r.random_int(dim * 0.25, dim * 0.8);
        w = r.random_int(dim * 0.25, dim * 0.8);
        h = r.random_int(dim * 0.25, dim * 0.8);
      } else if (startSide === 2) {
        x = r.random_int(dim * 0.25, dim * 0.8);
        y = 0;
        w = r.random_int(dim * 0.25, dim * 0.8);
        h = r.random_int(dim * 0.25, dim * 0.8);
      } else if (startSide === 3) {
        x = 1000;
        y = r.random_int(dim * 0.25, dim * 0.8);
        w = -r.random_int(dim * 0.25, dim);
        h = r.random_int(dim * 0.25, dim * 0.8);
      } else if (startSide === 4) {
        x = r.random_int(dim * 0.25, dim * 0.8);
        y = 1000;
        w = r.random_int(dim * 0.25, dim * 0.8);
        h = -r.random_int(dim * 0.25, dim);
      }
      console.log(x, y, w, h);
      const strokeW = r.random_choice([8]);

      for (let j = 0; j < 10; j++) {
        const color = palette.colors[r.random_int(0, palette.size - 1)];
        p.strokeWeight(strokeW);
        p.stroke(0);
        p.fill(color);
        p.rect(x, y, w, h, 10);
        if (startSide === 1) {
          y += strokeW * reso;
          w -= strokeW * reso;
        } else if (startSide === 2) {
          x += strokeW * reso;
          w += strokeW * reso;
        } else if (startSide === 3) {
          y += strokeW * reso;
          h += strokeW * reso;
        } else if (startSide === 4) {
          x += strokeW * reso;
          w += strokeW * reso;
        }
      }
    }

    displayBorder(p, 12);
  };

  return (
    <Page inverted={inverted}>
      <StyledRRLink to="/" inverted={inverted}>
        back to frontpage
      </StyledRRLink>
      <Title inverted={inverted}>unnamed project</Title>
      <Sketch setup={setup} draw={draw} />
    </Page>
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
