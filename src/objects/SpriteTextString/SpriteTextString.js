import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";

export class SpriteTextString extends GameObject {
  constructor(str) {
    super({
      position: new Vector2(32, 108)
    });
    const content = str ?? "Default text";

    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });
  }

  drawImage(ctx, drawPosX, drawPosY) {
    this.backdrop.drawImage(ctx, drawPosX, drawPosY);
  }
}