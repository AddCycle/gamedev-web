export class Walls {
  constructor() {
    this.walls = new Set();
  }

  addWall(x, y) {
    this.walls.add(`${x * 16},${y * 16}`);
  }

  addVertical(x, y, length) {
    for (let i = 0; i < length; i++) {
      this.addWall(x, y - i);
    }
  }

  addHorizontal(x, y, length) {
    for (let i = 0; i < length; i++) {
      this.addWall(x + i, y);
    }
  }

  has(str) {
    this.walls.has(str);
  }
}