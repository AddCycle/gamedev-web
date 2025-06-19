export const walls = new Set();

function addWall(x,y) {
  walls.add(`${x*16},${y*16}`);
}

function addVertical(x,y,length) {
  for (let i = 0; i < length; i++) {
    addWall(x,y-i);
  }
}

function addHorizontal(x,y,length) {
  for (let i = 0; i < length; i++) {
    addWall(x+i,y);
  }
}

// trees
addWall(4,3);
addWall(13,4);
addWall(14,2);

// squares
addWall(4,4);
addWall(4,5);
addWall(5,4);
addWall(5,5);
addWall(8,3);
addWall(9,3);

// water line
addHorizontal(7,5,4);

// rocks
addHorizontal(12,6,3);

// house
addWall(14,4);

// bounding box
addHorizontal(2,7,15); // down
addVertical(16,7,6); // vert-left
addVertical(2,7,6); // vert-right
addHorizontal(3,2,4); // up-right
addWall(15,2); // up-left
addHorizontal(6,1,8); // top