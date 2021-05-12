/* eslint-disable */
"use strict";

const creator = new URLSearchParams(window.location.search).get("creator");
const viewer = new URLSearchParams(window.location.search).get("viewer");
console.log("creator: ", creator);
console.log("viewer: ", viewer);

let tzAdress = "tz1VQKvSCtevdSJffwf54oeeBDbCX2TeE4zz";
if (creator) tzAdress = creator;
if (viewer) tzAdress = viewer;
const decodedTzAddress = getAddressFromOptimized(tzAdress);
const seed = parseInt(decodedTzAddress.slice(0, 16), 16);
console.log("seed: ", seed);

const rnd = new Random(seed);

// DIMENSIONS
var DEFAULT_SIZE = 1024;
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var dim = Math.min(canvasWidth, canvasHeight);
if (dim < 1024) {
  canvasWidth = 1024;
  canvasHeight = 1024;
  dim = 1024;
  console.log("minimum size is 1024x1024");
  console.log(`width: ${canvasWidth}`, `height: ${canvasHeight}`);
} else {
  console.log(`width: ${canvasWidth}`, `height: ${canvasHeight}`);
}
var m = dim / DEFAULT_SIZE;

const palette = palettes[rnd.random_int(0, palettes.length - 1)];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  pixelDensity(1);

  colorMode(HSB);
  noLoop();

  noiseSeed(seed);

  background(255);
}

function draw() {
  const layers = rnd.random_int(8, 10);

  noFill();

  for (let l = 0; l < layers; l++) {
    const layerPosition = l * (dim / layers);
    drawRidge(layerPosition);
  }
}

function drawRidge(y) {
  fill(255);
  stroke(255);
  strokeWeight(10 * m);
  const vertices = [];
  beginShape();

  for (let x = 0; x <= canvasWidth; x += 4) {
    const noisedY = noise(x * 0.002, (y / m) * 0.99) * m;
    vertex(x * m, y - noisedY * 250);
    vertices.push([x * m, y - noisedY * 250]);
  }
  vertex(canvasWidth, canvasHeight);
  vertex(0, canvasHeight);
  endShape(CLOSE);

  stroke(color(palette[rnd.random_int(0, palette.length - 1)]));
  strokeWeight(1 * m);
  let direction = rnd.random_choice(["left", "straight", "right"]);

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
    if (direction === "right") {
      line(
        vertices[j][0] * 1.015,
        canvasHeight,
        vertices[j + 1][0] * 1.015,
        vertices[j + 1][1] * 1.015
      );
    } else if (direction === "left") {
      line(
        vertices[j][0] * 1.015,
        canvasHeight,
        vertices[j - 1][0] * 1.015,
        vertices[j - 1][1] * 1.015
      );
    } else if (direction === "straight") {
      line(
        vertices[j][0] * 1.015,
        canvasHeight,
        vertices[j][0] * 1.015,
        vertices[j][1] * 1.015
      );
    }
  }
}

function keyPressed() {
  if (keyCode === 80) saveCanvas("cordillera_" + tzAdress, "png");
}

function getAddressFromOptimized(base58) {
  var address, prefix;
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

console.log("How to download at any width and height (Chrome):");
console.log("Step 1: Open Developer Tools.");
console.log("Step 2: Click on 'Toggle device toolbar' in left corner.");
console.log("Step 3: Choose 'Responsive' and 'Desktop'.");
console.log("Step 4: Set your desired width and height and refresh.");
console.log("Step 5: Right click on image and choose 'Save image as'.");
