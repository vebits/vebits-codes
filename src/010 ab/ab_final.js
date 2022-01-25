import React from "react";

import Sketch from "react-p5";
import { hex2hsl } from "utils/color-converter";

const tokenData = {
  hash: "0xe1b63b79c8d912a8479019cae0e1a78c2584f5e57a9144aab8accac02d5e109b",
};
console.log(tokenData);
function random_hash() {
  let chars = "0123456789abcdef";
  let result = "0x";
  for (let i = 64; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

class Random {
  constructor() {
    this.useA = false;
    let sfc32 = function (uint128Hex) {
      let a = parseInt(uint128Hex.substr(0, 8), 16);
      let b = parseInt(uint128Hex.substr(8, 8), 16);
      let c = parseInt(uint128Hex.substr(16, 8), 16);
      let d = parseInt(uint128Hex.substr(24, 8), 16);
      return function () {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };
    // seed prngA with first half of tokenData.hash
    this.prngA = new sfc32(tokenData.hash.substr(2, 32));
    // seed prngB with second half of tokenData.hash
    this.prngB = new sfc32(tokenData.hash.substr(34, 32));
    for (let i = 0; i < 1e6; i += 2) {
      this.prngA();
      this.prngB();
    }
  }
  // random number between 0 (inclusive) and 1 (exclusive)
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
  // random number between a (inclusive) and b (exclusive)
  random_num(a, b) {
    return a + (b - a) * this.random_dec();
  }
  // random integer between a (inclusive) and b (inclusive)
  // requires a < b for proper probability distribution
  random_int(a, b) {
    return Math.floor(this.random_num(a, b + 1));
  }
  // random boolean with p as percent liklihood of true
  random_bool(p) {
    return this.random_dec() < p;
  }
  // random value in an array of items
  random_choice(list) {
    return list[this.random_int(0, list.length - 1)];
  }
}

function AB() {
  let DEFAULT_SIZE = 1024;
  let width, height;
  if (window.innerHeight >= 1.2 * window.innerWidth) {
    width = window.innerWidth;
    height = 1.2 * window.innerWidth;
  } else {
    height = window.innerHeight;
    width = window.innerHeight / 1.2;
  }
  console.log(width, height);

  let dim = Math.min(width, height);
  let m = dim / DEFAULT_SIZE;
  let w = 12;
  const angleGrid = [];
  let cols, rows;
  let seed, rnd;

  const setup = (p, canvasParentRef) => {
    seed = parseInt(tokenData.hash.slice(0, 16), 16);
    rnd = new Random(); // 23539090465365090
    console.log("SEED:", seed);
    //p.pixelDensity(1);
    p.createCanvas(width, height, p.SVG).parent(canvasParentRef);
    p.noLoop();
    p.noiseSeed(63727468975597410);
    p.colorMode(p.HSL);
    p.strokeJoin(p.BEVEL);

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas("colorflow_" + seed, "png");
    };
  };

  const draw = (p) => {
    let FinalPalettes = [
      {
        name: "candy",
        colors: ["#f0ede6", "#207178", "#dc6378", "#f1c694", "#101652"],
        stroke: "#000",
        background: rnd.random_choice([
          "#f0ede6",

          /* "#ede2ce",
          "#ede2ce",
          "#ede2ce",
          "#207178",
          "#dc6378",
          "#f1c694", */
        ]),
      },
      {
        name: "charcoal",
        colors: ["#464646", "#3c3c3c", "#323232", "#282828", "#1e1e1e"],
        stroke: "#fff",
        background: rnd.random_choice(["#1e1e1e"]),
      },
      {
        name: "red",
        colors: ["#260d0d", "#319190", "#ff4000", "#ffc803", "#f0ede6"],
        stroke: "#000",
        background: rnd.random_choice(["#f0ede6", "#319190", "#ff4000"]),
      },
      {
        name: "lava",
        colors: ["#D9BDAD", "#D9653B", "#BF9C8F", "#D94625", "#262626"],
        stroke: "#fff",
        background: rnd.random_choice(["#D9BDAD", "#D9653B", "#262626"]),
      },
      {
        name: "steel",
        colors: ["#A4B8BF", "#EBF0F2", "#6D878C", "#31403E", "#1A261C"],
        stroke: "#000",
        background: rnd.random_choice(["#EBF0F2", "#6D878C", "#1A261C"]),
      },
      /* {
        name: "arrow",
        colors: ["#951f2b", "#f0ede6", "#e0dfb1", "#a5a36c", "#535233"],
        stroke: "#fff",
        background: rnd.random_choice(["#f0ede6", "#951f2b"]),
      }, */
      {
        name: "blue",
        colors: ["#063940", "#195e63", "#3e838c", "#8ebdb6", "#f0ede6"],
        stroke: "#000",
        background: rnd.random_choice(["#f0ede6", "#8ebdb6"]),
      },
      {
        name: "claystone",
        colors: ["#008584", "#006666", "#f5f5f5", "#e9e9e9", "#cccccc"],
        stroke: "#fff",
        background: rnd.random_choice(["#006666"]),
      },
      /* {
        name: "green",
        colors: ["#fdffd9", "#fff0b8", "#faad8e", "#ffd6a3", "#142f30"],
        stroke: "#fff",
        background: rnd.random_choice(["#142f30"]),
      }, */
      {
        name: "moonshine",
        colors: ["#1E0D2E", "#341F4F", "#59428A", "#8C83E0", "#C0C6FF"],
        stroke: "#000",
        background: rnd.random_choice(["#C0C6FF", "#59428A"]),
      },
      {
        name: "firefox",
        colors: ["#F2911B", "#F2780C", "#F25C05", "#F24405", "#f0ede6"],
        stroke: "#000",
        background: rnd.random_choice(["#f0ede6"]),
      },
      {
        name: "firefox",
        colors: ["#f0ede6", "#594842", "#D9998B", "#F2C1B6", "#D98B84"],
        stroke: "#000",
        background: rnd.random_choice(["#f0ede6"]),
      },
      {
        name: "red mono",
        colors: ["#fff", "#fff", "#fff", "#fff", "#fff"],
        stroke: "#fff",
        background: rnd.random_choice(["#951f2b"]),
      },
      {
        name: "green mono",
        colors: ["#fff", "#fff", "#fff", "#fff", "#fff"],
        stroke: "#fff",
        background: rnd.random_choice(["#006666"]),
      },
    ];

    /* let palette = shuffle(
      Palettes2[rnd.random_int(0, Palettes2.length - 1)],
      rnd
    ); */

    let palette = FinalPalettes[rnd.random_int(0, FinalPalettes.length - 1)];
    //palette = FinalPalettes[3];

    let leftToRight = rnd.random_dec() > 0.5;
    let margin = rnd.random_choice([0, 64, 128, 256]);
    margin = margin * m;
    let density = rnd.random_int(2, 32);
    let outlined = rnd.random_dec() > 0.95;
    let noFillAtAll = rnd.random_dec() > 0.98;
    let alpha = rnd.random_dec() > 0.7;
    let symmetry = rnd.random_dec() > 0.85;
    let sequential = rnd.random_dec() > 0.5;
    let group = rnd.random_dec() > 0.7;
    let tri = rnd.random_dec() > 0.8;
    let duo = rnd.random_dec() > 0.7;
    let wobbly = rnd.random_dec() > 0.6;
    let straight = rnd.random_dec() > 0.95;
    let swap = false;
    let glitched = rnd.random_dec() > 1;

    if (alpha) {
      group = true;
      outlined = false;
    }

    if (outlined) {
      density = rnd.random_int(10, 32);
    }

    if (margin === 0 && rnd.random_dec() > 0.5) {
      swap = true;
    }

    if (palette.name === "red mono" || palette.name === "green mono") {
      if (rnd.random_dec() > 0.5) {
        palette = FinalPalettes[rnd.random_int(0, FinalPalettes.length - 3)];
      } else {
        alpha = true;
        outlined = false;
        density = rnd.random_int(10, 32);
      }
    }

    console.log(
      "flowDirection: ",
      leftToRight ? "left to right" : "right to left"
    );
    console.log("margin: ", margin);
    console.log("density: ", density);
    console.log("outlined: ", outlined);
    console.log("noFillAtAll: ", noFillAtAll);
    console.log("alpha: ", alpha);
    console.log("symmetry: ", symmetry);
    console.log("sequential: ", sequential);
    console.log("group: ", group);
    console.log("tri: ", tri);
    console.log("duo: ", duo);
    console.log("wobbly: ", wobbly);
    console.log("straight: ", straight);
    console.log("glitched: ", glitched);

    let bgColor;
    //bgColor = hex2hsl(palette[rnd.random_int(0, palette.length - 1)]);
    bgColor = p.color(hex2hsl(palette.background)[0]);
    p.background(bgColor);

    if (duo) {
      if (palette.name === "charcoal") {
      }
      while (palette.colors.length > 2) {
        const index = p.floor(rnd.random_dec() * palette.colors.length);
        if (palette.colors[index] === palette.background) continue;
        palette.colors.splice(index, 1);
      }
      palette.stroke =
        palette.colors[0] === palette.background
          ? palette.colors[1]
          : palette.colors[0];
    }
    if (tri) {
      while (palette.colors.length > 3) {
        const index = Math.floor(rnd.random_dec() * palette.colors.length);
        if (palette.colors[index] === palette.background) continue;
        palette.colors.splice(index, 1);
      }
    }
    console.log("PALETTE", palette);

    initAngleGrid(p, leftToRight, wobbly, straight);

    if (swap) {
      p.translate(width, height);
      p.rotate(p.PI);
    }

    drawPolys(
      p,
      leftToRight,
      margin,
      density,
      outlined,
      noFillAtAll,
      alpha,
      symmetry,
      palette,
      glitched,
      sequential,
      group,
      tri,
      duo
    );

    displayBorder(p, 32 * m, hex2hsl(palette.background)[0], palette.stroke);
  };

  const drawPolys = (
    p,
    leftToRight,
    margin,
    density,
    outlined,
    noFillAtAll,
    alpha,
    symmetry,
    palette,
    glitched,
    sequential,
    group,
    tri,
    duo
  ) => {
    p.noFill();

    const polys = drawFlowField(p, leftToRight, margin, density);

    if (outlined || noFillAtAll) {
      p.stroke(palette.stroke);
      p.strokeWeight(2 * m);

      if (noFillAtAll) {
        p.noFill();
      }
    } else {
      p.noStroke();
    }

    const inc = glitched ? 500 : 1;
    loop1: for (let i = 0; i < polys.length; i++) {
      if (polys[i].length < 64 * m) {
        continue;
      }

      let mod = 5;
      if (tri) {
        mod = 3;
      }

      let color;
      if (group && !duo) {
        if (i % mod === 0) {
          continue;
        } else if (rnd.random_dec() > 0.2) {
          color = p.color(
            hex2hsl(palette.colors[Math.ceil((i / 12) % mod) - 1])[0]
          );
        } else {
          color = p.color(
            hex2hsl(
              palette.colors[rnd.random_int(0, palette.colors.length - 1)]
            )[0]
          );
        }
      } else if (sequential && !duo) {
        color = p.color(hex2hsl(palette.colors[i % mod])[0]);
      } else {
        color = p.color(
          hex2hsl(
            palette.colors[rnd.random_int(0, palette.colors.length - 1)]
          )[0]
        );
      }

      if (alpha) {
        color.setAlpha(rnd.random_num(0.1, 0.6));
      }

      if (!noFillAtAll) {
        p.fill(color);
      } else {
        p.noFill();
      }

      p.beginShape();
      let last_x = 0;
      let last_y = 0;
      if (polys[i].length % 2 !== 0) {
        polys[i].pop();
      }
      for (let j = 0; j < polys[i].length; j += inc) {
        if (symmetry) {
          if (leftToRight) {
            if (polys[i][polys[i].length - 1].x < width - margin - 2 * m)
              break loop1;
          } else {
            if (polys[i][polys[i].length - 1].x > margin + 8 * m) break loop1;
          }
          if (j > polys[i].length / 2) {
            if (j === 0) {
              p.vertex(
                Math.round(polys[i][j].x),
                polys[i][polys[i].length - j].y
              );
            } else {
              p.vertex(polys[i][j].x, polys[i][polys[i].length - j].y);
            }

            last_x = polys[i][j].x;
            last_y = polys[i][polys[i].length - j].y;
          } else {
            if (j === 0) {
              p.vertex(Math.round(polys[i][j].x), polys[i][j].y);
            } else {
              p.vertex(polys[i][j].x, polys[i][j].y);
            }
            last_x = polys[i][j].x;
            last_y = polys[i][j].y;
          }
        } else {
          if (j === 0) {
            p.vertex(Math.round(polys[i][j].x), polys[i][j].y);
          } else {
            p.vertex(polys[i][j].x, polys[i][j].y);
          }
          last_x = polys[i][j].x;
          last_y = polys[i][j].y;
        }
      }
      last_x = Math.round(last_x);
      let widthWithMargin = Math.round(width - 64 * m);
      let heightWithMargin = Math.round(height - 64 * m);
      let roundMargin = Math.round(64 * m);
      if (leftToRight) {
        if (margin === 0) {
          if (last_x < width - margin - 2 * m) {
            p.vertex(last_x, height);
          } else {
            p.vertex(width, last_y);
            p.vertex(width, height);
          }
          p.vertex(0, height);
        } else if (margin === 64 * m) {
          if (last_x < width - margin - 8 * m) {
            p.vertex(last_x, heightWithMargin);
            p.vertex(64 * m, heightWithMargin);
          } else {
            p.vertex(widthWithMargin, last_y);
            p.vertex(widthWithMargin, heightWithMargin);
          }
          p.vertex(Math.round(64 * m), heightWithMargin);
        } else {
          if (last_x < width - margin - 8 * m) {
            p.vertex(last_x, height);
          } else {
            p.vertex(width - margin, last_y);
            p.vertex(width, height);
          }
          p.vertex(0, height);
        }
      } else {
        if (margin === 0) {
          if (last_x < width - margin - 8 * m) {
            p.vertex(last_x, height);
          } else {
            p.vertex(margin, last_y);
            p.vertex(margin, height);
          }
          p.vertex(width, height);
        } else if (margin === 64 * m) {
          if (last_x < margin + 8 * m) {
            p.vertex(roundMargin, last_y);
            p.vertex(roundMargin, heightWithMargin);
          } else {
            p.vertex(last_x, heightWithMargin);
            p.vertex(widthWithMargin, heightWithMargin);
          }
          p.vertex(widthWithMargin, heightWithMargin);
        } else {
          if (last_x < margin + 8 * m) {
            p.vertex(margin, last_y);
            p.vertex(0, height);
          } else {
            p.vertex(last_x, height);
          }
          p.vertex(width, height);
        }
      }
      p.endShape(p.CLOSE);
    }
  };

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  function drawFlowField(p, leftToRight, margin, density) {
    const polys = [];

    for (let a = margin; a < height; a += density * m) {
      let x = leftToRight ? margin : width - margin;
      let y = a;
      let currentpoly = [];

      while (leftToRight ? x < width : x > margin) {
        if (y < margin) {
          currentpoly = [];
          break;
        }

        if (
          x < margin ||
          x > width - (margin === 0 ? 0 : margin) ||
          y < margin ||
          y > height - (margin === 64 * m ? 64 * m : 0)
        ) {
          break;
        }

        currentpoly.push(new Point(x, y));

        const column_index = p.int(x / w);
        const row_index = p.int(y / w);

        const grid_angle = angleGrid[column_index][row_index];

        const x_step = width * 0.0001 * p.cos(grid_angle);
        const y_step = height * 0.0001 * p.sin(grid_angle);

        if (leftToRight) {
          x -= x_step;
          y -= y_step;
        } else {
          x += x_step;
          y += y_step;
        }
      }
      polys.push(currentpoly);
    }
    console.log(polys);
    return polys;
  }

  function initAngleGrid(p, leftToRight, wobbly, straight) {
    cols = p.floor(width / w);
    rows = p.floor(height / w);
    const cord_scale = wobbly ? 0.1 : straight ? 0.005 : 0.05;

    for (let x = 0; x < cols + 1; x++) {
      angleGrid.push([]);
      for (let y = 0; y < rows + 1; y++) {
        const scaled_x = y * cord_scale;
        const scaled_y = x * cord_scale;

        p.noiseDetail(8, 0.2);
        const noise_val = p.noise(scaled_x, scaled_y);
        const angle = p.map(
          noise_val,
          0.0,
          1.0,
          leftToRight ? (4 / 3) * p.PI : (2 / 3) * p.PI,
          leftToRight ? (2 / 3) * p.PI : (4 / 3) * p.PI
        );

        angleGrid[x].push(angle);
      }
    }
  }

  function displayBorder(p, e, color, stroke) {
    p.fill(color);
    p.stroke(stroke);
    p.strokeWeight(2 * m);
    p.strokeJoin(p.MITER);
    p.beginShape();
    p.vertex(-e, -e);
    p.vertex(width + e, -e);
    p.vertex(width + e, height + e);
    p.vertex(-e, height + e);
    p.beginContour();
    p.vertex(e, e);
    p.vertex(e, height - e);
    p.vertex(width - e, height - e);
    p.vertex(width - e, e);
    p.endContour();
    p.endShape(p.CLOSE);
  }

  return <Sketch setup={setup} draw={draw} />;
}

export default AB;
