import React from "react";
import styled from "styled-components";

const Page = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 0px 24px 0px;
  max-width: 1280px;
  width: 100%;

  @media (max-width: 1280px) {
    padding: 24px 12px 24px 12px;
  }
`;

const H1 = styled.h1`
  font-size: 24px;
  margin: 0;
  font-weight: 400;
`;

const IFrame = styled.iframe`
  margin-top: 12px;
  flex: 1;
  border: none;
  padding: 0px;
`;

function Dendro() {
  const iframeContent = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/><meta charset="utf-8"/>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js"></script>
            <script>
              function resizeIframe(obj) {
                obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
              }
            </script>
            <script>
              function random_hash() {
                let chars = "0123456789abcdef";
                let result = "0x";
                for (let i = 64; i > 0; --i)
                  result += chars[Math.floor(Math.random() * chars.length)];
                return result;
              }
              
              let tokenData = {
                hash: random_hash(),
              };
              console.log("Hash:", tokenData.hash)
            </script>
            <script>
            class Random {
              constructor() {
                this.useA = !1;
                function e(e) {
                  let n = parseInt(e.substr(0, 8), 16),
                    o = parseInt(e.substr(8, 8), 16),
                    r = parseInt(e.substr(16, 8), 16),
                    t = parseInt(e.substr(24, 8), 16);
                  return function () {
                    (n |= 0), (o |= 0), (r |= 0), (t |= 0);
                    var e = (((n + o) | 0) + t) | 0;
                    return (
                      (t = (t + 1) | 0),
                      (n = o ^ (o >>> 9)),
                      (o = (r + (r << 3)) | 0),
                      (r = ((r = (r << 21) | (r >>> 11)) + e) | 0),
                      (e >>> 0) / 4294967296
                    );
                  };
                }
                (this.prngA = new e(tokenData.hash.substr(2, 32))),
                  (this.prngB = new e(tokenData.hash.substr(34, 32)));
                for (let e = 0; e < 1e6; e += 2) this.prngA(), this.prngB();
              }
              random_dec() {
                return (this.useA = !this.useA), this.useA ? this.prngA() : this.prngB();
              }
              random_num(e, n) {
                return e + (n - e) * this.random_dec();
              }
              random_int(e, n) {
                return Math.floor(this.random_num(e, n + 1));
              }
              random_bool(e) {
                return this.random_dec() < e;
              }
              random_choice(e) {
                return e[this.random_int(0, e.length - 1)];
              }
            }
            let width,
              height,
              dim =
                (window.innerHeight >= +Math.sqrt(2) * window.innerWidth
                  ? ((width = window.innerWidth),
                    (height = +Math.sqrt(2) * window.innerWidth))
                  : ((height = window.innerHeight),
                    (width = window.innerHeight / Math.sqrt(2))),
                Math.min(width, height)),
              m = dim / 1e3,
              rnd,
              seed,
              palettes,
              palette,
              colors,
              spice,
              poly_col,
              options,
              startXx,
              startYy,
              r,
              i,
              uniformBrushWgt,
              brush,
              brushWgt,
              poly,
              colStrat,
              edges,
              edgesFrag,
              bug,
              bug2,
              density,
              frag,
              cont,
              fill_poly,
              frame,
              colVar,
              mono,
              bg,
              ff,
              padding = 198 * m;
            function setup() {
              (rnd = new Random()),
                createCanvas(width, height),
                frameRate(30),
                colorMode(RGB, 255, 255, 255, 1),
                rectMode(CENTER),
                strokeJoin(ROUND),
                (seed = parseInt(tokenData.hash.slice(0, 16), 16)),
                noiseSeed(seed),
                (palettes = getPalettes()),
                (palette = weightFunction(
                  palettes,
                  palettes.map((e) => e.wgt)
                )),
                (colors = palette.colors),
                (spice = palette.spice),
                (brush = weightFunction(
                  ["line", "point", "square", "circle"],
                  [9, 3, 1, 3]
                )),
                (brushWgt = weightFunction(["fixed", "variable"], [1, 1])),
                (brushUni = weightFunction([1, 2, 4], [1, 4, 1])),
                (density = weightFunction(["low", "normal", "high"], [1, 3, 3])),
                (colStrat = weightFunction(["rnd", "seq", "group"], [1, 2, 10])),
                (poly = weightFunction(["framed", "fill", "both", "none"], [1, 1, 0, 6])),
                (edges = weightFunction(["crisp", "rough", "ooc"], [3, 1, 1])),
                (edgesFrag = 0.6 < rnd.random_dec()),
                (cont = 0.2 < rnd.random_dec()),
                (bg = 0.8 < rnd.random_dec()),
                (ff = 0.95 < rnd.random_dec()),
                (bug = 0.97 < rnd.random_dec()),
                (bug2 = 0.99 < rnd.random_dec()),
                (strCap = 0.5 < rnd.random_dec()) && strokeCap(SQUARE),
                ff && ((poly = "none"), (bug = !1), (edges = "crisp"), (edgesFrag = !1)),
                ("point" !== brush && "circle" !== brush) ||
                  "fixed" !== brushWgt ||
                  (brushUni = rnd.random_int(1, 2)),
                "crisp" === edges && (edgesFrag = !1),
                "low" === density && (cont = !0),
                "Riso" === palette.n &&
                  ((bg = !0),
                  (poly = "none"),
                  (bug = !1),
                  (bug2 = !1),
                  (cont = !1),
                  (colStrat = "rnd")),
                "Riso 2" === palette.n &&
                  ((poly = "none"),
                  (bg = !0),
                  (bug = !1),
                  (bug2 = !1),
                  (cont = !1),
                  (colStrat = "rnd")),
                [
                  "Amberwood Ring",
                  "Elm Tree Echoes",
                  "Aspen Bark Grey",
                  "Hazelwood Harmony",
                  "Acacia Aura",
                ].includes(palette.n) && (colStrat = "rnd");
              var e = ["Redwood", "Bluewood", "Yellowwood", "Purplewood"].includes(
                palette.n
              );
              "none" === (poly = e && "ooc" === edges ? "none" : poly) ||
                e ||
                (poly_col = (spice.length ? get_rnd_spice : get_rnd_color)());
              e &&
                ((colStrat = "group"),
                (poly_col = "#edd7b9"),
                (colors[1] = "fill" === poly || "both" === poly ? "#040404" : "#edd7b9"),
                0.75 < rnd.random_dec()) &&
                ((colors[1] = "fill" === poly || "both" === poly ? "#edd7b9" : "#040404"),
                (palette.bg = "#efe5d1"),
                (poly_col = "#040404")),
                bug &&
                  ((brush = "line"),
                  (density = 0.5 < rnd.random_dec() ? "low" : "normal"),
                  (brushWgt = "variable")),
                bug2 &&
                  ((brush = "line"),
                  (brushWgt = "variable"),
                  (poly = "none"),
                  (density = "high"),
                  (bug = !0)),
                (options = {
                  scale: 500,
                  resolution: 1,
                  numPoints: "line" === brush ? 5e3 : 1e3,
                  numRings: "low" === density ? 150 : "normal" === density ? 250 : 500,
                  radius: bug2 ? 3e3 * m : 1e3 * m,
                }),
                (startXx = rnd.random_num(0, width)),
                (startYy = rnd.random_num(250 * m, height - 250 * m)),
                (r = options.radius),
                (i = 0),
                (uniformBrushWgt =
                  "line" === brush || "point" === brush ? brushUni * m * 2 : brushUni * m),
                "seq" === colStrat && 0.5 < rnd.random_dec() && colors.reverse(),
                (bg_col =
                  palette.bg ||
                  (bg ? (spice.length ? get_rnd_spice : get_rnd_color)() : "#efe5d1")),
                background(color(bg_col)),
                "Riso 2" === palette.n &&
                  ((mono_col = get_mono_color(3.5)), (palette.stroke = mono_col)),
                2 === colors.length &&
                  ((main_col1 = colors[0]), (main_col2 = colors[1]), (swi = !1)),
                (keyPressed = function () {
                  80 === keyCode && saveCanvas("dendro_" + tokenData.hash, "png");
                });
            }
            function draw() {
              if (!cont && 0.95 < rnd.random_dec()) {
                let e = 0;
                for (var n = rnd.random_int(2, 10); e < n; )
                  (r -= options.radius / options.numRings), e++;
              }
              if ((0 === i && draw_bg(poly_col), 0.1 < r)) {
                var e,
                  o = startXx * options.resolution,
                  t = startYy * options.resolution,
                  l =
                    (noFill(),
                    palette.stroke
                      ? stroke(palette.stroke)
                      : "seq" === colStrat
                      ? ((e = [...colors, ...spice]), stroke(e[i % e.length]))
                      : "rnd" === colStrat
                      ? ((e = [...colors, ...spice]),
                        stroke(e[rnd.random_int(0, e.length - 1)]))
                      : "group" === colStrat && 2 != colors.length
                      ? (0.975 < rnd.random_dec() && colors.reverse(),
                        0.1 < rnd.random_dec()
                          ? i < options.numRings / 2
                            ? stroke(colors[rnd.random_int(0, colors.length / 2 - 1)])
                            : stroke(
                                colors[rnd.random_int(colors.length / 2, colors.length - 1)]
                              )
                          : ((e = spice.length ? spice : colors),
                            stroke(e[rnd.random_int(0, e.length - 1)])))
                      : (0.975 < rnd.random_dec() && (swi = !swi),
                        0.1 < rnd.random_dec()
                          ? i < options.numRings / 2
                            ? stroke(swi ? main_col1 : main_col2)
                            : stroke(swi ? main_col2 : main_col1)
                          : ((e = spice.length ? spice : colors),
                            stroke(e[rnd.random_int(0, e.length - 1)]))),
                    "variable" === brushWgt
                      ? strokeWeight(rnd.random_int(1, 4) * m)
                      : strokeWeight(uniformBrushWgt),
                    edgesFrag ||
                      ("crisp" === edges
                        ? (bleed = 0)
                        : "rough" === edges
                        ? (bleed = rnd.random_num(-20, 20) * m)
                        : "ooc" === edges && (bleed = rnd.random_num(-100, 100) * m)),
                    "line" === brush ? 6.286 : 6.275);
                for (
                  beginShape(), a = -TAU / options.numPoints;
                  a <= l;
                  a += TAU / options.numPoints
                ) {
                  var s = o + r * cos(a),
                    d = t + r * sin(a),
                    c = map(
                      noise(s / width, d / height),
                      0,
                      1,
                      -options.scale,
                      options.scale
                    ),
                    s = s + c * m,
                    d = d + c * m;
                  if (
                    (edgesFrag &&
                      ("crisp" === edges
                        ? (bleed = 0)
                        : "rough" === edges
                        ? (bleed = rnd.random_num(-20, 20) * m)
                        : "ooc" === edges && (bleed = rnd.random_num(-100, 100) * m)),
                    !bug2)
                  )
                    if (ff) {
                      if (
                        s < -100 * m ||
                        s > width + 100 * m ||
                        d > height + 100 * m ||
                        d < 0 - 100 * m
                      ) {
                        endShape(), beginShape();
                        continue;
                      }
                    } else if (
                      s < padding + bleed ||
                      s > width - padding + bleed ||
                      d > height - padding + bleed ||
                      d < padding + bleed
                    ) {
                      endShape(), beginShape();
                      continue;
                    }
                  "square" === brush
                    ? "variable" === brushWgt
                      ? square(s, d, rnd.random_int(1, 4) * m)
                      : square(s, d, uniformBrushWgt)
                    : "point" === brush
                    ? "variable" === brushWgt
                      ? (strokeWeight(rnd.random_int(1, 4) * m), point(s, d))
                      : point(s, d, uniformBrushWgt)
                    : "circle" === brush
                    ? "variable" === brushWgt
                      ? circle(s, d, rnd.random_int(1, 4) * m)
                      : (noFill(), circle(s, d, uniformBrushWgt))
                    : "line" === brush &&
                      (bug
                        ? (fill(colors[rnd.random_int(0, colors.length - 1)]),
                          stroke("#040404"),
                          strokeWeight(rnd.random_int(1, 4) * m),
                          curveVertex(s, d),
                          rnd.random_dec() > 0.75 - 0.25 * sin(r / m) &&
                            (endShape(), beginShape()))
                        : curveVertex(s, d));
                }
                endShape();
              } else granulate(10 * m), noLoop();
              (r -= options.radius / options.numRings), i++;
            }
            function draw_bg(e) {
              let n, o, r, t, l, s, d, i;
              var a;
              "none" !== poly &&
                ((a = "framed" === poly || "both" === poly ? 10 * m : 5 * m),
                (n = padding - a),
                (o = padding - a),
                (r = width - padding + a),
                (t = padding - a),
                (l = width - padding + a),
                (s = height - padding + a),
                (d = padding - a),
                (i = height - padding + a),
                draw_poly(
                  [
                    ...get_lerps(n, o, r, t),
                    ...get_lerps(r, t, l, s),
                    ...get_lerps(l, s, d, i),
                    ...get_lerps(d, i, n, o),
                  ],
                  e
                ));
            }
            function get_lerps(n, o, r, t) {
              var l = [];
              for (let e = 0; e <= 1; e += 0.2)
                (x = lerp(n, r, e)), (y = lerp(o, t, e)), l.push(get_point(x, y, 10 * m));
              return l;
            }
            function draw_poly(e, n) {
              noStroke(),
                noFill(),
                "framed" === poly
                  ? (strokeWeight(10 * m), stroke(n))
                  : "fill" === poly
                  ? fill(n)
                  : (fill(n), stroke("#fff"), strokeWeight(10 * m)),
                beginShape(),
                e.forEach((e) => vertex(e[0], e[1])),
                endShape(CLOSE);
            }
            function get_point(e, n, o) {
              return [
                e + (noise(e / (2 * m), n / (8 * m), 5) - 0.5) * o,
                n + (noise(e / (8 * m), n / (2 * m), 1) - 0.5) * o,
              ];
            }
            function trim_array(e, n) {
              for (; e.length > n; ) {
                var o = Math.floor(rnd.random_dec() * e.length);
                e.splice(o, 1);
              }
            }
            function get_rnd_spice() {
              return spice.splice(Math.floor(rnd.random_dec() * spice.length), 1)[0];
            }
            function get_rnd_color() {
              return colors.splice(Math.floor(rnd.random_dec() * colors.length), 1)[0];
            }
            function get_mono_color(e) {
              for (
                mono_col_rgb = get_rnd_color();
                contrast(hex_to_rgb(bg_col), hex_to_rgb(mono_col_rgb)) < e;
            
              )
                mono_col_rgb = get_rnd_color();
              return mono_col_rgb;
            }
            function hex_to_rgb(e) {
              e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
              return e
                ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
                : null;
            }
            function contrast(e, n) {
              (e = luminance(e[0], e[1], e[2])), (n = luminance(n[0], n[1], n[2]));
              return (Math.max(e, n) + 0.05) / (Math.min(e, n) + 0.05);
            }
            function luminance(e, n, o) {
              e = [e, n, o].map(function (e) {
                return (e /= 255) <= 0.03928
                  ? e / 12.92
                  : Math.pow((e + 0.055) / 1.055, 2.4);
              });
              return 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
            }
            function granulate(n) {
              loadPixels();
              var e = pixelDensity(),
                o = width * e * 4 * (height * e);
              for (let e = 0; e < o; e += 4) {
                var r = rnd.random_num(-n, n);
                (pixels[e] = pixels[e] + r),
                  (pixels[e + 1] = pixels[e + 1] + r),
                  (pixels[e + 2] = pixels[e + 2] + r);
              }
              updatePixels();
            }
            function weightFunction(n, o) {
              let r = o.reduce((e, n) => e + n, 0);
              var t = Math.floor(rnd.random_dec() * r);
              for (let e = 0; e < n.length; e++) if (t >= (r -= o[e])) return n[e];
              return n[0];
            }
            function getPalettes() {
              return [
                {
                  n: "Jacaranda Joys",
                  colors: [
                    "#845991",
                    "#775D7A",
                    "#6C5D80",
                    "#FFB511",
                    "#FFAE3B",
                    "#F6A04D",
                  ],
                  spice: ["#62A8E5", "#4982CF", "#235BA8", "#000000", "#ffffff", "#999fa0"],
                  stroke: null,
                  borderStroke: null,
                  bg: null,
                  single: {},
                  wgt: 2,
                },
                {
                  n: "Amberwood Ring",
                  colors: [
                    "#eabe92",
                    "#f27a70",
                    "#2a7038",
                    "#efad3a",
                    "#d73a30",
                    "#226197",
                    "#1c1c1c",
                  ],
                  spice: [],
                  stroke: null,
                  borderStroke: null,
                  bg: null,
                  single: {},
                  wgt: 3,
                },
                {
                  n: "Elm Tree Echoes",
                  colors: [
                    "#eedeca",
                    "#35201a",
                    "#35346b",
                    "#605357",
                    "#ebac3d",
                    "#297358",
                    "#DF5457",
                    "#e74738",
                    "#d06498",
                  ],
                  spice: [],
                  stroke: null,
                  borderStroke: null,
                  bg: null,
                  single: {},
                  wgt: 2,
                },
                {
                  n: "Aspen Bark Grey",
                  colors: [
                    "#0f1614",
                    "#ffffff",
                    "#ffd636",
                    "#f097dc",
                    "#3ab0ee",
                    "#ff5341",
                    "#efce3e",
                    "#d7d6d8",
                    "#a09fa1",
                  ],
                  spice: [],
                  stroke: null,
                  borderStroke: null,
                  bg: null,
                  single: {},
                  wgt: 2,
                },
                {
                  n: "Hazelwood Harmony",
                  colors: [
                    "#3d4559",
                    "#f2b9b5",
                    "#f3dab9",
                    "#878892",
                    "#bcb1aa",
                    "#5e6987",
                    "#c74636",
                    "#e87262",
                    "#1e5775",
                    "#f8bb4c",
                    "#639cbe",
                  ],
                  spice: [],
                  stroke: null,
                  borderStroke: null,
                  bg: null,
                  single: {},
                  wgt: 3,
                },
                {
                  n: "Acacia Aura",
                  colors: [
                    "#ea87a8",
                    "#f6ccaf",
                    "#81a7a8",
                    "#256465",
                    "#87adad",
                    "#b5735b",
                    "#f7ae44",
                    "#599ad6",
                    "#23201f",
                    "#f6efe9",
                    "#c2c3c7",
                    "#f19f3f",
                    "#e34f30",
                  ],
                  spice: [],
                  stroke: null,
                  borderStroke: null,
                  bg: null,
                  single: {},
                  wgt: 2,
                },
                {
                  n: "Alderwood Ashes",
                  colors: [
                    "#87dfe8",
                    "#83d0d8",
                    "#6daeb5",
                    "#e87948",
                    "#ef6c32",
                    "#cc5e2d",
                  ],
                  spice: ["#f0bba4", "#2a494e", "#351515"],
                  stroke: null,
                  borderStroke: null,
                  bg: "#fef1e5",
                  single: {},
                  wgt: 1,
                },
                {
                  n: "Eucalyptus",
                  colors: ["#00A95C", "#407060"],
                  spice: ["#B8C7C4", "#397E58", "#19975D"],
                  stroke: null,
                  borderStroke: null,
                  bg: "#f0ede6",
                  single: {},
                  wgt: 1,
                },
                {
                  n: "Grey Alder",
                  colors: ["#C24F5D", "#70747C"],
                  spice: ["#A5AAA8", "#9E4C6E", "#928D88"],
                  stroke: null,
                  borderStroke: null,
                  bg: "#260c14",
                  single: {},
                  wgt: 2,
                },
                {
                  n: "Kayenta",
                  colors: ["#f0ede6", "#f1c694"],
                  spice: ["#dc6378", "#207178", "#101652"],
                  stroke: null,
                  bg: null,
                  single: {},
                  wgt: 1,
                },
                {
                  n: "Obsidian",
                  colors: ["#464646", "#323232"],
                  spice: ["#3c3c3c", "#282828", "#1e1e1e"],
                  stroke: null,
                  borderStroke: "#f0ede6",
                  bg: "#040404",
                  single: {},
                  wgt: 1,
                },
                {
                  n: "Moonshine",
                  colors: ["#59428A", "#341F4F"],
                  spice: ["#C0C6FF", "#8C83E0", "#1E0D2E"],
                  stroke: null,
                  bg: null,
                  single: {},
                  wgt: 1,
                },
                {
                  n: "Magnolia",
                  colors: ["#666666", "#f13da5"],
                  spice: [
                    "#3c3c3c",
                    "#000000",
                    "#e2e3d6",
                    "#808080",
                    "#a52212",
                    "#b82715",
                    "#f23625",
                    "#f2aa56",
                    "#f26273",
                    "#dd3749",
                    "#f36fbf",
                  ],
                  stroke: null,
                  borderStroke: null,
                  bg: "#3c3c3c",
                  single: {},
                  wgt: 2,
                },
                {
                  n: "Piet",
                  colors: [
                    "#E45D50",
                    "#FF665E",
                    "#F15060",
                    "#62A8E5",
                    "#4982CF",
                    "#235BA8",
                  ],
                  spice: ["#000000", "#999fa0", "#fac145", "#efb44d"],
                  stroke: null,
                  borderStroke: null,
                  bg: null,
                  single: {},
                  wgt: 2,
                },
                {
                  n: "Willow Wisps",
                  colors: ["#000000", "#58519f"],
                  spice: ["#2f1c42", "#2c85ac", "#f59634", "#f26228", "#eb74b1", "#cd67a9"],
                  stroke: null,
                  borderStroke: null,
                  bg: null,
                  single: {},
                  wgt: 1,
                },
                {
                  n: "Yellowwood",
                  colors: ["#efb44d", "#edd7b9"],
                  spice: [],
                  stroke: null,
                  borderStroke: null,
                  bg: "#040404",
                  mono: null,
                  single: {},
                  wgt: 2,
                },
                {
                  n: "Redwood",
                  colors: ["#cb3d2d", "#edd7b9"],
                  spice: [],
                  stroke: null,
                  borderStroke: null,
                  bg: "#040404",
                  mono: null,
                  single: {},
                  wgt: 2,
                },
                {
                  n: "Bluewood",
                  colors: ["#4982CF", "#edd7b9"],
                  spice: [],
                  stroke: null,
                  borderStroke: null,
                  bg: "#040404",
                  mono: null,
                  single: {},
                  wgt: 2,
                },
                {
                  n: "Purplewood",
                  colors: ["#9D7AD2", "#edd7b9"],
                  spice: [],
                  stroke: null,
                  borderStroke: null,
                  bg: "#040404",
                  mono: null,
                  single: {},
                  wgt: 2,
                },
                {
                  n: "Maple",
                  colors: [
                    "#e45d37",
                    "#dd594c",
                    "#d64a3c",
                    "#fac145",
                    "#f7a137",
                    "#f5802e",
                  ],
                  spice: ["#000000", "#999fa0", "#133f30", "#1b4d3f", "#0f4d86", "#3679c4"],
                  stroke: null,
                  borderStroke: null,
                  bg: null,
                  single: {},
                  wgt: 2,
                },
                {
                  n: "Riso 2",
                  colors: [
                    "#914e72",
                    "#0078bf",
                    "#3255a4",
                    "#3d5588",
                    "#765ba7",
                    "#00838a",
                    "#407060",
                    "#925f52",
                    "#ffe800",
                    "#d2515e",
                    "#4982cf",
                    "#0074a2",
                    "#235ba8",
                    "#484d7a",
                    "#435060",
                    "#d5e4c0",
                    "#70747c",
                    "#5f8289",
                    "#375e77",
                    "#5e695e",
                    "#397e58",
                    "#516e5a",
                    "#4a635d",
                    "#68724d",
                    "#62c2b1",
                    "#237e74",
                    "#2f6165",
                    "#aa60bf",
                    "#845991",
                    "#775d7a",
                    "#6c5d80",
                    "#d1517a",
                    "#9e4c6e",
                    "#a75154",
                    "#e3ed55",
                    "#ffb511",
                    "#ffae3b",
                    "#f6a04d",
                    "#bd6439",
                    "#8e595a",
                    "#f2cdcf",
                    "#f984ca",
                    "#e6b5c9",
                    "#5ec8e5",
                    "#82d8d5",
                    "#F7FF00",
                    "#44d62c",
                  ],
                  spice: [],
                  stroke: null,
                  borderStroke: null,
                  bg: null,
                  single: {},
                  wgt: 1,
                },
                {
                  n: "Riso",
                  colors: [
                    "#0078BF",
                    "#00A95C",
                    "#F15060",
                    "#00838A",
                    "#BB8B41",
                    "#D2515E",
                    "#FF6C2F",
                    "#FF48B0",
                    "#AC936E",
                    "#FF7477",
                    "#62A8E5",
                    "#235BA8",
                    "#B8C7C4",
                    "#70747C",
                    "#00AA93",
                    "#19975D",
                    "#62C2B1",
                    "#BB76CF",
                    "#9D7AD2",
                    "#BD6439",
                    "#F984CA",
                    "#914E72",
                    "#FF4C65",
                  ],
                  spice: [],
                  stroke: 0.5 < rnd.random_dec() ? "#fff" : "#000",
                  borderStroke: null,
                  bg: null,
                  single: {},
                  wgt: 2,
                },
              ];
            }
            </script>
            <style type="text/css";>
            html {
              height: 100%;
            }
            body {
              min-height: 100%;
              margin: 0;
              padding: 0;
            }
            canvas {
              padding: 0;
              margin: auto;
              display: block;
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
            }</style>
        </head>
    </html>
`;

  return (
    <Page>
      <H1>DENDRO GENERATOR</H1>
      <IFrame title="Dendro" srcDoc={iframeContent} />
    </Page>
  );
}

export default Dendro;
