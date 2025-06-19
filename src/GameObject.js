import { events } from "./Events.js";
import { Vector2 } from "./Vector2.js";

export class GameObject {
  constructor({ position }) {
    this.position = position ?? new Vector2(0,0);
    this.children = [];
    this.parent = null;
  }

  stepEntry(delta, root) {
    this.children.forEach((child) => child.stepEntry(delta, root));

    this.step(delta, root);
  }

  step(_delta) {
    // also to do it every frame
  }

  draw(ctx, x, y) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.drawImage(ctx, drawPosX, drawPosY);

    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));

  }

  drawImage(ctx, drawPosX, drawPosY) {
    // using it later...
  }

  destroy() {
    this.children.forEach(child => {
      child.destroy();
    })
    this.parent.removeChild(this);
  }

  addChild(gameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject) {
    events.unsubscribe(gameObject);
    this.children = this.children.filter(g => {
      return gameObject !== g;
    })
  }
}