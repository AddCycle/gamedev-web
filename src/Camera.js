import { events } from "./Events.js";
import { GameObject } from "./GameObject.js"
import { Vector2 } from "./Vector2.js";

export class Camera extends GameObject {
  constructor() {
    super({});

    events.on("HERO_POSITION", this, heroPosition => {
      this.centerPositionOnTarget(heroPosition);
    })

    events.on("CHANGE_LEVEL", this, (newMap) => {
      console.log(newMap);
      this.centerPositionOnTarget(newMap.heroStartPosition);
    })
  }

  centerPositionOnTarget(pos) {
    const personHalf = 8;
    const canvasWidth = 320;
    const canvasHeight = 180;
    const halfWidth = -personHalf + canvasWidth / 2;
    const halfHeight = -personHalf + canvasHeight / 2;
    // console.log("Hero moved !", pos)
    this.position = new Vector2(
      -pos.x + halfWidth,
      -pos.y + halfHeight
    );
  }
}