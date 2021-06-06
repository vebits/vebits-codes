import React from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import Sketch from "react-p5";
import Random, { random_hash } from "utils/random";
import { Colors } from "utils/constants";
import { hex2hsl } from "utils/color-converter";

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

function Flow3() {
  let { id } = useParams();

  let seed, hash, tokenData;
  if (id) {
    hash = id;
  } else {
    tokenData = { hash: random_hash() };
    hash = tokenData.hash;
  }
  seed = parseInt(hash.slice(0, 16), 16);
  //const rnd = new Random(57629394378061160);
  const rnd = new Random(seed);
  console.log(seed);

  // DIMENSIONS
  var DEFAULT_SIZE = 1024;
  var width = window.innerWidth * 0.75;
  var height = window.innerHeight * 0.75;
  width = 1024;
  height = 1024;
  var dim = Math.min(width, height);
  var m = dim / DEFAULT_SIZE;

  // PALETTE
  let palette = Palettes[rnd.random_int(0, Palettes.length - 1)];

  // PDS
  var r = 20 * m;
  var k = 30;
  var w = r / Math.sqrt(2);

  const grid = [];
  const angleGrid = [];
  const active = [];
  const ordered = [];
  var cols, rows;
  let paletteCopy;

  let sizes = rnd.random_choice([
    [10, 14],
    [20, 24],
    [30, 44],
    [40, 54],
    [50, 64],
    [60, 74],
  ]);

  const setup = (p, canvasParentRef) => {
    p.pixelDensity(1);
    p.createCanvas(width, height, p.SVG).parent(canvasParentRef);
    p.noLoop();
    p.colorMode(p.HSL);

    paletteCopy = palette.slice();
    const bgColor = hex2hsl(paletteCopy.shift());
    p.background(p.color(bgColor[0]));

    p.noiseSeed(seed);

    initPDS(p);

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas("confetti_" + hash, "png");
    };
  };

  const draw = (p) => {
    p.noFill();
    pds(p);

    /* for (var f = 0; f < ordered.length; f++) {
      let x = ordered[f].x;
      let y = ordered[f].y;
      p.strokeWeight(3);
      p.point(x, y);
    } */

    /* for (let x = 0; x < angleGrid.length; x++) {
      for (let y = 0; y < angleGrid[x].length; y++) {
        p.stroke(0);
        p.push();
        p.translate(x * w, y * w);
        p.rotate(angleGrid[x][y]);
        p.line(0, 0, 10, 0);
        p.pop();
      }
    } */

    console.log(sizes);
    const ploy = drawFlowField(p);
    for (let i = 0; i < ploy.length; i++) {
      if (ploy[i].length < 10) {
        continue;
      }
      //p.stroke(p.color(palette[rnd.random_int(0, palette.length - 1)]));
      p.strokeCap(p.PROJECT);
      p.noStroke();
      for (let j = 0; j < ploy[i].length; j++) {
        /* p.strokeWeight(p.noise(i, j) * 30);
        p.curveVertex(ploy[i][j].x, ploy[i][j].x); */
        const column_index = p.int(ploy[i][j].x / w);
        const row_index = p.int(ploy[i][j].y / w);

        const grid_angle = angleGrid[column_index][row_index];

        if (rnd.random_between(0, 1) > 0.0) {
          //p.fill(255);
          p.push();
          p.translate(ploy[i][j].x, ploy[i][j].y);
          p.rotate(
            grid_angle + rnd.random_between(0, 0.2) * rnd.random_choice([-1, 1])
          );
          p.fill(
            p.color(paletteCopy[rnd.random_int(0, paletteCopy.length - 1)])
          );
          p.rect(0, 0, 4 * m, p.noise(grid_angle) * sizes[1] * m, 100);
          p.pop();
        }
      }
    }
  };

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  function drawFlowField(p) {
    const xy = [];
    shuffle(ordered);

    const polys = [];
    for (var f = 0; f < ordered.length; f++) {
      let x = ordered[f].x;
      let y = ordered[f].y;
      const currentpoly = [];
      loop1: for (let i = 0; i < 64; i++) {
        if (x < 64 || x > width - 64 || y < 64 || y > height - 64) {
          break;
        }
        for (let v = 0; v < xy.length; v++) {
          if (p.dist(x, y, xy[v].x, xy[v].y) < sizes[0] * m) {
            break loop1;
          }
        }

        currentpoly.push(new Point(x, y));

        const column_index = p.int(x / w);
        const row_index = p.int(y / w);

        const grid_angle = angleGrid[column_index][row_index];

        const x_step = width * 0.005 * p.cos(grid_angle);
        const y_step = height * 0.005 * p.sin(grid_angle);

        x += x_step;
        y += y_step;
      }
      currentpoly.forEach((v) => xy.push(v));
      polys.push(currentpoly);
    }
    return polys;
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
        const scaled_x = y * 0.008;
        const scaled_y = x * 0.008;

        //p.noiseDetail(2, 0.45);
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

  return (
    <>
      <Page>
        <StyledRRLink to="/">back to frontpage</StyledRRLink>
        <Info>
          <Title>confetti</Title>
          <Date>15.05.2021</Date>
        </Info>
        <Sketch setup={setup} draw={draw} />
      </Page>
      <Footer />
    </>
  );
}

export default Flow3;
