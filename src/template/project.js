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

const Title = styled.h1`
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
const palette = allPalettes[r.random_int(0, allPalettes.length - 1)];
const inverted = r.random_choice([0, 1]);

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

    p.background(inverted === 1 ? 0 : 255);
  };

  const draw = (p) => {
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
