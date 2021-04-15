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

const Title = styled.h2`
  font-size: 3.5rem;
  color: ${Colors.palette.five};
  margin: 0;
  margin-bottom: 24px;
`;

const tokenData = { hash: random_hash() };
const seed = parseInt(tokenData.hash.slice(0, 16), 16);
//const r = new Random(41126607537855070);
const r = new Random(seed);
const allPalettes = tome.getAll();
const palette = allPalettes[r.random_int(0, allPalettes.length - 1)];

var DEFAULT_SIZE = 1000;
var width = window.innerWidth * 0.75;
var height = window.innerHeight * 0.75;
var dim = Math.min(width, height);
var m = dim / DEFAULT_SIZE;
const res = Math.floor(dim * 0.01);
const left_x = Math.floor(dim * -0.5);
const right_x = Math.floor(dim * 1.5);
const top_y = Math.floor(dim * -0.5);
const bottom_y = Math.floor(dim * 1.5);
const num_columns = (right_x - left_x) / res;
const num_rows = (bottom_y - top_y) / res;

function Project() {
  const grid = [];

  const setup = (p, canvasParentRef) => {
    p.createCanvas(dim, dim, p.SVG).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.noLoop();

    p.background(255);

    for (let y = 0; y < num_columns; y++) {
      grid.push([]);
      for (let x = 0; x < num_rows; x++) {
        const scaled_x = y * 0.01;
        const scaled_y = x * 0.01;

        const noise_val = p.noise(scaled_x, scaled_y);

        //onst defaultAngle = (x / p.float(num_rows)) * p.PI;
        const angle = p.map(noise_val, 0.0, 1.0, 0.0, p.PI * 2.0);

        grid[y].push(angle);
      }
    }
  };

  const draw = (p) => {
    p.noFill();

    /* for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        p.stroke(0);
        p.push();
        p.translate(x * res + left_x, y * res + top_y);
        p.rotate(grid[x][y]);
        p.line(0, 0, 10, 0);
        p.pop();
      }
    } */

    for (let z = 0; z < 10000; z++) {
      let x = p.random(-500, 1500);
      let y = p.random(-500, 1500);

      p.beginShape();
      //const num_steps = r.random_between(0, 1000);
      for (let i = 0; i < 50 * m; i++) {
        p.stroke(palette.colors[r.random_int(0, palette.size - 1)]);

        p.strokeWeight(3);
        p.vertex(x, y);

        const xoff = x - left_x;
        const yoff = y - top_y;

        const column_index = p.int(xoff / res);
        const row_index = p.int(yoff / res);

        if (
          column_index < 0 ||
          column_index > num_columns - 1 ||
          row_index < 0 ||
          row_index > num_rows - 1
        ) {
          continue;
        }

        const grid_angle = grid[column_index][row_index];

        const x_step = dim * 0.005 * p.cos(grid_angle);
        const y_step = dim * 0.005 * p.sin(grid_angle);

        x += x_step;
        y += y_step;
      }
      p.endShape();
    }

    displayBorder(p, 12);
  };

  return (
    <Page>
      <StyledRRLink to="/">back to frontpage</StyledRRLink>
      <Title>brush</Title>
      <Sketch setup={setup} draw={draw} />
    </Page>
  );
}

function displayBorder(p, e) {
  p.fill(0);
  p.stroke(0);
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
