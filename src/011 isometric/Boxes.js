import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import Sketch from "react-p5";
import Random, { random_hash } from "utils/random";
import { Colors } from "utils/constants";
import { hex2hsl } from "utils/color-converter";
import texturize from "utils/textureBg";

import Palettes from "nice-color-palettes/1000";
/* import paperColors from "paper-colors"; */
import shuffle from "utils/shuffle";

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
let seed = parseInt(tokenData.hash.slice(0, 16), 16);
//seed = 45389777725926400; //["#a43935", "#771916", "#e2daca"] ["#5e7b75", "#3f615a", "#f0ede6"] ["#e8c064", "#e8b643", "#eae6d9"]
const rnd = new Random(seed);

// DIMENSIONS
let DEFAULT_SIZE = 1024; // kan endre mengde her!!
let width, height;
if (window.innerHeight >= 1.5 * window.innerWidth) {
  width = window.innerWidth;
  height = 1.5 * window.innerWidth;
} else {
  height = window.innerHeight;
  width = window.innerHeight / 1.5;
}
/* const windowMargin = 0.75;
width = width * windowMargin;
height = height * windowMargin; */
/* height = window.innerHeight;
width = height * 1.5; */

var dim = Math.min(width, height);
var m = dim / DEFAULT_SIZE;

// PALETTE
let palette = Palettes[rnd.random_int(0, Palettes.length - 1)];
let paletteBg = Palettes[rnd.random_int(0, Palettes.length - 1)];
const bgColor = paletteBg[rnd.random_int(0, paletteBg.length - 1)];
const borderColor = paletteBg[rnd.random_int(0, paletteBg.length - 1)];

const cell_w = 16 * m;
const cell_h = 8 * m;
const mid_w = width / 2;
const mid_h = height / 2;

let paperColors = [
  {
    name: "Pink",
    hex: "#2B2E4A",
    brand: "Springhill Opaque",
  },
  {
    name: "Canary",
    hex: "#E84545",
    brand: "Springhill Opaque",
  },
  {
    name: "Orchid",
    hex: "#903749",
    brand: "Springhill Opaque",
  },
  {
    name: "Pastel Green",
    hex: "#53354A",
    brand: "Springhill Opaque",
  },
  {
    name: "Pastel Blue",
    hex: "#F67280",
    brand: "Springhill Opaque",
  },
  {
    name: "Ivory",
    hex: "#C06C84",
    brand: "Springhill Opaque",
  },
  {
    name: "Tan",
    hex: "#6C5B7B",
    brand: "Springhill Opaque",
  },
  {
    name: "Warm White",
    hex: "#355C7D",
    brand: "Mohawk VIA Vellum",
  },
  {
    name: "Bright White",
    hex: "#efedf6",
    brand: "Mohawk VIA Vellum",
  },
  {
    name: "White",
    hex: "#e1dce9",
    brand: "Rolland Enviro Copy",
  },
  {
    name: "Gray",
    hex: "#cdcad5",
    brand: "Earthchoice",
  },
  {
    name: "Bright White",
    hex: "#f2f2f2",
    brand: "Hahnemühle Photo Rag",
  },
];

