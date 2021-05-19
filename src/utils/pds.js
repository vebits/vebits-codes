const grid = [];
const active = [];
const ordered = [];
var cols, rows;

export default function initPDS(p, r, k, w, width, height, rnd) {
  cols = p.floor(width / w);
  rows = p.floor(height / w);
  for (let i = 0; i < cols * rows; i++) {
    grid[i] = undefined;
  }

  let x = 0;
  let y = 0;
  let i = p.floor(x / w);
  let j = p.floor(y / w);
  let pos = p.createVector(x, y);
  grid[i + j * cols] = pos;
  active.push(pos);

  while (active.length > 0) {
    var randIndex = p.floor(rnd.random_between(0, active.length));
    pos = active[randIndex];
    var found = false;
    for (var n = 0; n < k; n++) {
      var sample = window.p5.Vector.fromAngle(
        rnd.random_between(0, 1) * 2 * p.PI
      );
      //var sample = window.p5.Vector.random2D();
      var m = rnd.random_between(r, 2 * r);
      sample.setMag(m);
      sample.add(pos);

      var col = p.floor(sample.x / w);
      var row = p.floor(sample.y / w);
      if (
        col > -1 &&
        row > -1 &&
        col < cols &&
        row < rows &&
        !grid[col + row * cols]
      ) {
        var ok = true;
        for (var h = -1; h <= 1; h++) {
          for (var g = -1; g <= 1; g++) {
            var index = col + h + (row + g) * cols;
            var neighbor = grid[index];
            if (neighbor) {
              var d = window.p5.Vector.dist(sample, neighbor);
              if (d < r) {
                ok = false;
              }
            }
          }
        }
        if (ok) {
          found = true;
          grid[col + row * cols] = sample;
          active.push(sample);
          ordered.push(sample);
          // Should we break?
          break;
        }
      }
    }

    if (!found) {
      active.splice(randIndex, 1);
    }
  }
  return ordered;
}
