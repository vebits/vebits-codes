import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import Sketch from "react-p5";
import Random, { random_hash } from "utils/random";
import { Colors } from "utils/constants";

import Palettes from "nice-color-palettes/1000";
import Footer from "Footer";

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
//const rnd = new Random(57629394378061160);
const rnd = new Random(seed);

// DIMENSIONS
var DEFAULT_SIZE = 1000;
var width = window.innerWidth * 0.75;
var height = window.innerHeight * 0.75;
/* width = 7700;
height = 5230; */
width = 1000;
height = 1000;
//var dim = Math.min(width, height);
var m = height / DEFAULT_SIZE;

// PALETTE
let palette = Palettes[rnd.random_int(0, Palettes.length - 1)];
let paletteBg = Palettes[rnd.random_int(0, Palettes.length - 1)];
const bgColor = paletteBg[rnd.random_int(0, paletteBg.length - 1)];
console.log(palette, bgColor, seed);

// PDS
var r = 4 * m;
var k = 30;
var w = r / Math.sqrt(2);

const grid = [];
const angleGrid = [];
const active = [];
const ordered = [];
var cols, rows;

function Flow2() {
  const setup = (p, canvasParentRef) => {
    p.pixelDensity(1);
    p.createCanvas(width, height, p.SVG).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.noLoop();
    //p.background(p.color("#FCC9B9"));
    p.background(255);
    p.noiseSeed(seed);
    //p.noiseSeed(57629394378061160);

    initPDS(p);
  };

  const draw = (p) => {
    p.noFill();
    pds(p);

    /* for (var f = 0; f < ordered.length; f++) {
      let x = ordered[f].x;
      let y = ordered[f].y;
      p.strokeWeight(3);
      p.point(x, y);
    }

    for (let x = 0; x < angleGrid.length; x++) {
      for (let y = 0; y < angleGrid[x].length; y++) {
        p.stroke(0);
        p.push();
        p.translate(x * w, y * w);
        p.rotate(angleGrid[x][y]);
        p.line(0, 0, 10, 0);
        p.pop();
      }
    } */

    //drawFlowField(p);
    //displayBorder(p, 12);
  };

  return (
    <>
      <Page>
        <StyledRRLink to="/">back to frontpage</StyledRRLink>
        <Info>
          <Title>flow 2</Title>
          <Date>26.04.2021</Date>
        </Info>
        <Sketch setup={setup} draw={draw} />
      </Page>
      <Footer />
    </>
  );
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function drawFlowField(p) {
  const xy = [];
  shuffle(ordered);
  let vertical = 0;
  for (var f = 0; f < ordered.length; f++) {
    const currentline = [];
    let x = ordered[f].x;
    let y = ordered[f].y;

    p.beginShape();
    //p.stroke(p.color(palette[rnd.random_int(0, palette.length - 1)]));
    //p.stroke(255);

    if (vertical) {
      if (y > 0 && y < (height / 5) * 1) {
        p.stroke(p.color("#F08F90"));
      } else if (y > (height / 5) * 1 && y < (height / 5) * 2) {
        p.stroke(p.color("#F2666C"));
      } else if (y > (height / 5) * 2 && y < (height / 5) * 3) {
        p.stroke(p.color("#DB5A6B"));
      } else if (y > (height / 5) * 3 && y < (height / 5) * 4) {
        p.stroke(p.color("#F2666C"));
      } else if (y > (height / 5) * 4 && y < (height / 5) * 5) {
        p.stroke(p.color("#F08F90"));
      }
    } else {
      if (x > 0 && x < (width / 5) * 1) {
        p.stroke(p.color("#F08F90"));
      } else if (x > (width / 5) * 1 && x < (width / 5) * 2) {
        p.stroke(p.color("#F2666C"));
      } else if (x > (width / 5) * 2 && x < (width / 5) * 3) {
        p.stroke(p.color("#DB5A6B"));
      } else if (x > (width / 5) * 3 && x < (width / 5) * 4) {
        p.stroke(p.color("#F2666C"));
      } else if (x > (width / 5) * 4 && x < (width / 5) * 5) {
        p.stroke(p.color("#F08F90"));
      }
    }

    p.strokeWeight(8 * m);

    const right = rnd.random_int(0, 1);
    let xDirRight, yDirRight;
    if (vertical) {
      if (y > 0 && y < (height / 5) * 1) {
        xDirRight = false;
        yDirRight = false;
      } else if (y > (height / 5) * 1 && y < (height / 5) * 2) {
        xDirRight = false;
        yDirRight = false;
      } else if (y > (height / 5) * 2 && y < (height / 5) * 3) {
        if (right) {
          xDirRight = true;
          yDirRight = true;
        } else {
          xDirRight = false;
          yDirRight = false;
        }
      } else if (y > (height / 5) * 3 && y < (height / 5) * 4) {
        xDirRight = false;
        yDirRight = true;
      } else if (y > (height / 5) * 4 && y < (height / 5) * 5) {
        xDirRight = false;
        yDirRight = true;
      }
    } else {
      if (x > 0 && x < (width / 5) * 1) {
        xDirRight = true;
        yDirRight = true;
      } else if (x > (width / 5) * 1 && x < (width / 5) * 2) {
        xDirRight = true;
        yDirRight = true;
      } else if (x > (width / 5) * 2 && x < (width / 5) * 3) {
        if (right) {
          xDirRight = true;
          yDirRight = true;
        } else {
          xDirRight = false;
          yDirRight = false;
        }
      } else if (x > (width / 5) * 3 && x < (width / 5) * 4) {
        xDirRight = false;
        yDirRight = false;
      } else if (x > (width / 5) * 4 && x < (width / 5) * 5) {
        xDirRight = false;
        yDirRight = false;
      }
    }

    loop1: for (let i = 0; i < 10 * m; i++) {
      if (
        x < 32 * m ||
        x > width - 32 * m ||
        y < 32 * m ||
        y > height - 32 * m
      ) {
        break;
      }

      for (let v = 0; v < xy.length; v++) {
        if (p.dist(x, y, xy[v].x, xy[v].y) < 10 * m) {
          break loop1;
        }
      }

      currentline.push(new Point(x, y));

      p.vertex(x, y);

      const column_index = p.int(x / w);
      const row_index = p.int(y / w);

      const grid_angle = angleGrid[column_index][row_index];

      const x_step = width * 0.005 * p.cos(grid_angle);
      const y_step = height * 0.005 * p.sin(grid_angle);

      if (xDirRight && yDirRight) {
        x += x_step;
        y += y_step;
      } else {
        x -= x_step;
        y -= y_step;
      }
      /* x += x_step;
      y += y_step; */
    }
    p.endShape();

    currentline.forEach((v) => xy.push(v));
  }
}

function initPDS(p) {
  cols = p.floor(width / w);
  rows = p.floor(height / w);
  for (let i = 0; i < cols * rows; i++) {
    grid[i] = undefined;
  }

  for (let x = 0; x < cols + 1; x++) {
    angleGrid.push([]);
    for (let y = 0; y < rows + 1; y++) {
      const scaled_x = y * 0.005;
      const scaled_y = x * 0.005;

      p.noiseDetail(2, 0.45);
      const noise_val = p.noise(scaled_x, scaled_y);
      const angle = p.map(noise_val, 0.0, 1.0, 0.0, 2 * p.PI);

      angleGrid[x].push(angle);
    }
  }

  let x = 0;
  let y = 0;
  let i = p.floor(x / w);
  let j = p.floor(y / w);
  let pos = p.createVector(x, y);
  grid[i + j * cols] = pos;
  active.push(pos);
}

function pds(p) {
  while (active.length > 0) {
    var randIndex = p.floor(rnd.random_between(0, active.length));
    var pos = active[randIndex];
    var found = false;
    for (var n = 0; n < k; n++) {
      var sample = window.p5.Vector.fromAngle(
        rnd.random_between(0, 1) * 2 * p.PI
      );
      //var sample = window.p5.Vector.random2D();
      var m = rnd.random_between(r, 2 * r);
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
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(rnd.random_between(0, 1) * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/* function displayBorder(p, e) {
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
} */

export default Flow2;
