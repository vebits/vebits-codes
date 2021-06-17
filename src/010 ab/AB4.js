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
  var w = r / Math.sqrt(2);

  const angleGrid = [];

  var cols, rows;
  let paletteCopy;

  const setup = (p, canvasParentRef) => {
    p.pixelDensity(1);
    p.createCanvas(width, height, p.SVG).parent(canvasParentRef);
    p.noLoop();
    p.colorMode(p.HSL);

    paletteCopy = palette.slice();
    const bgColor = hex2hsl(paletteCopy.shift());
    //p.background(p.color(bgColor[0]));
    p.background(90);

    p.noiseSeed(seed);

    initPDS(p);

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas("confetti_" + hash, "png");
    };
  };

  const draw = (p) => {
    p.noFill();
    //pds(p);

    /* for (var f = 0; f < ordered.length; f++) {
      let x = ordered[f].x;
      let y = ordered[f].y;
      p.strokeWeight(3);
      p.point(x, y);
    } */

    /* for (let x = 0; x < angleGrid.length; x++) {
      for (let y = 0; y < angleGrid[x].length; y++) {
        console.log(angleGrid[x][y]);
        p.stroke(0);
        p.push();
        p.translate(x * w, y * w);
        p.rotate(angleGrid[x][y]);
        p.line(0, 0, 10, 0);
        p.pop();
      }
    }
 */
    const ploy = drawFlowField(p);
    console.log(ploy);
    if (rnd.random_int(0, 1)) {
      p.stroke(0);
    } else {
      p.noStroke();
    }
    for (let i = 0; i < ploy.length; i++) {
      if (ploy[i].length < 64) {
        continue;
      }
      const color = p.color(palette[rnd.random_int(0, palette.length - 1)]);

      if (rnd.random_int(0, 1)) {
        color.setAlpha(0.1);
      }

      if (rnd.random_between(0, 1) > 0.2) {
        p.fill(color);
      } else {
        p.noFill();
      }
      p.strokeWeight(1 * m);
      p.beginShape();
      //p.vertex(0, dim + 10);
      for (let j = 0; j < ploy[i].length; j++) {
        p.vertex(ploy[i][j].x, ploy[i][j].y);
      }
      //p.vertex(dim - 64, 64);
      //p.vertex(dim - 64, dim - 64);
      //p.vertex(64, dim - 64);
      p.vertex(dim, dim);
      p.vertex(0, dim);
      p.endShape(p.CLOSE);
    }
  };

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  function drawFlowField(p) {
    const polys = [];
    const density = rnd.random_int(1, 64);
    const margin = rnd.random_choice([1]);
    console.log(density, margin);
    for (var a = margin; a < height; a += density) {
      let x = 1;
      let y = a;
      console.log(x, y);
      const currentpoly = [];
      loop1: for (let i = 0; i < width; i++) {
        /* if (y < margin) {
          
          break;
        } */
        currentpoly.push(new Point(x, y));
        if (
          x < margin ||
          x > width - margin ||
          y < margin ||
          y > height - margin
        ) {
          break;
        }
        /* for (let v = 0; v < xy.length; v++) {
          if (p.dist(x, y, xy[v].x, xy[v].y) < sizes[0] * m) {
            break loop1;
          }
        } */

        const column_index = p.int(x / w);
        const row_index = p.int(y / w);

        const grid_angle = angleGrid[column_index][row_index];

        const x_step = width * 0.001 * p.cos(grid_angle);
        const y_step = height * 0.001 * p.sin(grid_angle);

        x -= x_step;
        y -= y_step;
      }
      polys.push(currentpoly);
    }
    return polys;
  }

  function initPDS(p) {
    cols = p.floor(width / w);
    rows = p.floor(height / w);

    for (let x = 0; x < cols + 1; x++) {
      angleGrid.push([]);
      for (let y = 0; y < rows + 1; y++) {
        const scaled_x = y * 0.1;
        const scaled_y = x * 0.1;

        //p.noiseDetail(2, 0.45);
        const noise_val = p.noise(scaled_x, scaled_y);
        const angle = p.map(noise_val, 0.0, 1.0, (3 / 2) * p.PI, p.PI / 2);

        angleGrid[x].push(angle);
      }
    }
  }
  return <Sketch setup={setup} draw={draw} />;
}

export default Flow3;
