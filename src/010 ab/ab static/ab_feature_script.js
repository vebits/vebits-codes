function calculateFeatures() {
  /* eslint-disable */
  function random_hash() {
    let chars = "0123456789abcdef";
    let result = "0x";
    for (let i = 64; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  const tokenData = {
    hash: random_hash(),
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

  let rnd = new Random();
  let finalPalettes = getPalettes();
  let palette = weightFunction(
    finalPalettes,
    finalPalettes.map((p) => p.weight)
  );
  //palette = finalPalettes[0];

  let margin = weightFunction([0, 64, 128, 256], [2, 2, 1, 0.5]);
  let density = rnd.random_int(2, 32);

  let leftToRight = rnd.random_dec() > 0.5;
  let symmetry = rnd.random_dec() > 0.95;

  let color_strat = weightFunction(
    ["random", "sequential", "group", "duo", "tri"],
    [1, 3, 3, 1, 1]
  );

  let alpha = rnd.random_dec() > 0.7;

  let wobbly = rnd.random_dec() > 0.8;
  let straight = rnd.random_dec() > 0.95;

  let outlined = rnd.random_dec() > 0.95;
  let noFillAtAll = rnd.random_dec() > 0.98;
  let swap = false;

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

  if (palette.name === "red mono" || palette.name === "green mono") {
    alpha = true;
    outlined = false;
    density = rnd.random_int(10, 32);
  }

  // helpers
  function weightFunction(items, weights) {
    var sum = weights.reduce((p, n) => p + n, 0);
    var random = Math.floor(rnd.random_dec() * sum);

    for (let i = 0; i < items.length; i++) {
      sum -= weights[i];
      if (random >= sum) {
        return items[i];
      }
    }
  }

  function getPalettes() {
    return [
      {
        name: "warm",
        colors: ["#f78888", "#f3d250", "#ececec", "#90ccf4", "#5da2d5"],
        stroke: "#000",
        background: rnd.random_choice(["#ececec", "#5da2d5"]),
        weight: 3,
      },
      {
        name: "warm",
        colors: ["#f0ede6", "#d8c3a5", "#8e8d8a", "#e98074", "#e84a4f"],
        stroke: "#000",
        background: rnd.random_choice(["#f0ede6", "#e98074"]),
        weight: 3,
      },
      {
        name: "candy",
        colors: ["#edb7c7", "#f0ede6", "#bab2b5", "#123c69", "#ac3b61"],
        stroke: "#000",
        background: rnd.random_choice(["#f0ede6", "#edb7c7"]),
        weight: 3,
      },
      {
        name: "candy",
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
        name: "candy",
        colors: ["#f0ede6", "#207178", "#dc6378", "#f1c694", "#101652"],
        stroke: "#000",
        background: rnd.random_choice(["#f0ede6"]),
        weight: 3,
      },
      {
        name: "charcoal",
        colors: ["#464646", "#3c3c3c", "#323232", "#282828", "#1e1e1e"],
        stroke: "#fff",
        background: rnd.random_choice(["#1e1e1e"]),
        weight: 0.5,
      },
      {
        name: "red",
        colors: ["#260d0d", "#319190", "#ff4000", "#ffc803", "#f0ede6"],
        stroke: "#000",
        background: rnd.random_choice(["#f0ede6", "#319190", "#ff4000"]),
        weight: 3,
      },
      {
        name: "lava",
        colors: ["#D9BDAD", "#D9653B", "#BF9C8F", "#D94625", "#262626"],
        stroke: "#fff",
        background: rnd.random_choice(["#D9BDAD", "#D9653B", "#262626"]),
        weight: 2,
      },
      {
        name: "steel",
        colors: ["#A4B8BF", "#EBF0F2", "#6D878C", "#31403E", "#1A261C"],
        stroke: "#000",
        background: rnd.random_choice(["#EBF0F2", "#6D878C", "#1A261C"]),
        weight: 2,
      },
      {
        name: "blue",
        colors: ["#063940", "#195e63", "#3e838c", "#8ebdb6", "#f0ede6"],
        stroke: "#000",
        background: rnd.random_choice(["#f0ede6", "#8ebdb6"]),
        weight: 3,
      },
      {
        name: "claystone",
        colors: ["#008584", "#006666", "#f5f5f5", "#e9e9e9", "#cccccc"],
        stroke: "#fff",
        background: rnd.random_choice(["#006666"]),
        weight: 3,
      },
      {
        name: "moonshine",
        colors: ["#1E0D2E", "#341F4F", "#59428A", "#8C83E0", "#C0C6FF"],
        stroke: "#000",
        background: rnd.random_choice(["#C0C6FF", "#59428A"]),
        weight: 1,
      },
      {
        name: "firefox",
        colors: ["#F2911B", "#F2780C", "#F25C05", "#F24405", "#f0ede6"],
        stroke: "#000",
        background: rnd.random_choice(["#f0ede6"]),
        weight: 3,
      },
      {
        name: "firefox",
        colors: ["#f0ede6", "#594842", "#D9998B", "#F2C1B6", "#D98B84"],
        stroke: "#000",
        background: rnd.random_choice(["#f0ede6"]),
        weight: 3,
      },
      {
        name: "red mono",
        colors: ["#fff", "#fff"],
        stroke: "#fff",
        background: rnd.random_choice(["#951f2b"]),
        weight: 0.2,
      },
      {
        name: "green mono",
        colors: ["#fff", "#fff"],
        stroke: "#fff",
        background: rnd.random_choice(["#006666"]),
        weight: 0.2,
      },
    ];
  }

  let scene =
    margin === 0
      ? "Slice"
      : margin === 64
      ? "Slice 2"
      : margin === 128
      ? "Hillside"
      : "Hillside 2";

  let densityFeature =
    density === 2 || density === 3
      ? "Very high"
      : density > 3 && density < 10
      ? "High"
      : density >= 10 && density < 20
      ? "Medium"
      : density >= 20 && density < 25
      ? "Low"
      : "Very low";

  let flowDirection = "Flow direction";
  return {
    Palette: palette.name,
    Scene: scene,
    Density: densityFeature,
    flowDirection: symmetry
      ? "Both"
      : leftToRight
      ? "Left to right"
      : "Right to left",
  };
}

calculateFeatures();
