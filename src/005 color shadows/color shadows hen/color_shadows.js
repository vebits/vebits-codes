/* eslint-disable */
"use strict";
console.log("----------");
console.log("ABOUT THE OBJKT");
console.log("color shadows by @vebits");
console.log(
  "color shadows consists of irregular shapes where each shape casts a random color shadow."
);
const creator = new URLSearchParams(window.location.search).get("creator");
const viewer = new URLSearchParams(window.location.search).get("viewer");
console.log("----------");
console.log("METADATA");
console.log("creator: ", creator);
console.log("viewer: ", viewer);

let tzAdress = "tz1VQKvSCtevdSJffwf54oeeBDbCX2TeE4zz";
if (creator) tzAdress = creator;
if (viewer) tzAdress = viewer;
const decodedTzAddress = getAddressFromOptimized(tzAdress);
const seed = parseInt(decodedTzAddress.slice(0, 16), 16);
console.log("seed: ", seed);
console.log(`width: ${window.innerWidth}`, `height: ${window.innerHeight}`);

let rnd, m, palette;

function setup() {}

function draw() {
  rnd = new Random(seed);

  const DEFAULT_SIZE = 1024;
  const dim = Math.min(windowWidth, windowHeight);
  m = dim / DEFAULT_SIZE;

  createCanvas(dim, dim);
  pixelDensity(1);

  colorMode(HSL);
  noLoop();

  background(255);

  palette = palettes[rnd.random_int(0, palettes.length - 1)];
  const paletteCopy = palette.slice();

  const irrShapes = [];
  const res = rnd.random_choice([3, 4, 5, 6, 8, 10]);
  const cols = res;
  const rows = res;

  let BASE_H;
  const BASE_S = rnd.random_int(0, 30),
    BASE_L = 90;

  const bgColor = hex2hsl(paletteCopy.shift());
  BASE_H = bgColor[1][0];
  background(BASE_H, BASE_S, BASE_L);

  let radius, xoff, yoff;
  if (res === 3) {
    radius = 60;
    xoff = rnd.random_int(10, 25);
  } else if (res === 4) {
    radius = 45;
    xoff = rnd.random_int(10, 20);
  } else if (res === 5) {
    radius = 40;
    xoff = rnd.random_int(10, 15);
  } else if (res === 6) {
    radius = 30;
    xoff = rnd.random_int(10, 15);
  } else if (res === 8) {
    radius = 25;
    xoff = rnd.random_int(10, 15);
  } else if (res === 10) {
    radius = 20;
    xoff = rnd.random_int(8, 12);
  }
  yoff = rnd.random_int(0, 1) ? xoff : -xoff;
  xoff = rnd.random_int(0, 1) ? xoff : -xoff;

  xoff = rnd.random_between(0, 1) > 0.9 ? 0 : xoff;
  yoff = rnd.random_between(0, 1) > 0.9 ? 0 : yoff;
  for (let i = 1; i < cols + 1; i++) {
    for (let j = 1; j < rows + 1; j++) {
      irrShapes.push(
        new IrregularShapeWithShadow(
          radius * m,
          rnd.random_int(5, 10),
          (i * dim) / (cols + 1),
          (j * dim) / (rows + 1),
          xoff * m,
          yoff * m
        )
      );
    }
  }

  let sameColorOnRow = rnd.random_between(0, 1) > 0.8 ? true : false;
  const alpha = rnd.random_between(0.5, 0.5);
  for (let i = 0; i < cols; i++) {
    let sameColor;
    if (res === 4 && sameColorOnRow) {
      sameColor = color(paletteCopy.shift());
    } else {
      sameColor = color(paletteCopy[rnd.random_int(0, paletteCopy.length - 1)]);
    }
    sameColor.setAlpha(alpha);
    for (let j = 0; j < rows; j++) {
      if (sameColorOnRow) {
        irrShapes[i + j * cols].draw(sameColor);
      } else {
        let rndColor = color(
          paletteCopy[rnd.random_int(0, paletteCopy.length - 1)]
        );
        rndColor.setAlpha(alpha);
        irrShapes[i + j * cols].draw(rndColor);
      }
    }
  }
}

