import React from "react";
import { useParams } from "react-router-dom";

import Sketch from "react-p5";
import Random, { random_hash } from "utils/random";
import { hex2hsl } from "utils/color-converter";
import shuffle from "utils/shuffle";

function AB() {
  let { id } = useParams();

  let seed, hash, tokenData;
  tokenData = { hash: random_hash() };
  if (id) {
    hash = id;
  } else {
    hash = tokenData.hash;
  }
  seed = parseInt(hash.slice(0, 16), 16);
  const rnd = new Random(seed);
  console.log(tokenData.hash);

  // DIMENSIONS
  let DEFAULT_SIZE = 1024;
  let width, height;
  if (window.innerHeight >= 0.75 * window.innerWidth) {
    width = window.innerWidth;
    height = 0.75 * window.innerWidth;
  } else {
    height = window.innerHeight;
    width = window.innerHeight / 0.75;
  }
  const windowMargin = id ? 1 : 0.75;
  width = width * windowMargin;
  height = height * windowMargin;
  console.log(width, height);

  let dim = Math.min(width, height);
  let m = dim / DEFAULT_SIZE;

  // PDS
  let r = 20 * m;
  let w = r / Math.sqrt(2);

  const angleGrid = [];

  let cols, rows;

  const setup = (p, canvasParentRef) => {
    //p.pixelDensity(1);
    p.createCanvas(width, height, p.SVG).parent(canvasParentRef);
    p.noLoop();
    p.colorMode(p.HSL);
    p.noiseSeed(seed);

    // PALETTE
    let Palettes2 = [
      ["#D9D9D9", "#F2CC0C", "#D9A407", "#BF7E04", "#A63F03"],
      ["#D9BDAD", "#D9653B", "#BF9C8F", "#D94625", "#262626"],
      //["#202426", "#6C733D", "#9DA65D", "#8C8C88", "#F2F2F2"], // //
      ["#F2F2F2", "#A6A6A6", "#595959", "#262626", "#0D0D0D"],
      //["#08348C", "#4992F2", "#D9936A", "#592014", "#A65341"],
      ["#A4B8BF", "#EBF0F2", "#6D878C", "#31403E", "#1A261C"],
      ["#6D7E8C", "#343E40", "#BFA98E", "#8C715A", "#0D0D0D"],
      ["#27191c", "#2d3839", "#114d4d", "#6e9987", "#e0e4ce"],
      ["#951f2b", "#f5f4d7", "#e0dfb1", "#a5a36c", "#535233"],
      ["#c8e3c5", "#9cad9a", "#755858", "#f7f7c6", "#ffc870"],
      ["#fcab10", "#f9ce07", "#0ce3e8", "#1f0441", "#fc1068"],
      ["#063940", "#195e63", "#3e838c", "#8ebdb6", "#ece1c3"],
      //["#322f3e", "#abdecb", "#e63c6d", "#ede7a5", "#f5b494"], //
      //["#b3a176", "#494d4b", "#e2cb92", "#312c20", "#7c7052"], //
      ["#edeccf", "#207178", "#dc6378", "#f1c694", "#101652"], // *
      ["#260d0d", "#319190", "#ff4000", "#ffc803", "#ffefb5"], // *
      ["#d2fdfe", "#febf97", "#fe6960", "#fefac2", "#affbff"],
      //["#e77a77", "#54343f", "#f9df94", "#cad5ad", "#f6a570"], //
      ["#f98f6f", "#f7eadc", "#eb613b", "#4d3b36", "#c1d9cd"],
      ["#9e6b7c", "#f3d597", "#b6d89c", "#92ccb6", "#f87887"],
      ["#fcdfbd", "#8d9c9d", "#45373e", "#e00b5b", "#f5b04b"],
      ["#ff1d44", "#1c8080", "#fbebaf", "#74bf9d", "#56a292"],
      ["#008584", "#006666", "#f5f5f5", "#e9e9e9", "#cccccc"],
      ["#602749", "#130912", "#b14623", "#3e1c33", "#f6921d"],
      ["#e77a77", "#54343f", "#f6a570", "#cad5ad", "#f9df94"],
      ["#c2412d", "#5a1e4a", "#a46583", "#d1aa34", "#a7a844"],
      ["#fcbf6b", "#a9ccb9", "#afab50", "#e58634", "#657a38"],
      ["#fdffd9", "#fff0b8", "#faad8e", "#ffd6a3", "#142f30"],
      ["#567ebb", "#1f1f20", "#dce0e6", "#606d80", "#2b4c7e"],
      ["#83563f", "#fda664", "#cee1d8", "#f6eee0", "#f04842"],
    ];
    let palette = shuffle(
      Palettes2[rnd.random_int(0, Palettes2.length - 1)],
      rnd
    );
    console.log(palette);

    let leftToRight = rnd.random_between(0, 1) > 0.5;
    let margin = rnd.random_choice([0, 64, 128, 256]);
    margin = margin * m;
    let density = rnd.random_int(2, 32);
    let outlined = rnd.random_between(0, 1) > 1;
    let noFillAtAll = rnd.random_between(0, 1) > 0.98;
    let alpha = rnd.random_between(0, 1) > 0.6;
    let symmetry = rnd.random_between(0, 1) > 0.9;
    let sequential = rnd.random_between(0, 1) > 0.6;
    let group = rnd.random_between(0, 1) > 0.6;
    let tri = rnd.random_between(0, 1) > 0.6;
    let single = rnd.random_between(0, 1) > 0.8;
    let wobbly = rnd.random_between(0, 1) > 0.6;
    let straight = rnd.random_between(0, 1) > 0.8;
    let glitched = rnd.random_between(0, 1) > 1;

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
    console.log("single: ", single);
    console.log("wobbly: ", wobbly);
    console.log("straight: ", straight);
    console.log("glitched: ", glitched);

    let bgColor;
    if (tri) {
      palette.pop();
      palette.pop();
    } else if (single) {
      palette.pop();
      palette.pop();
      palette.pop();
    }
    bgColor = hex2hsl(palette[rnd.random_int(0, palette.length - 1)]);
    p.background(p.color(bgColor[0]));
    //p.background(100);

    initAngleGrid(p, leftToRight, wobbly, straight);
    p.strokeJoin(p.BEVEL);

    if (leftToRight) {
      drawLeftToRight(
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
        single
      );
    } else {
      drawRightToLeft(
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
        single
      );
    }

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas("colorflow_" + hash, "png");
    };
  };

  const draw = (p) => {};

  const drawLeftToRight = (
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
    single
  ) => {
    p.noFill();

    const polys = drawFlowField(p, leftToRight, margin, density);
    console.log(polys);

    if (outlined || noFillAtAll) {
      p.stroke(0);
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
      if (group && !single) {
        if (i % mod === 0) {
          continue;
        } else if (rnd.random_between(0, 1) > 0.2) {
          color = p.color(hex2hsl(palette[Math.ceil((i / 12) % mod) - 1])[0]);
        } else {
          color = p.color(
            hex2hsl(palette[rnd.random_int(0, palette.length - 1)])[0]
          );
        }
      } else if (sequential && !single) {
        color = p.color(hex2hsl(palette[i % mod])[0]);
      } else {
        color = p.color(
          hex2hsl(palette[rnd.random_int(0, palette.length - 1)])[0]
        );
      }

      if (alpha) {
        color.setAlpha(rnd.random_between(0.1, 0.3));
      }

      if (rnd.random_between(0, 1) > 0.0 && !noFillAtAll) {
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
          if (polys[i][polys[i].length - 1].x < width - margin - 2 * m)
            break loop1;
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
      p.endShape(p.CLOSE);
    }
  };

  const drawRightToLeft = (
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
    single
  ) => {
    p.noFill();

    const polys = drawFlowField(p, leftToRight, margin, density);
    console.log(polys);

    if (outlined || noFillAtAll) {
      p.stroke(0);
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
      if (group && !single) {
        if (i % mod === 0) {
          continue;
        } else if (rnd.random_between(0, 1) > 0.2) {
          color = p.color(hex2hsl(palette[Math.ceil((i / 12) % mod) - 1])[0]);
        } else {
          color = p.color(
            hex2hsl(palette[rnd.random_int(0, palette.length - 1)])[0]
          );
        }
      } else if (sequential && !single) {
        color = p.color(hex2hsl(palette[i % mod])[0]);
      } else {
        color = p.color(
          hex2hsl(palette[rnd.random_int(0, palette.length - 1)])[0]
        );
      }

      if (alpha) {
        color.setAlpha(rnd.random_between(0.1, 0.3));
      }

      if (rnd.random_between(0, 1) > 0.0 && !noFillAtAll) {
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
          if (polys[i][polys[i].length - 1].x > margin + 8 * m) break loop1;
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

  return <Sketch setup={setup} draw={draw} />;
}

export default AB;
