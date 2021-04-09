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
  font-size: 2.5rem;
  color: ${(props) => (props.inverted ? "white" : "#3c3c3c")};
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
console.log(inverted);

var DEFAULT_SIZE = 1000;
var width = window.innerWidth * 0.75;
var height = window.innerHeight * 0.75;
var dim = Math.min(width, height);
var m = dim / DEFAULT_SIZE;
console.log(dim, m);

//const mastersColors = ["#1d5b2d", "#eeec1a", "#cd1b33"];

function Bubba() {
  const circles = [];
  const res = r.random_int(3, 4);
  const cols = res;
  const rows = res;

  const setup = (p, canvasParentRef) => {
    p.createCanvas(dim, dim, p.SVG).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.noLoop();
    /*    p.background(
      p.color(palette.background ? palette.background : palette.colors[0])
    ); */
    p.background(inverted === 1 ? 0 : 255);

    for (let i = 1; i < cols + 1; i++) {
      for (let j = 1; j < rows + 1; j++) {
        circles.push(
          new Pie(p, (i * dim) / (cols + 1), (j * dim) / (rows + 1))
        );
      }
    }
  };

  const draw = (p) => {
    for (let i = 0; i < cols * rows; i++) {
      circles[i].render();
    }

    displayBorder(p, 12);
  };

  class Pie {
    constructor(p, x, y) {
      this.p = p;
      this.x = x;
      this.y = y;
    }

    render() {
      const isPerfectCircle = r.random_between(0, 1) > 0.9 ? true : false;
      let traits;

      if (r.random_between(0, 1) < 0.9) {
        this.p.push();
        traits = this.getPieceTraits();
        this.p.noStroke();
        this.p.fill(this.p.color(traits[0]));
        this.renderArc(8, 0, traits, isPerfectCircle, 0, this.p.PI / 4);
        this.p.pop();
      }

      if (r.random_between(0, 1) < 0.9) {
        this.p.push();
        traits = this.getPieceTraits();
        this.p.noStroke();
        this.p.fill(this.p.color(traits[0]));
        this.renderArc(
          4,
          4,
          traits,
          isPerfectCircle,
          this.p.PI / 4,
          this.p.PI / 2
        );
        this.p.pop();
      }

      if (r.random_between(0, 1) < 0.9) {
        this.p.push();
        traits = this.getPieceTraits();
        this.p.noStroke();
        this.p.fill(this.p.color(traits[0]));
        this.renderArc(
          -2,
          3,
          traits,
          isPerfectCircle,
          this.p.PI / 2,
          (3 * this.p.PI) / 4
        );
        this.p.pop();
      }

      if (r.random_between(0, 1) < 0.9) {
        this.p.push();
        traits = this.getPieceTraits();
        this.p.noStroke();
        this.p.fill(this.p.color(traits[0]));
        this.renderArc(
          -6,
          0,
          traits,
          isPerfectCircle,
          (3 * this.p.PI) / 4,
          this.p.PI
        );
        this.p.pop();
      }

      if (r.random_between(0, 1) < 0.9) {
        this.p.push();
        traits = this.getPieceTraits();
        this.p.noStroke();
        this.p.fill(this.p.color(traits[0]));
        this.renderArc(
          -6,
          -6,
          traits,
          isPerfectCircle,
          this.p.PI,
          (5 * this.p.PI) / 4
        );
        this.p.pop();
      }

      if (r.random_between(0, 1) < 0.9) {
        this.p.push();
        traits = this.getPieceTraits();
        this.p.noStroke();
        this.p.fill(this.p.color(traits[0]));
        this.renderArc(
          -2,
          -10,
          traits,
          isPerfectCircle,
          (5 * this.p.PI) / 4,
          (3 * this.p.PI) / 2
        );
        this.p.pop();
      }

      if (r.random_between(0, 1) < 0.9) {
        this.p.push();
        traits = this.getPieceTraits();
        this.p.noStroke();
        this.p.fill(this.p.color(traits[0]));
        this.renderArc(
          4,
          -10,
          traits,
          isPerfectCircle,
          (3 * this.p.PI) / 2,
          (7 * this.p.PI) / 4
        );
        this.p.pop();
      }

      if (r.random_between(0, 1) < 0.9) {
        this.p.push();
        traits = this.getPieceTraits();
        this.p.noStroke();
        this.p.fill(this.p.color(traits[0]));
        this.renderArc(
          8,
          -6,
          traits,
          isPerfectCircle,
          (7 * this.p.PI) / 4,
          2 * this.p.PI
        );
        this.p.pop();
      }
    }

    renderArc(xoff, yoff, traits, isPerfectCircle, start, end) {
      this.p.arc(
        this.x + xoff,
        this.y + yoff,
        isPerfectCircle ? 128 * m : traits[1],
        isPerfectCircle ? 128 * m : traits[2],
        start,
        end,
        this.p.PIE
      );
    }

    getPieceTraits() {
      /*   let color;
      const rng = r.random_between(0, 1);
      if (rng > 0 && rng < 0.75) {
        color = mastersColors[0];
      } else if (rng > 0.75 && rng < 0.9) {
        color = mastersColors[1];
      } else {
        color = mastersColors[2];
      } */
      const color = palette.colors[r.random_int(0, palette.size - 1)];
      const width = r.random_int(128, 156) * m;
      const height = r.random_int(128, 156) * m;
      return [color, width, height];
    }
  }

  return (
    <Page inverted={inverted}>
      <StyledRRLink to="/" inverted={inverted}>
        back to frontpage
      </StyledRRLink>
      <Title inverted={inverted}>bubba</Title>
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

export default Bubba;
