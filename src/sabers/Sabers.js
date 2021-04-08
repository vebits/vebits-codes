import React from "react";
import styled from "styled-components";
import Sketch from "react-p5";
import * as tome from "chromotome";
import Random from "utils/random";
import { random_hash } from "utils/random";

const Page = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64px 12px;
  background-color: ${(props) => (props.inverted ? "black" : "white")};
`;

const Title = styled.h2`
  font-size: 3.5rem;
  color: ${(props) => (props.inverted ? "white" : "#3c3c3c")};
  margin: 0;
  margin-bottom: 24px;
`;

const tokenData = { hash: random_hash() };
const seed = parseInt(tokenData.hash.slice(0, 16), 16);
//const r = new Random(41126607537855070);
const r = new Random(seed);
const width = 1024;
const height = 1024;
const allPalettes = tome.getAll();
const palette = allPalettes[r.random_int(0, allPalettes.length - 1)];
const inverted = r.random_choice([0, 1]);

function Sabers() {
  const setup = (p, canvasParentRef) => {
    p.createCanvas(width, height, p.SVG).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.angleMode(p.DEGREES);
    p.noLoop();

    p.push();
    p.background(inverted === 1 ? 0 : 255);
    p.pop();
  };

  const draw = (p) => {
    let y = 64;
    for (let i = 1; i < height; i++) {
      const x = r.random_between(64, width);
      drawLine(p, x, y);
      y += 10;
    }

    displayBorder(p, 24);
  };

  return (
    <Page inverted={inverted}>
      <Title inverted={inverted}>sabers</Title>
      <Sketch setup={setup} draw={draw} />
    </Page>
  );
}

function drawLine(p, x, y) {
  const color = palette.colors[p.floor(r.random_between(0, palette.size))];
  p.stroke(color);
  p.strokeWeight(r.random_between(4, 8));
  p.strokeCap(p.ROUND);
  const x2 = x + r.random_between(12, 128);
  if (x2 < width - 64 && y < height - 64) {
    p.line(x, y, x2, y);
  }
}

function displayBorder(p, e) {
  p.fill(inverted === 1 ? 255 : 0);
  p.stroke(inverted === 1 ? 255 : 0);
  p.strokeJoin(p.MITER);
  p.beginShape();
  p.vertex(0, 0);
  p.vertex(width, 0);
  p.vertex(width, height);
  p.vertex(0, height);
  p.beginContour();
  p.vertex(e, e);
  p.vertex(e, height - e);
  p.vertex(width - e, height - e);
  p.vertex(width - e, e);
  p.endContour();
  p.endShape(p.CLOSE);
}

export default Sabers;
