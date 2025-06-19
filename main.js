import {resources} from "./src/Resource.js"
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./src/Vector2.js";
import { GameLoop } from "./src/GameLoop.js";
import { Input } from "./src/Input.js";
import { gridCells } from "./src/helpers/grid.js";
import { GameObject } from "./src/GameObject.js";
import { Hero } from "./src/objects/Hero/Hero.js";
import { events } from "./src/Events.js";
import { Camera } from "./src/Camera.js";

const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext("2d");

const mainScene = new GameObject({
  position: new Vector2(0,0)
});

const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
});

const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
})
mainScene.addChild(groundSprite)

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero)

mainScene.input = new Input(); // keyboard handling

const camera = new Camera();
mainScene.addChild(camera);

const update = (delta) => {
  mainScene.stepEntry(delta, mainScene)
};

const draw = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  skySprite.draw(ctx, 0, 0);

  ctx.save();

  ctx.translate(camera.position.x, camera.position.y);

  mainScene.draw(ctx, 0, 0);

  ctx.restore();
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();