import { Vector2 } from "./src/Vector2.js";
import { GameLoop } from "./src/GameLoop.js";
import { events } from "./src/Events.js";
import { Main } from "./src/objects/Main/Main.js";
import { OutdoorLevel1 } from "./src/levels/OutdoorLevel1.js";
import { CaveLevel1 } from "./src/levels/CaveLevel1.js";

const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext("2d");

const mainScene = new Main({
  position: new Vector2(0,0)
});
mainScene.setLevel(new OutdoorLevel1());

const update = (delta) => {
  mainScene.stepEntry(delta, mainScene)
};

const draw = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  mainScene.drawBackground(ctx);

  ctx.save();

  if (mainScene.camera)
    ctx.translate(mainScene.camera.position.x, mainScene.camera.position.y);

  mainScene.draw(ctx, 0, 0);

  ctx.restore();

  mainScene.drawForeground(ctx);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();