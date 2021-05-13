/* eslint-disable */
"use strict";
console.log("----------");
console.log("ABOUT THE OBJKT");
console.log("cordillera by @vebits");
console.log(
  "Oxford Languages: \n cordillera \n  noun \n   a system or group of parallel mountain ranges together with the intervening plateaux and other features, especially in the Andes or the Rockies."
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
console.log(decodedTzAddress);
const seed = parseInt(decodedTzAddress.slice(0, 16), 16);
console.log("seed: ", seed);
console.log(`width: ${window.innerWidth}`, `height: ${window.innerHeight}`);

let rnd, m, palette;

function setup() {}

function draw() {
  rnd = new Random(seed);
  noiseSeed(seed);
  // DIMENSIONS
  const DEFAULT_SIZE = 1024;

  m = windowHeight / DEFAULT_SIZE;

  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  colorMode(HSB);
  noLoop();

  background(255);

  palette = palettes[rnd.random_int(0, palettes.length - 1)];
  const layers = rnd.random_int(8, 10);

  noFill();

  for (let l = 0; l < layers; l++) {
    const layerPosition = l * (height / layers);
    drawRidge(layerPosition);
  }
}

function drawRidge(y) {
  fill(255);
  stroke(255);
  strokeWeight(10 * m);
  const vertices = [];
  beginShape();
  let x = 0;
  while (x * m <= windowWidth) {
    const noisedY = noise(x * 0.002, (y / m) * 0.99) * m;
    vertex(x * m, y - noisedY * 250);
    vertices.push([x * m, y - noisedY * 250]);
    x += 4;
  }
  vertex(windowWidth, windowHeight);
  vertex(0, windowHeight);
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
        windowHeight,
        vertices[j + 1][0] * 1.015,
        vertices[j + 1][1] * 1.015
      );
    } else if (direction === "left") {
      line(
        vertices[j][0] * 1.015,
        windowHeight,
        vertices[j - 1][0] * 1.015,
        vertices[j - 1][1] * 1.015
      );
    } else if (direction === "straight") {
      line(
        vertices[j][0] * 1.015,
        windowHeight,
        vertices[j][0] * 1.015,
        vertices[j][1] * 1.015
      );
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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
  "IMPORTANT NOTE: The OBJKT's thumbnail and ipfs link will show the creator's cordillera artwork which is based on the creator's wallet address. So if you see the same artwork when visiting the OBJKT's page, something is wrong with your wallet sync on hicetnunc. A possible solution may be clicking your wallet address in the top right to sync and refresh the OBJKT's page."
);
console.log("----------");
console.log("HOW TO DOWNLOAD AT ANY WIDTH AND HEIGHT (Chrome):");
console.log(
  "Step 1: On the OBJKT's page, while keeping the developer console open, click the fullscreen viewer in the bottom right of the artwork (only visible when hovering the artwork)."
);
console.log(
  "Step 4: Click on 'Toggle device toolbar' (icon of a mobile and a tablet) in the developer console's left corner."
);
console.log("Step 5: Choose 'Responsive' and 'Desktop'.");
console.log(
  "Step 6: Set your desired width and height and wait for it to render."
);
console.log("Step 7: Right click on image and choose 'Save image as'.");
console.log("Step 8 (optional): Tweet me the artwork @vebits.");
console.log("----------");
console.log("CONTACT");
console.log("@vebits everywhere if you have any questions about this project.");
console.log("----------");
