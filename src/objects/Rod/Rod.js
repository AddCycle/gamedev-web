import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";

export class Rod extends GameObject {
  constructor(x,y) {
    super({
      position: new Vector2(x,y)
    });

    const sprite = new Sprite({
      resource: resources.images.rod,
      position: new Vector2(0, -5),
    });
    this.addChild(sprite);

    events.on("HERO_POSITION", this, pos => {
      const roundedHeroX = Math.round(pos.x);
      const roundedHeroY = Math.round(pos.y);
      if (this.position.x === roundedHeroX && this.position.y === roundedHeroY) {
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero() {
    this.destroy();

    events.emit("HERO_PICKS_UP_ITEM", {
      image: resources.images.rod,
      position: this.position,
    })
  }
}