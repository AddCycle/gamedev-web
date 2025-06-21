import { Animations } from "../../Animations.js";
import { events } from "../../Events.js";
import { FrameIndexPattern } from "../../FrameIndexPattern.js";
import { GameObject } from "../../GameObject.js";
import { isSpaceFree } from "../../helpers/grid.js";
import { moveTowards } from "../../helpers/moveTowards.js";
import { DOWN, UP, LEFT, RIGHT } from "../../Input.js";
import { resources } from "../../Resources.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { Walls } from "../Level/Walls.js";
import { PICK_UP_DOWN, STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from "./heroAnimations.js";

export class Hero extends GameObject {
  constructor(x,y,facingDirection) {
    super({
      position: new Vector2(x,y)
    });

    const shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32,32),
      position: new Vector2(-8, -19)
    });
    this.addChild(shadow);

    this.body = new Sprite({
      resource: resources.images.hero,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 8,
      frame: 1,
      position: new Vector2(-8,-20),
      animations: new Animations({
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        standDown: new FrameIndexPattern(STAND_DOWN),
        standUp: new FrameIndexPattern(STAND_UP),
        standRight: new FrameIndexPattern(STAND_RIGHT),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        pickUpDown: new FrameIndexPattern(PICK_UP_DOWN),
      })
    })
    this.addChild(this.body);

    this.facingDirection = facingDirection ?? DOWN;
    this.destinationPosition = this.position.duplicate();
    this.itemPickupTime = 0;
    this.itemPickupShell = null;

    events.on("HERO_PICKS_UP_ITEM", this, data => {
      this.onPickUpItem(data);
    })
  }

  step(delta, root) {
    if (this.itemPickupTime > 0) {
      this.workOnItemPickup(delta);
      return;
    }

    const distance = moveTowards(this, this.destinationPosition, 1);
    const hasArrived = distance <= 1;
    if (hasArrived) {
      this.tryMove(root)
    }
    this.tryEmitPosition();
  }

  tryEmitPosition() {
    if (this.lastX === this.position.x && this.lastY === this.position.y) return;

    this.lastX = this.position.x;
    this.lastY = this.position.y;
    events.emit("HERO_POSITION", this.position);
  }

  tryMove(root) {
    const {input} = root;

    if (!input.direction) {
      if (this.facingDirection === LEFT) { this.body.animations.play("standLeft") };
      if (this.facingDirection === RIGHT) { this.body.animations.play("standRight") };
      if (this.facingDirection === DOWN) { this.body.animations.play("standDown") };
      if (this.facingDirection === UP) { this.body.animations.play("standUp") };
    }

    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;
    const gridSize = 16;

    if (input.direction === DOWN) {
      nextY += gridSize;
      this.body.animations.play("walkDown");
    }
    if (input.direction === UP) {
      nextY -= gridSize;
      this.body.animations.play("walkUp");
    };
    if (input.direction === RIGHT) {
      nextX += gridSize;
      this.body.animations.play("walkRight");
    }
    if (input.direction === LEFT) {
      nextX -= gridSize;
      this.body.animations.play("walkLeft");
    }
    this.facingDirection = input.direction ?? this.facingDirection;
    const solidBodyAt = this.parent.children.find(c => {
      return c.isSolid && c.position.x === nextX && c.position.y === nextY
    });

    if (isSpaceFree(root.level?.walls, nextX, nextY) && !solidBodyAt) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
  }

  onPickUpItem({ image, position }) {
    this.destinationPosition = position.duplicate();

    this.itemPickupTime = 500; // ms

    this.itemPickupShell = new GameObject({});
    this.itemPickupShell.addChild(new Sprite({
      resource: image,
      position: new Vector2(0, -18)
    }))
    this.addChild(this.itemPickupShell);
  }

  workOnItemPickup(delta) {
    this.itemPickupTime -= delta;
    this.body.animations.play("pickUpDown");
    
    if (this.itemPickupTime <= 0) {
      this.itemPickupShell.destroy();
    }
  }
}