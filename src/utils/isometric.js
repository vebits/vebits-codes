/* function drawTop(p, x, y, height, width, shade) {
  p.fill(shade);
  p.stroke(shade);
  p.strokeWeight(1);
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
}

function drawLeftSide(p, x, y, height, shade) {
  p.fill(shade);
  p.stroke(shade);
  p.strokeWeight(1);
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

function drawRightSide(p, x, y, height, width, shade) {
  p.fill(shade);
  p.stroke(shade);
  p.strokeWeight(1);
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
  for (let i = 0; i <= (width / cell_w) * 2; i++) {
    for (let j = 1; j <= height / cell_h; j++) {
      p.strokeWeight(1);
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
    }
  }
} */
