import React from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import Sketch from "react-p5";
import Random, { random_hash } from "utils/random";
import { Colors } from "utils/constants";
import texturize from "utils/textureBg";
import initRndAndNoise from "utils";

import Palettes from "nice-color-palettes/1000";

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
console.log(seed);
const rnd = new Random(3389700042243998);

// DIMENSIONS
var DEFAULT_SIZE = 1000;
var width = window.innerWidth * 0.75;
var height = window.innerHeight * 0.75;
var dim = Math.min(width, height);
dim = 1000;

var m = dim / DEFAULT_SIZE;
var offset = 10 * m;

// PALETTE
let palette = Palettes[rnd.random_int(0, Palettes.length - 1)];
let paletteBg = Palettes[rnd.random_int(0, Palettes.length - 1)];
const bgColor = paletteBg[rnd.random_int(0, paletteBg.length - 1)];
//console.log(palette, bgColor, seed);

const RIDGE_TOP_COLOR = palette[rnd.random_int(0, palette.length - 1)];
const RIDGE_BOT_COLOR = palette[rnd.random_int(0, palette.length - 1)];

const layers = rnd.random_int(8, 10);
function Cordillera() {
  let { id } = useParams();
  console.log(id);
  const setup = (p, canvasParentRef) => {
    p.pixelDensity(1);
    p.createCanvas(dim, dim, p.SVG).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.noLoop();

    p.noiseSeed(3389700042243998);

    p.background(255);

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas("cordillera_" + tokenData.hash, "png");
    };
  };

  const draw = (p) => {
    p.noFill();
    const amp = rnd.random_between(150, 400);
    const zoom = rnd.random_between(0.001, 0.005);
    for (let l = 0; l < layers; l++) {
      const layerPosition = l * (dim / layers);
      drawRidge(p, l, layerPosition, amp, zoom);
    }
  };

  function drawRidge(p, l, y, amp, zoom) {
    p.fill(255);
    p.stroke(255);
    p.strokeWeight(10 * m);
    const vertices = [];
    p.beginShape();

    for (let x = 0; x <= dim; x += 4) {
      const scl = 250;
      const noisedY = p.noise(x * 0.002, y / m) * m;
      p.vertex(x * m, y - noisedY * scl);
      vertices.push([x * m, y - noisedY * scl]);
    }
    p.vertex(dim, dim);
    p.vertex(0, dim);
    p.endShape(p.CLOSE);

    /* const FILL = p.lerpColor(
      p.color(RIDGE_TOP_COLOR),
      p.color(RIDGE_BOT_COLOR),
      l / (layers - 1)
    );
    p.stroke(FILL); */

    /* if (l === 0) {
      p.stroke(p.color("#add4d3"));
    } else if (l === 1) {
      p.stroke(p.color("#add4d3"));
    } else if (l === 2) {
      p.stroke(p.color("#f56217"));
    } else if (l === 3) {
      p.stroke(p.color("#333237"));
    } else if (l === 4) {
      p.stroke(p.color("#333237"));
    } else if (l === 5) {
      p.stroke(p.color("#333237"));
    } else if (l === 6) {
      p.stroke(p.color("#00875e"));
    } else if (l === 7) {
      p.stroke(p.color("#00875e"));
    } else if (l === 8) {
      p.stroke(p.color("#7f440a"));
    } else if (l === 9) {
      p.stroke(p.color("#04394e"));
    } */
    p.stroke(p.color(palette[rnd.random_int(0, palette.length - 1)]));
    p.strokeWeight(1 * m);
    const direction = rnd.random_choice(["left", "straight", "right"]);
    let start, num;
    if (direction === "straight") {
      start = 0;
      num = 1;
    } else if (direction === "left") {
      start = 1;
      num = 1;
    } else if (direction === "right") {
      start = 0;
      num = 2;
    }
    const inc = rnd.random_between(0, 1) > 0.7;
    for (let j = start; j <= vertices.length - num; j += inc ? 2 : 1) {
      //if (rnd.random_between(0, 1) > 0.9) continue;
      if (direction === "right") {
        p.line(vertices[j][0], dim, vertices[j + 1][0], vertices[j + 1][1]);
      } else if (direction === "left") {
        p.line(vertices[j][0], dim, vertices[j - 1][0], vertices[j - 1][1]);
      } else if (direction === "straight") {
        p.line(vertices[j][0], dim, vertices[j][0], vertices[j][1]);
      }
    }
  }

  return (
    <Page>
      <StyledRRLink to="/">back to frontpage</StyledRRLink>
      <Info>
        <Title>cordillera</Title>
        <Date>03.05.2021</Date>
      </Info>
      <Sketch setup={setup} draw={draw} />
    </Page>
  );
}

export default Cordillera;
