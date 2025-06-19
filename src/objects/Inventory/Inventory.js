import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";

export class Inventory extends GameObject {
  constructor() {
    super({
      position: new Vector2(0, 1)
    });

    this.nextId = 0;
    this.items = [
      {
        id: -1,
        image: resources.images.rod,
      },
      {
        id: -2,
        image: resources.images.rod,
      },
    ];

    events.on("HERO_PICKS_UP_ITEM", this, data => {
      this.items.push({
        id: this.nextId++,
        image: resources.images.rod,
      })
      // each time the hero picks up a rod
      this.renderInventory();
    })

    // test removing item from inventory
    /*setTimeout(() => {
      this.removeFromInventory(-2);
    }, 2000)*/

    // initial draw
    this.renderInventory();
  }

  renderInventory() {
    this.children.forEach(child => child.destroy());

    this.items.forEach((item, index) => {
      const sprite = new Sprite({
        resource: resources.images.rod,
        position: new Vector2(index*12,0)
      });
      this.addChild(sprite);
    })
  }

  removeFromInventory(id) {
    this.items = this.items.filter(item => {
      return item.id !== id;
    })
    this.renderInventory();
  }
}