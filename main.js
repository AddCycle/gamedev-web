import {resources} from "./src/Resource.js"
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./src/Vector2.js";
import { GameLoop } from "./src/GameLoop.js";
import { Input, DOWN, UP, LEFT, RIGHT } from "./src/Input.js";
import { gridCells, isSpaceFree } from "./src/helpers/grid.js";
import { moveTowards } from "./src/helpers/moveTowards.js";
import { walls } from "./src/levels/level1.js";
import { Animations } from "./src/Animations.js";
import { FrameIndexPattern } from "./src/FrameIndexPattern.js";
import { WALK_DOWN, WALK_UP, WALK_LEFT, WALK_RIGHT, STAND_DOWN, STAND_UP, STAND_RIGHT, STAND_LEFT } from "./src/objects/Hero/heroAnimations.js";

const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
});

const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
})

const hero = new Sprite({
    resource: resources.images.hero,
    frameSize: new Vector2(32,32),
    hFrames: 3,
    vFrames: 8,
    frame: 1,
    position: new Vector2(gridCells(6), gridCells(5)),
    animations: new Animations({
      walkDown: new FrameIndexPattern(WALK_DOWN),
      walkUp: new FrameIndexPattern(WALK_UP),
      walkRight: new FrameIndexPattern(WALK_RIGHT),
      walkLeft: new FrameIndexPattern(WALK_LEFT),
      standDown: new FrameIndexPattern(STAND_DOWN),
      standUp: new FrameIndexPattern(STAND_UP),
      standRight: new FrameIndexPattern(STAND_RIGHT),
      standLeft: new FrameIndexPattern(STAND_LEFT),
    })
})

const heroDestinationPos = hero.position.duplicate();
let heroFacing = DOWN;

const shadow = new Sprite({
    resource: resources.images.shadow,
    frameSize: new Vector2(32,32)
})

const input = new Input(); // keyboard handling

const update = (delta) => {

  const distance = moveTowards(hero, heroDestinationPos, 1);
  const hasArrived = distance <= 1;
  if (hasArrived) {
    tryMove()
  }

  hero.step(delta);

};

const tryMove = () => {

  if (!input.direction) {
    if (heroFacing === LEFT) {hero.animations.play("standLeft")};
    if (heroFacing === RIGHT) {hero.animations.play("standRight")};
    if (heroFacing === DOWN) {hero.animations.play("standDown")};
    if (heroFacing === UP) {hero.animations.play("standUp")};
  }

  let nextX = heroDestinationPos.x;
  let nextY = heroDestinationPos.y;
  const gridSize = 16;

  if (input.direction === DOWN) {
    nextY += gridSize;
    hero.animations.play("walkDown");
  }
  if (input.direction === UP) {
    nextY -= gridSize;
    hero.animations.play("walkUp");
  };
  if (input.direction === RIGHT) {
    nextX += gridSize;
    hero.animations.play("walkRight");
  }
  if (input.direction === LEFT) {
    nextX -= gridSize;
    hero.animations.play("walkLeft");
  }
  heroFacing = input.direction ?? heroFacing;

  if (isSpaceFree(walls, nextX, nextY)) {
    heroDestinationPos.x = nextX;
    heroDestinationPos.y = nextY;
  }
}

const draw = () => {
    skySprite.drawImage(ctx, 0, 0);
    groundSprite.drawImage(ctx, 0, 0);

    const heroOffset = new Vector2(-8, -20);
    const heroPosX = hero.position.x+heroOffset.x;
    const heroPosY = hero.position.y+heroOffset.y;
    shadow.drawImage(ctx, heroPosX, heroPosY);
    hero.drawImage(ctx, heroPosX, heroPosY);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();