// seeds: 37930565674235220 37164958221039304 54336704747254100
// mono: bg: 77, rest black and white
function Boxes() {
  const setup = (p, canvasParentRef) => {
    p.pixelDensity(1);
    p.createCanvas(width, height, p.SVG).parent(canvasParentRef);
    p.noLoop();
    p.colorMode(p.HSL);

    p.background(hex2hsl("#f4f0e7")[0]); //"#ffcd57"

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas("cassettes_" + seed, "png");
    };
  };

  const draw = (p) => {
    //generateGrid(p);
    //drawLines(p);
    shuffle(paperColors, rnd);
    const black = false;
    let i = 0;
    for (let y = 0 * m; y < height - 0 * m; y += cell_h * 2) {
      for (let x = 0 * m; x < width - 0 * m; x += cell_w * 2) {
        i++;
        if (rnd.random_dec() > 0.3) {
          /* drawWall2(
            p,
            x + rnd.random_int(0, 2) * cell_w * rnd.random_choice([-1, 1]),
            y,
            rnd.random_choice([1, 2, 4]),
            rnd.random_choice([1, 2, 4, 6, 8]),
            rnd.random_choice([1, 2, 4]),
            p.color(hex2hsl(paperColors[i % 12].hex)[0]),
            p.color(hex2hsl(paperColors[i % 12].hex)[0]),
            p.color(hex2hsl(paperColors[i % 12].hex)[0])
          ); */
        } else {
          drawWall(
            p,
            x + rnd.random_int(0, 2) * cell_w * rnd.random_choice([-1, 1]),
            y,
            rnd.random_choice([1, 2, 4, 8]),
            rnd.random_choice([1, 2, 4, 6, 8]),
            rnd.random_choice([1, 2, 4]),
            p.color(hex2hsl(paperColors[i % 12].hex)[0]),
            p.color("#fff"),
            p.color(hex2hsl(paperColors[i % 12].hex)[0])
          );
        }
      }
    }
    i = 0;
    /* for (let y = 600; y < height - 200; y += cell_h) {
      for (let x = 0; x < width; x += cell_w) {
        i++;
        drawWall(
          p,
          x + rnd.random_int(0, 2) * cell_w * rnd.random_choice([-1, 1]),
          y,
          rnd.random_choice([1, 2, 4]),
          rnd.random_choice([1, 2, 4, 6, 8]),
          rnd.random_choice([1, 2, 4]),
          p.color(hex2hsl(paperColors[i % 12].hex)[0]),
          p.color(hex2hsl(paperColors[i % 12].hex)[0]),
          p.color(hex2hsl(paperColors[i % 12].hex)[0])
        );
      }
    } */

    displayBorder(p, 32 * m, hex2hsl("#f4f0e7")[0]);
    /*  drawWall2(
      p,
      mid_w,
      mid_h,
      rnd.random_choice([5]),
      rnd.random_choice([5]),
      rnd.random_choice([5]),
      hex2hsl("#000000")[0],
      42,
      86
    ); */
  };

  function drawWall2(p, x, y, height, width, depth, shade1, shade2, shade3) {
    p.strokeJoin(p.ROUND);
    p.strokeWeight(1 * m);

    shade1.setAlpha(rnd.random_between(0.5, 1));
    shade2.setAlpha(rnd.random_between(0.5, 1));
    shade3.setAlpha(rnd.random_between(0.5, 1));

    // draw top
    p.fill(shade1);
    p.stroke(hex2hsl("#333533")[0]);
    p.stroke(shade1);
    p.quad(
      x,
      y - cell_h * height,
      x + (cell_w / 2) * width,
      y - cell_h * height - (cell_h / 2) * width,
      x + (cell_w / 2) * width + (cell_w / 2) * depth,
      y - cell_h * height - (cell_h / 2) * width + (cell_h / 2) * depth,
      x + (cell_w / 2) * depth,
      y - cell_h * height + (cell_h / 2) * depth
    );

    // draw left side
    p.fill(shade2);
    p.stroke(shade2);
    p.quad(
      x,
      y,
      x,
      y - cell_h * height,
      x + (cell_w / 2) * depth,
      y - cell_h * height + +(cell_h / 2) * depth,
      x + (cell_w / 2) * depth,
      y + (cell_h / 2) * depth
    );

    // draw right side
    p.fill(shade3);
    p.stroke(shade3);
    p.quad(
      x + (cell_w / 2) * depth,
      y + (cell_h / 2) * depth,
      x + (cell_w / 2) * depth,
      y - cell_h * height + (cell_h / 2) * depth,
      x + (cell_w / 2) * width + (cell_w / 2) * depth,
      y - cell_h * height - (cell_h / 2) * width + (cell_h / 2) * depth,
      x + (cell_w / 2) * width + (cell_w / 2) * depth,
      y - (cell_h / 2) * width + (cell_h / 2) * depth
    );

    /* p.stroke(shade1);
    p.strokeWeight(1);
    for (let i = 0; i < height * 8; i++) {
      p.line(
        x,
        y - (cell_h * i) / 8,
        x + cell_w / 2,
        y - (cell_h * i) / 8 + cell_h / 2
      );
    } */
  }

  function drawWall(p, x, y, height, width, depth, shade1, shade2, shade3) {
    p.strokeJoin(p.ROUND);
    p.strokeWeight(2 * m);

    // draw top

    p.noStroke();
    p.strokeWeight(2 * m);
    const color = shade1;

    p.stroke(hex2hsl("#333533")[0]);

    const side = rnd.random_int(1, 3);
    if (rnd.random_between(0, 1) > 0) {
      p.fill(hex2hsl("#f4f0e7")[0]);
      p.quad(
        x,
        y - cell_h * height,
        x + (cell_w / 2) * width,
        y - cell_h * height - (cell_h / 2) * width,
        x + cell_w / 2 + (cell_w / 2) * width,
        y - cell_h * height - (cell_h / 2) * width + cell_h / 2,
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * height
      );

      p.quad(
        x,
        y - cell_h * height,
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * height,
        x + cell_w / 2,
        y + cell_h / 2,
        x,
        y
      );

      p.quad(
        x + cell_w / 2,
        y + cell_h / 2,
        x + (cell_w / 2) * width + cell_w / 2,
        y - (cell_h / 2) * width + cell_h / 2,
        x + (cell_w / 2) * width + cell_w / 2,
        y - cell_h * height - (cell_h / 2) * width + cell_h / 2,
        x + cell_w / 2,
        y - cell_h * height + cell_h / 2
      );
      p.fill(color);
      if (side === 1) {
        p.quad(
          x,
          y - cell_h * height,
          x + (cell_w / 2) * width,
          y - cell_h * height - (cell_h / 2) * width,
          x + cell_w / 2 + (cell_w / 2) * width,
          y - cell_h * height - (cell_h / 2) * width + cell_h / 2,
          x + cell_w / 2,
          y + cell_h / 2 - cell_h * height
        );
        p.quad(
          x,
          y - cell_h * height,
          x + cell_w / 2,
          y + cell_h / 2 - cell_h * height,
          x + cell_w / 2,
          y + cell_h / 2,
          x,
          y
        );
      }
      if (side === 2) {
        p.quad(
          x,
          y - cell_h * height,
          x + (cell_w / 2) * width,
          y - cell_h * height - (cell_h / 2) * width,
          x + cell_w / 2 + (cell_w / 2) * width,
          y - cell_h * height - (cell_h / 2) * width + cell_h / 2,
          x + cell_w / 2,
          y + cell_h / 2 - cell_h * height
        );
        p.quad(
          x + cell_w / 2,
          y + cell_h / 2,
          x + (cell_w / 2) * width + cell_w / 2,
          y - (cell_h / 2) * width + cell_h / 2,
          x + (cell_w / 2) * width + cell_w / 2,
          y - cell_h * height - (cell_h / 2) * width + cell_h / 2,
          x + cell_w / 2,
          y - cell_h * height + cell_h / 2
        );
      }
      if (side === 3) {
        p.quad(
          x,
          y - cell_h * height,
          x + cell_w / 2,
          y + cell_h / 2 - cell_h * height,
          x + cell_w / 2,
          y + cell_h / 2,
          x,
          y
        );
        p.quad(
          x + cell_w / 2,
          y + cell_h / 2,
          x + (cell_w / 2) * width + cell_w / 2,
          y - (cell_h / 2) * width + cell_h / 2,
          x + (cell_w / 2) * width + cell_w / 2,
          y - cell_h * height - (cell_h / 2) * width + cell_h / 2,
          x + cell_w / 2,
          y - cell_h * height + cell_h / 2
        );
      }
      /* p.stroke(100);
      if (side === 4) {
        for (let i = 1; i < height * 8; i++) {
          p.line(
            x,
            y - (cell_h * i) / 8,
            x + cell_w / 2,
            y - (cell_h * i) / 8 + cell_h / 2
          );
        }
      }
      if (side === 5) {
        for (let i = 1; i < height * 8; i++) {
          p.line(
            x + cell_w / 2,
            y - (cell_h * i) / 8 + cell_h / 2,
            x + cell_w - cell_w / 4,
            y - (cell_h * i) / 8 + cell_h / 2 - 8
          );
        }
      } */
    }
    /* p.stroke(hex2hsl("#333533")[0]);
    if (rnd.random_between(0, 1) > 0.3 && side !== 1)
      p.line(
        x,
        y - cell_h * height,
        x + (cell_w / 2) * width,
        y - cell_h * height - (cell_h / 2) * width
      );
    if (rnd.random_between(0, 1) > 0.3 && side !== 1)
      p.line(
        x + (cell_w / 2) * width,
        y - cell_h * height - (cell_h / 2) * width,
        x + cell_w / 2 + (cell_w / 2) * width,
        y - cell_h * height - (cell_h / 2) * width + cell_h / 2
      );
    if (rnd.random_between(0, 1) > 0.3 && side === 2)
      p.line(
        x + cell_w / 2 + (cell_w / 2) * width,
        y - cell_h * height - (cell_h / 2) * width + cell_h / 2,
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * height
      );
    if (rnd.random_between(0, 1) > 0.3 && side === 3) {
      console.log(side, "here");
      p.line(
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * height,
        x,
        y - cell_h * height
      );
    }

    if (rnd.random_between(0, 1) > 0.3 && side === 1)
      p.line(
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * height,
        x + cell_w / 2,
        y + cell_h / 2
      );
    if (rnd.random_between(0, 1) > 0.3 && side !== 2)
      p.line(x + cell_w / 2, y + cell_h / 2, x, y);
    if (rnd.random_between(0, 1) > 0.3 && side !== 2)
      p.line(x, y, x, y - cell_h * height);

    if (rnd.random_between(0, 1) > 0.3 && side !== 3)
      p.line(
        x + cell_w / 2,
        y + cell_h / 2,
        x + (cell_w / 2) * width + cell_w / 2,
        y - (cell_h / 2) * width + cell_h / 2
      );
    if (rnd.random_between(0, 1) > 0.3 && side !== 3)
      p.line(
        x + (cell_w / 2) * width + cell_w / 2,
        y - (cell_h / 2) * width + cell_h / 2,
        x + (cell_w / 2) * width + cell_w / 2,
        y - cell_h * height - (cell_h / 2) * width + cell_h / 2
      ); */

    /*if (rnd.random_between(0, 1) > 0.5)
      p.line(x + cell_w / 2, y + cell_h / 2 - cell_h * height, x, y);
        if (rnd.random_between(0, 1) > 0.5)
      p.line(
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * height,
        x + cell_w / 2,
        y + cell_h / 2
      );

    if (rnd.random_between(0, 1) > 0.5)
      p.line(
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * height,
        x + (cell_w / 2) * width + cell_w / 2,
        y - (cell_h / 2) * width + cell_h / 2
      );

    if (rnd.random_between(0, 1) > 0.5)
      p.line(
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * height,
        x + (cell_w / 2) * width,
        y - cell_h * height - (cell_h / 2) * width
      ); */
  }

  function drawWallWithoutColor(p, x, y, height, width) {
    p.strokeJoin(p.ROUND);
    p.strokeWeight(2 * m);

    // draw top

    p.stroke(hex2hsl("#ffffff")[0]);
    p.strokeWeight(2 * m);
    p.fill(
      hex2hsl(
        paperColors[Math.floor(Math.random() * paperColors.length)].hex
      )[0]
    );

    if (rnd.random_between(0, 1) > 0.3)
      p.line(
        x,
        y - cell_h * height,
        x + (cell_w / 2) * width,
        y - cell_h * height - (cell_h / 2) * width
      );
    if (rnd.random_between(0, 1) > 0.3)
      p.line(
        x + (cell_w / 2) * width,
        y - cell_h * height - (cell_h / 2) * width,
        x + cell_w / 2 + (cell_w / 2) * width,
        y - cell_h * height - (cell_h / 2) * width + cell_h / 2
      );
    if (rnd.random_between(0, 1) > 0.3)
      p.line(
        x + cell_w / 2 + (cell_w / 2) * width,
        y - cell_h * height - (cell_h / 2) * width + cell_h / 2,
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * height
      );
    if (rnd.random_between(0, 1) > 0.3) {
      p.line(
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * height,
        x,
        y - cell_h * height
      );
    }

    if (rnd.random_between(0, 1) > 0.3)
      p.line(
        x + cell_w / 2,
        y + cell_h / 2 - cell_h * height,
        x + cell_w / 2,
        y + cell_h / 2
      );
    if (rnd.random_between(0, 1) > 0.3)
      p.line(x + cell_w / 2, y + cell_h / 2, x, y);
    if (rnd.random_between(0, 1) > 0.3) p.line(x, y, x, y - cell_h * height);

    if (rnd.random_between(0, 1) > 0.3)
      p.line(
        x + cell_w / 2,
        y + cell_h / 2,
        x + (cell_w / 2) * width + cell_w / 2,
        y - (cell_h / 2) * width + cell_h / 2
      );
    if (rnd.random_between(0, 1) > 0.3)
      p.line(
        x + (cell_w / 2) * width + cell_w / 2,
        y - (cell_h / 2) * width + cell_h / 2,
        x + (cell_w / 2) * width + cell_w / 2,
        y - cell_h * height - (cell_h / 2) * width + cell_h / 2
      );
  }

  function findEdgePointDownwards(x, y) {
    return x <= width / 2
      ? x / 2 + (y / 32) * 32
      : (width - x) / 2 + (y / 32) * 32;
  }

  function findEdgePointUpwards(x, y) {
    return x <= width / 2
      ? (y / 32) * 32 - x / 2
      : (y / 32) * 32 - (width - x) / 2;
  }

  function generateGrid(p) {
    for (let i = 0; i <= (width / cell_w) * 2; i++) {
      for (let j = 0; j <= height / cell_h; j++) {
        var offsetY = 0;
        if (i % 2 === 0) {
          offsetY = 0;
        } else {
          offsetY = cell_h / 2.0;
        }
        p.stroke(0);
        p.strokeWeight(3 * m);
        p.point((i * cell_w) / 2, j * cell_h - offsetY);
      }
    }
  }

  function drawLines(p) {
    p.strokeWeight(1 * m);
    p.stroke(0);
    for (let i = 0; i <= (width / cell_w) * 2; i++) {
      for (let j = 0; j <= height / cell_h; j++) {
        if (i % 2 === 0) {
          p.line(
            (i * cell_w) / 2,
            j * cell_h,
            ((i + 1) * cell_w) / 2,
            j * cell_h - cell_h / 2
          );
        } else {
          p.line(
            (i * cell_w) / 2,
            j * cell_h - cell_h / 2,
            ((i + 1) * cell_w) / 2,
            j * cell_h - cell_h
          );
        }

        /* if (i % 2 === 0) {
          p.line(
            (i * cell_w) / 2,
            j * cell_h,
            ((i + 1) * cell_w) / 2,
            j * cell_h + cell_h / 2
          );
        } else {
          p.line(
            (i * cell_w) / 2,
            j * cell_h + cell_h / 2,
            ((i + 1) * cell_w) / 2,
            j * cell_h + cell_h
          );
        } */
      }
    }
  }

  function displayBorder(p, e, color) {
    p.fill(hex2hsl("#333533")[0]); // f4f0e7 333533
    p.stroke(100);
    p.strokeWeight(2 * m);
    p.noStroke();
    p.strokeJoin(p.MITER);
    p.beginShape();
    p.vertex(-1 * m, -1 * m);
    p.vertex(width + 1 * m, -1 * m);
    p.vertex(width + 1 * m, height + 1 * m);
    p.vertex(-1 * m, height + 1 * m);
    p.beginContour();
    //p.stroke(hex2hsl("#333533")[0]);
    p.vertex(e, e);
    p.vertex(e, height - e);
    p.vertex(width - e, height - e);
    p.vertex(width - e, e);
    p.endContour();
    p.endShape(p.CLOSE);
  }

  return <Sketch setup={setup} draw={draw} />;
}

export default Boxes;