function IrregularShapeWithShadow(radius, numVertices, x, y, xoff, yoff) {
  this.radius = radius;
  this.numVertices = numVertices;
  this.vertices = [];
  this.vertices2 = [];
  this.theta = 360 / this.numVertices;

  for (let i = 0; i < this.numVertices; i++) {
    radius = rnd.random_between(this.radius / 2, this.radius * 2);
    this.vertices[i] = new Point(
      int(cos(radians(i * this.theta)) * radius),
      int(sin(radians(i * this.theta)) * radius)
    );
    this.vertices2[i] = new Point(
      int(cos(radians(i * this.theta)) * radius) + xoff,
      int(sin(radians(i * this.theta)) * radius) + yoff
    );
  }

  this.draw = function (color) {
    push();
    translate(x, y);
    beginShape();
    for (let q = 0; q < this.numVertices; q++) {
      noStroke();
      curveVertex(this.vertices2[q].x, this.vertices2[q].y);
      fill(color);
    }
    for (let w = 0; w < 3; w++) {
      curveVertex(this.vertices2[w].x, this.vertices2[w].y);
    }
    endShape();

    beginShape();
    for (let e = 0; e < this.numVertices; e++) {
      noFill();
      strokeWeight(1.5 * m);
      stroke(0, 0, 0, 0.5);
      curveVertex(this.vertices[e].x, this.vertices[e].y);
    }
    for (let r = 0; r < 3; r++) {
      curveVertex(this.vertices[r].x, this.vertices[r].y);
    }
    endShape();
    pop();
  };
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function hex2hsl(H) {
  let r = 0,
    g = 0,
    b = 0;
  if (H.length === 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length === 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }

  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return ["hsl(" + h + "," + s + "%," + l + "%)", [h, s, l]];
}

function getAddressFromOptimized(base58) {
  let address, prefix;
  if (base58.substring(0, 3) === "tz1") {
    address = base58;
    prefix = eztz.prefix.tz1;
  } else if (base58.substring(0, 3) === "tz2") {
    address = base58;
    prefix = eztz.prefix.tz2;
  } else if (base58.substring(0, 3) === "tz3") {
    address = base58;
    prefix = eztz.prefix.tz3;
  } else {
    console.log(
      "base58 address not starting with tz1, tz2 or tz3. Using creators address."
    );
    address = creator;
    prefix = eztz.prefix.tz1;
  }
  return eztz.utility.buf2hex(eztz.utility.b58cdecode(address, prefix));
}

console.log("----------");
console.log(
  "IMPORTANT NOTE: The OBJKT's ipfs link will show the creator's color shadows artwork which is based on the creator's wallet address. So if you see the same artwork when visiting the OBJKT's page, something is wrong with your wallet sync on hic et nunc. A possible solution may be clicking your wallet address in the top right to sync and refresh the OBJKT's page."
);
console.log("----------");
console.log("HOW TO DOWNLOAD AT ANY SQUARE WIDTH AND HEIGHT (Chrome):");
console.log(
  "Step 1: On the OBJKT's page, while keeping the developer console open, click the fullscreen viewer in the bottom right of the artwork (only visible when hovering the artwork)."
);
console.log(
  "Step 4: Click on 'Toggle device toolbar' (icon of a mobile and a tablet) in the developer console's left corner."
);
console.log("Step 5: Choose 'Responsive' and 'Desktop'.");
console.log(
  "Step 6: Set your desired width and height (must be the same) and wait for it to render."
);
console.log("Step 7: Right click on image and choose 'Save image as'.");
console.log("Step 8 (optional): Tweet me the artwork @vebits.");
console.log("----------");
console.log("CONTACT");
console.log("@vebits everywhere if you have any questions about this project.");
console.log("----------");
