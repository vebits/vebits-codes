import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import Sketch from "react-p5";
//import * as tome from "chromotome";
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
  //background-color: ${(props) => (props.inverted ? "black" : "white")};
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

const Title = styled.h1`
  font-size: 3.5rem;
  color: ${Colors.palette.five};
  margin: 0;
  margin-bottom: 24px;
`;

/* const colors = [
  "#89C2D9",
  "#61A5C2",
  "#468FAF",
  "#2C7DA0",
  "#2A6F97",
  "#014F86",
  "#01497C",
  "#013A63",
  "#012A4A",
];
const colors2 = [
  "#EAE4E9",
  "#FFF1E6",
  "#FDE2E4",
  "#FAD2E1",
  "#E2ECE9",
  "#BEE1E6",
  "#F0EFEB",
  "#DFE7FD",
  "#CDDAFD",
]; */
const colors3 = [
  "#D9ED92",
  "#B5E48C",
  "#99D98C",
  "#76C893",
  "#52B69A",
  "#34A0A4",
  "#168AAD",
  "#1A759F",
  "#1E6091",
  "#184E77",
];

const tokenData = { hash: random_hash() };
const seed = parseInt(tokenData.hash.slice(0, 16), 16);
//const r = new Random(41126607537855070);
const rnd = new Random(seed);

//var DEFAULT_SIZE = 1000;

//var m = dim / DEFAULT_SIZE;
//const res = Math.floor(dim * 0.01);
//const num_columns = dim / res;
//const num_rows = dim / res;

var DEFAULT_SIZE = 1000;
var width = window.innerWidth * 0.75;
var height = window.innerHeight * 0.75;
var dim = Math.min(width, height);
var m = dim / DEFAULT_SIZE;

var r = 10;
var k = 30;
var w = r / Math.sqrt(2);

const angleGrid = [];
const grid = [];
const active = [];
const ordered = [];
var cols, rows;

function Project() {
  const setup = (p, canvasParentRef) => {
    p.createCanvas(dim, dim, p.SVG).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.noLoop();
    p.background(255);

    // STEP 0
    cols = p.floor(dim / w);
    rows = p.floor(dim / w);
    for (let i = 0; i < cols * rows; i++) {
      grid[i] = undefined;
    }

    for (let x = 0; x < cols; x++) {
      angleGrid.push([]);
      for (let y = 0; y < rows; y++) {
        const scaled_x = y * 0.02;
        const scaled_y = x * 0.02;

        const noise_val = p.noise(scaled_x, scaled_y);
        const angle = p.map(noise_val, 0.0, 1.0, 0.0, p.PI * 2.0);

        angleGrid[x].push(angle);
      }
    }

    // STEP 1
    let x = 0;
    let y = 0;
    let i = p.floor(x / w);
    let j = p.floor(y / w);
    let pos = p.createVector(x, y);
    grid[i + j * cols] = pos;
    active.push(pos);
  };

  const draw = (p) => {
    p.noFill();

    while (active.length > 0) {
      var randIndex = p.floor(p.random(active.length));
      var pos = active[randIndex];
      var found = false;
      for (var n = 0; n < k; n++) {
        var sample = window.p5.Vector.random2D();
        var m = p.random(r, 2 * r);
        sample.setMag(m);
        sample.add(pos);

        var col = p.floor(sample.x / w);
        var row = p.floor(sample.y / w);

        if (
          col > -1 &&
          row > -1 &&
          col < cols &&
          row < rows &&
          !grid[col + row * cols]
        ) {
          var ok = true;
          for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
              var index = col + i + (row + j) * cols;
              var neighbor = grid[index];
              if (neighbor) {
                var d = window.p5.Vector.dist(sample, neighbor);
                if (d < r) {
                  ok = false;
                }
              }
            }
          }
          if (ok) {
            found = true;
            grid[col + row * cols] = sample;
            active.push(sample);
            ordered.push(sample);
            // Should we break?
            break;
          }
        }
      }

      if (!found) {
        active.splice(randIndex, 1);
      }
    }

    for (var f = 0; f < ordered.length; f++) {
      let x = ordered[f].x;
      let y = ordered[f].y;
      p.beginShape();
      //onst num_steps = rnd.random_between(0, 3);
      if (y > 0 && y < 200) {
        p.stroke(rnd.random_int(0, 1) === 1 ? colors3[0] : colors3[1]);
      } else if (y > 200 && y < 400) {
        p.stroke(rnd.random_int(0, 1) === 1 ? colors3[2] : colors3[3]);
      } else if (y > 400 && y < 600) {
        p.stroke(rnd.random_int(0, 1) === 1 ? colors3[4] : colors3[5]);
      } else if (y > 600 && y < 800) {
        p.stroke(rnd.random_int(0, 1) === 1 ? colors3[6] : colors3[7]);
      } else if (y > 800 && y < 1000) {
        p.stroke(rnd.random_int(0, 1) === 1 ? colors3[8] : colors3[9]);
      }

      for (let i = 0; i < 10; i++) {
        p.strokeWeight(3);
        p.vertex(x, y);

        const column_index = p.int(x / w);
        const row_index = p.int(y / w);

        if (
          column_index < 0 ||
          column_index > cols - 1 ||
          row_index < 0 ||
          row_index > rows - 1
        ) {
          break;
        }

        const grid_angle = angleGrid[column_index][row_index];

        const x_step = dim * 0.001 * p.cos(grid_angle);
        const y_step = dim * 0.001 * p.sin(grid_angle);

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
      <Title>unnamed project</Title>
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
