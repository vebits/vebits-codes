class Random {
  constructor(seed) {
    this.seed = seed;
  }

  random_dec() {
    this.seed ^= this.seed << 13;
    this.seed ^= this.seed >> 17;
    this.seed ^= this.seed << 5;
    return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % 1000) / 1000;
  }

  random_between(a, b) {
    return a + (b - a) * this.random_dec();
  }

  random_int(a, b) {
    return Math.floor(this.random_between(a, b + 1));
  }

  random_choice(x) {
    return x[Math.floor(this.random_between(0, x.length * 0.99))];
  }
}

export default Random;

export function random_hash() {
  let chars = "0123456789abcdef";
  let result = "0x";
  for (let i = 64; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
