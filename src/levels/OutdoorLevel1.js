import { events } from "../Events.js";
import { gridCells } from "../helpers/grid.js";
import { DOWN, RIGHT } from "../Input.js";
import { Exit } from "../objects/Exit/Exit.js";
import { Hero } from "../objects/Hero/Hero.js";
import { Level } from "../objects/Level/Level.js";
import { Walls } from "../objects/Level/Walls.js";
import { Rod } from "../objects/Rod/Rod.js";
import { resources } from "../Resources.js";
import { Sprite } from "../Sprite.js";
import { Vector2 } from "../Vector2.js";
import { CaveLevel1 } from "./CaveLevel1.js";

export class OutdoorLevel1 extends Level {
  constructor(params={}) {
    super({});
    this.background = new Sprite({
      resource: resources.images.sky,
      frameSize: new Vector2(320, 180)
    });

    const groundSprite = new Sprite({
      resource: resources.images.ground,
      frameSize: new Vector2(320, 180)
    });
    this.addChild(groundSprite);

    this.walls = new Walls();

    const exit = new Exit(gridCells(6), gridCells(3));
    this.addChild(exit);

    this.heroStart = params.heroPosition ?? new Vector2(gridCells(6), gridCells(5));
    this.heroDirection = params.heroDirection ?? DOWN;
    const hero = new Hero(this.heroStart.x, this.heroStart.y, this.heroDirection);
    this.addChild(hero);

    const rod = new Rod(gridCells(7), gridCells(6));
    this.addChild(rod);

    this.walls.addWall(4, 3); // trees
    this.walls.addWall(13, 4);
    this.walls.addWall(14, 2);

    this.walls.addWall(4, 4); // squares
    this.walls.addWall(4, 5);
    this.walls.addWall(5, 4);
    this.walls.addWall(5, 5);
    this.walls.addWall(8, 3);
    this.walls.addWall(9, 3);

    this.walls.addHorizontal(7, 5, 4); // squares
    this.walls.addHorizontal(12, 6, 3); // rocks
    this.walls.addWall(14, 4); // house

    // bounding box
    this.walls.addHorizontal(2, 7, 15); // down
    this.walls.addVertical(16, 7, 6); // vert-left
    this.walls.addVertical(2, 7, 6); // vert-right
    this.walls.addHorizontal(3, 2, 4); // up-right
    this.walls.addWall(15, 2); // up-left
    this.walls.addHorizontal(6, 1, 8); // top
  }

  ready() {
    events.on("HERO_EXITS", this, () => {
      events.emit("CHANGE_LEVEL", new CaveLevel1({
        heroPosition: new Vector2(gridCells(4), gridCells(5)),
        heroDirection: RIGHT
      }));
    })
  }
}

