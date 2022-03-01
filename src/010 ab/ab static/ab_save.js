/* eslint-disable */
function random_hash() {
  let chars = "0123456789abcdef";
  let result = "0x";
  for (let i = 64; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

const tokenData = {
  hash: random_hash(), // "0xe4bdbbe146465f8302f2c349308c6cb59404303de29f480a6eeb1475dd487013",
};
console.log(tokenData);
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

let DEFAULT_SIZE = 1024;
let width, height;
if (window.innerHeight >= 1.2 * window.innerWidth) {
  width = window.innerWidth;
  height = 1.2 * window.innerWidth;
} else {
  height = window.innerHeight;
  width = window.innerHeight / 1.2;
}

let dim = Math.min(width, height);
let m = dim / DEFAULT_SIZE;
let w = 12 * m;
let margin64 = 64 * m;
const angleGrid = [];
let cols, rows;
let rnd;

function setup() {
  seed = parseInt(tokenData.hash.slice(0, 16), 16);
  rnd = new Random();
  console.log("SEED:", seed);
  createCanvas(width, height);
  noLoop();
  noiseSeed(seed); //64384909326042720
  colorMode(HSL);
  strokeJoin(ROUND);
}

function draw() {
  let finalPalettes = getPalettes();
  let palette = weightFunction(
    finalPalettes,
    finalPalettes.map((p) => p.weight)
  );

  let margin = weightFunction([0, 64, 128, 256], [2, 2, 1, 0.5]) * m;
  margin = margin64 * 0;
  let density = rnd.random_int(2, 32);
  let leftToRight = rnd.random_dec() > 0.5;
  leftToRight = true;
  console.log(leftToRight);

  let symmetry = rnd.random_dec() > 0.9;
  symmetry = false;
  let colorStrat = weightFunction(["random", "sequential", "group"], [1, 3, 3]);

  let paletteSize = weightFunction(["full", "tri", "duo"], [3, 1, 1]);
  console.log(paletteSize);

  let alpha = rnd.random_dec() > 0.7;

  let expression = weightFunction(
    ["standard", "wobbly", "straight"],
    [(3, 0.5, 1)]
  );
  expression = "standard";

  let outlined = rnd.random_dec() > 0.95;
  let noFillAtAll = rnd.random_dec() > 0.98;
  noFillAtAll = true;

  let swap = false;

  if (expression === "wobbly") {
    w = 1;
  }

  if (alpha) {
    group = true;
    outlined = false;
  }

  if (outlined) {
    density = rnd.random_int(10, 32);
  }

  if (margin === 0 && rnd.random_dec() > 0.9 && !symmetry) {
    swap = true;
  }

  if (palette.name === "Mono red" || palette.name === "Mono green") {
    alpha = true;
    outlined = false;
    density = rnd.random_int(10, 32);
  }

  if (paletteSize === "duo") {
    while (palette.colors.length > 2) {
      const index = Math.floor(rnd.random_dec() * palette.colors.length);
      if (palette.colors[index] === palette.background) continue;
      palette.colors.splice(index, 1);
    }
    palette.stroke =
      palette.colors[0] === palette.background
        ? palette.colors[1]
        : palette.colors[0];
  }
  if (paletteSize === "tri") {
    while (palette.colors.length > 3) {
      const index = Math.floor(rnd.random_dec() * palette.colors.length);
      if (palette.colors[index] === palette.background) continue;
      palette.colors.splice(index, 1);
    }
  }

  if (margin !== 0 && margin !== margin64) {
    strokeJoin(BEVEL);
  }

  let bgColor = color(palette.background);
  background(bgColor);

  initAngleGrid(leftToRight, expression, symmetry);

  // debugging
  /*   for (let x = 0; x < angleGrid.length; x++) {
    for (let y = 0; y < angleGrid[x].length; y++) {
      stroke(0);
      push();
      translate(x * w, y * w);
      point(0, 0);
      rotate(angleGrid[x][y]);
      line(0, 0, 10, 0);
      pop();
    }
  } */

  noFill();

  const polys = getPolys(leftToRight, margin, density);

  if (outlined || noFillAtAll) {
    stroke(palette.stroke);
    strokeWeight(2 * m);

    if (noFillAtAll) {
      noFill();
    }
  } else {
    noStroke();
  }

  if (swap) {
    translate(width, height);
    rotate(PI);
  }

  loop1: for (let i = 0; i < polys.length; i++) {
    if (polys[i].length < margin64) continue;

    let mod = palette.colors.length;
    let fillColor;
    if (colorStrat === "group" && !(paletteSize === "duo")) {
      if (i % mod === 0) {
        continue;
      } else if (rnd.random_dec() > 0.2) {
        fillColor = color(palette.colors[Math.ceil((i / 12) % mod) - 1]);
      } else {
        fillColor = color(
          palette.colors[rnd.random_int(0, palette.colors.length - 1)]
        );
      }
    } else if (colorStrat === "sequential" && !(paletteSize === "duo")) {
      fillColor = color(palette.colors[i % mod]);
    } else {
      fillColor = color(
        palette.colors[rnd.random_int(0, palette.colors.length - 1)]
      );
    }

    if (alpha) {
      fillColor.setAlpha(rnd.random_num(0.1, 0.9));
    }

    if (!noFillAtAll) {
      fill(fillColor);
    } else {
      noFill();
    }

    beginShape();
    let last_x = 0;
    let last_y = 0;
    let offset = 12 * m;
    if (polys[i].length % 2 !== 0) {
      polys[i].pop();
    }
    for (let j = 0; j < polys[i].length; j += 1) {
      if (symmetry) {
        if (leftToRight) {
          if (polys[i][polys[i].length - 1].x < width - margin - offset)
            break loop1;
        } else {
          if (polys[i][polys[i].length - 1].x > margin + offset) break loop1;
        }
        if (j > polys[i].length / 2) {
          if (j === 0) {
            vertex(Math.round(polys[i][j].x), polys[i][polys[i].length - j].y);
          } else {
            vertex(polys[i][j].x, polys[i][polys[i].length - j].y);
          }

          last_x = polys[i][j].x;
          last_y = polys[i][polys[i].length - j].y;
        } else {
          if (j === 0) {
            vertex(Math.round(polys[i][j].x), polys[i][j].y);
          } else {
            vertex(polys[i][j].x, polys[i][j].y);
          }
          last_x = polys[i][j].x;
          last_y = polys[i][j].y;
        }
      } else {
        if (j === 0) {
          vertex(Math.round(polys[i][j].x), polys[i][j].y);
        } else {
          vertex(polys[i][j].x, polys[i][j].y);
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
        if (last_x < width - margin - offset) {
          vertex(last_x, height);
        } else {
          vertex(width, last_y);
          vertex(width, height);
        }
        vertex(0, height);
      } else if (margin === 64 * m) {
        if (last_x < width - margin - offset) {
          vertex(last_x, heightWithMargin);
          vertex(64 * m, heightWithMargin);
        } else {
          vertex(widthWithMargin, last_y);
          vertex(widthWithMargin, heightWithMargin);
        }
        vertex(Math.round(64 * m), heightWithMargin);
      } else {
        if (last_x < width - margin - offset) {
          vertex(last_x, height);
        } else {
          vertex(width - margin, last_y);
          vertex(width, height);
        }
        vertex(0, height);
      }
    } else {
      if (margin === 0) {
        if (last_x < width - margin - offset) {
          vertex(last_x, height);
        } else {
          vertex(margin, last_y);
          vertex(margin, height);
        }
        vertex(width, height);
      } else if (margin === 64 * m) {
        if (last_x < margin + offset) {
          vertex(roundMargin, last_y);
          vertex(roundMargin, heightWithMargin);
        } else {
          vertex(last_x, heightWithMargin);
          vertex(widthWithMargin, heightWithMargin);
        }
        vertex(widthWithMargin, heightWithMargin);
      } else {
        if (last_x < margin + offset) {
          vertex(margin, last_y);
          vertex(0, height);
        } else {
          vertex(last_x, height);
        }
        vertex(width, height);
      }
    }
    endShape(CLOSE);
  }

  if (margin === margin64) {
    drawPadding(margin64, palette.background);
  }
  drawBorder(32 * m, palette.background, palette.stroke);
  console.log(calculateFeatures(tokenData));
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function getPolys(leftToRight, margin, density) {
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
        y > height - (margin === margin64 ? margin64 : 0)
      ) {
        break;
      }

      currentpoly.push(new Point(x, y));

      const column_index = int(x / w);
      const row_index = int(y / w);

      const grid_angle = angleGrid[column_index][row_index];

      const x_step = width * 0.0001 * cos(grid_angle);
      const y_step = height * 0.0001 * sin(grid_angle);

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

function initAngleGrid(leftToRight, expression, symmetry) {
  cols = floor(width / w);
  rows = floor(height / w);
  const cord_scale = expression === "straight" ? 0.005 : 0.05;

  for (let x = 0; x < cols + 1; x++) {
    angleGrid.push([]);
    for (let y = 0; y < rows + 1; y++) {
      const scaled_x = y * cord_scale;
      const scaled_y = x * cord_scale;

      noiseDetail(8, 0.2);
      const noise_val = noise(scaled_x, scaled_y);

      let start, end;
      if (leftToRight && expression === "straight" && symmetry) {
        start = (5 / 6) * PI;
        end = PI;
      } else if (!leftToRight && expression === "straight" && symmetry) {
        start = PI;
        end = (7 / 6) * PI;
      } else {
        if (leftToRight) {
          start = (2 / 3) * PI;
          end = (4 / 3) * PI;
        } else {
          start = (4 / 3) * PI;
          end = (2 / 3) * PI;
        }
      }

      const angle = map(noise_val, 0.0, 1.0, start, end);

      angleGrid[x].push(-angle);
    }
  }
}

function weightFunction(items, weights) {
  var sum = weights.reduce((p, n) => p + n, 0);
  var random = Math.floor(rnd.random_dec() * sum);

  for (let i = 0; i < items.length; i++) {
    sum -= weights[i];
    if (random >= sum) {
      return items[i];
    }
  }
  return items[0];
}

function drawPadding(e, color) {
  fill(color);
  noStroke();
  beginShape();
  vertex(-e, -e);
  vertex(width + e, -e);
  vertex(width + e, height + e);
  vertex(-e, height + e);
  beginContour();
  vertex(e, e);
  vertex(e, height - e);
  vertex(width - e, height - e);
  vertex(width - e, e);
  endContour();
  endShape(CLOSE);
}

function drawBorder(e, color, s) {
  fill(color);
  stroke(s);
  strokeWeight(2 * m);
  strokeJoin(MITER);
  beginShape();
  vertex(-e, -e);
  vertex(width + e, -e);
  vertex(width + e, height + e);
  vertex(-e, height + e);
  beginContour();
  vertex(e, e);
  vertex(e, height - e);
  vertex(width - e, height - e);
  vertex(width - e, e);
  endContour();
  endShape(CLOSE);
}

function getPalettes() {
  return [
    {
      name: "Sandstone",
      colors: ["#f78888", "#f3d250", "#ececec", "#90ccf4", "#5da2d5"],
      stroke: "#000",
      background: rnd.random_choice(["#ececec", "#5da2d5"]),
      weight: 3,
    },
    {
      name: "Redwall",
      colors: ["#f0ede6", "#d8c3a5", "#8e8d8a", "#e98074", "#e84a4f"],
      stroke: "#000",
      background: rnd.random_choice(["#f0ede6", "#e98074"]),
      weight: 3,
    },
    {
      name: "Plio",
      colors: ["#edb7c7", "#f0ede6", "#bab2b5", "#123c69", "#ac3b61"],
      stroke: "#000",
      background: rnd.random_choice(["#f0ede6", "#edb7c7"]),
      weight: 3,
    },
    {
      name: "Oligo",
      colors: [
        "#f0ede6",
        "#e27d60",
        "#85dcbb",
        "#e8a87c",
        "#c38d9e",
        "#41b3a3",
      ],
      stroke: "#000",
      background: rnd.random_choice(["#f0ede6", "#e27d60"]),
      weight: 3,
    },
    {
      name: "Kayenta",
      colors: ["#f0ede6", "#207178", "#dc6378", "#f1c694", "#101652"],
      stroke: "#000",
      background: rnd.random_choice(["#f0ede6"]),
      weight: 3,
    },
    {
      name: "Charcoal",
      colors: ["#464646", "#3c3c3c", "#323232", "#282828", "#1e1e1e"],
      stroke: "#fff",
      background: rnd.random_choice(["#1e1e1e"]),
      weight: 1,
    },
    {
      name: "Wingate",
      colors: ["#260d0d", "#319190", "#ff4000", "#ffc803", "#f0ede6"],
      stroke: "#000",
      background: rnd.random_choice(["#f0ede6", "#319190", "#ff4000"]),
      weight: 3,
    },
    {
      name: "Magma",
      colors: ["#D9BDAD", "#D9653B", "#BF9C8F", "#D94625", "#262626"],
      stroke: "#fff",
      background: rnd.random_choice(["#D9BDAD", "#D9653B", "#262626"]),
      weight: 2,
    },
    {
      name: "Steel",
      colors: ["#A4B8BF", "#EBF0F2", "#6D878C", "#31403E", "#1A261C"],
      stroke: "#000",
      background: rnd.random_choice(["#EBF0F2", "#6D878C", "#1A261C"]),
      weight: 2,
    },
    {
      name: "Blue mineral",
      colors: ["#063940", "#195e63", "#3e838c", "#8ebdb6", "#f0ede6"],
      stroke: "#000",
      background: rnd.random_choice(["#f0ede6", "#8ebdb6"]),
      weight: 3,
    },
    {
      name: "Green mineral",
      colors: ["#008584", "#006666", "#f5f5f5", "#e9e9e9", "#cccccc"],
      stroke: "#fff",
      background: rnd.random_choice(["#006666"]),
      weight: 3,
    },
    {
      name: "Moonshine",
      colors: ["#1E0D2E", "#341F4F", "#59428A", "#8C83E0", "#C0C6FF"],
      stroke: "#000",
      background: rnd.random_choice(["#C0C6FF", "#59428A"]),
      weight: 1,
    },
    {
      name: "Lava",
      colors: ["#F2911B", "#F2780C", "#F25C05", "#F24405", "#f0ede6"],
      stroke: "#000",
      background: rnd.random_choice(["#f0ede6"]),
      weight: 3,
    },
    {
      name: "Pink opal",
      colors: ["#f0ede6", "#594842", "#D9998B", "#F2C1B6", "#D98B84"],
      stroke: "#000",
      background: rnd.random_choice(["#f0ede6"]),
      weight: 3,
    },
  ];
}
