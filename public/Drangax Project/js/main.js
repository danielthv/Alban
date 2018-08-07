let sceneSize = 5;

let BigMap = [];
let BigMapSizeX = 7;
let BigMapSizeY = 7;

let tiles = [];
let tileSize = 30;

ounce = 1;

let IMGfloor, IMGwall, IMGplayer;
function preload() {
  IMGfloor = loadImage('Ressources/img/floor.png');
  IMGwall = loadImage('Ressources/img/wall.png');
  IMGplayer = loadImage('Ressources/img/player.png');
}

function setup() {
  let cnv = createCanvas(sceneSize * tileSize, sceneSize * tileSize);
  cnv.style('display', 'block');
  cnv.style('image-rendering', 'pixelated');
  stroke(0);
  // noStroke();

  // Map Table
  for (let y = 0; y < BigMapSizeY; y += 1) {
    BigMap[y] = [];
    for (let x = 0; x < BigMapSizeX; x += 1) {
      BigMap[y][x] = new Carte({ x, y });
    }
  }

  //Tile Table
  for (let y = 0; y < sceneSize; y += 1) {
    tiles[y] = [];
    for (let x = 0; x < sceneSize; x += 1) {
      tiles[y][x] = new Tile({ x, y });
    }
  }

  BigMapX = round(BigMapSizeX / 2) - 1;
  BigMapY = round(BigMapSizeY / 2) - 1;
  BigMap[BigMapX][BigMapY].scene = [
    ["1", "1", "1", "1", "1"],
    ["1", "0", "0", "0", "1"],
    ["1", "0", "0", "0", "0"],
    ["1", "0", "0", "0", "1"],
    ["1", "1", "1", "1", "1"]];

  player = new Player({ x: 1, y: 2 });

  // console.log(BigMap);
  // console.log(tiles);
  // console.log("--------------");

}

function draw() {
  background(50);
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[0].length; j++) {
      tiles[i][j].type = BigMap[BigMapX][BigMapY].tile(j, i);
      
      tiles[i][j].isWalkable = true;
      if (BigMap[BigMapX][BigMapY].tile(j, i) == "1") {
        tiles[i][j].isWalkable = false;
      }

      if (player.x == j && player.y == i) {
        tiles[i][j].type = "P";
      }

      tiles[i][j].show();
    }
  }

  coord = text(BigMapX + ", " + BigMapY, 3, 12);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.move("UP");
  } else if (keyCode === DOWN_ARROW) {
    player.move("DOWN");
  } else if (keyCode === RIGHT_ARROW) {
    player.move("RIGHT");
  } else if (keyCode === LEFT_ARROW) {
    player.move("LEFT");
  }
}

class Carte {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.scene = null;
  }

  tile(j, i) {
    return this.scene[i][j];
  }

  changeMap(dir) {
    switch (dir) {
      case "NORTH":
        BigMapY--;
        if (BigMapY < 0) { BigMapY = 0 }
        break;
      case "SOUTH":
        BigMapY++;
        if (BigMapY > BigMapSizeY - 1) { BigMapY = BigMapSizeY - 1 }
        break;
      case "EST":
        BigMapX++;
        if (BigMapX > BigMapSizeX - 1) { BigMapX = BigMapSizeX - 1 }
        break;
      case "WEST":
        BigMapX--;
        if (BigMapX < 0) { BigMapX = 0 }
        break;
      default:
        break;
    }

    if (BigMap[BigMapX][BigMapY].scene == null) {
      BigMap[BigMapX][BigMapY].scene = [
        ["1", "1", "0", "1", "1"],
        ["1", "0", "0", "0", "1"],
        ["0", "0", "0", "0", "0"],
        ["1", "0", "0", "0", "1"],
        ["1", "1", "0", "1", "1"]];

      for (let i = 0; i < sceneSize; i++) {
        if (BigMapX == BigMapSizeX - 1) {
          BigMap[BigMapX][BigMapY].scene[i][sceneSize - 1] = "1";
        }
        if (BigMapX == 0) {
          BigMap[BigMapX][BigMapY].scene[i][0] = "1";
        }
        if (BigMapY == BigMapSizeY - 1) {
          BigMap[BigMapX][BigMapY].scene[sceneSize - 1][i] = "1";
        }
        if (BigMapY == 0) {
          BigMap[BigMapX][BigMapY].scene[0][i] = "1";
        }
      }

    }
  }
}

class Tile {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.type = "0";
    this.col = color(255);
    this.isWalkable = true;
  }

  show() {
    if (this.isWalkable) {
      image(IMGfloor, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    } else {
      image(IMGwall, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    }

    if (this.type == "P") {
      image(IMGplayer, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    }


    // switch (this.type) {
    //   case "0":
    //     this.col = color(119, 221, 119);
    //     break;
    //   case "1":
    //     this.col = color(131, 105, 83);
    //     break;
    //   case "2":
    //     this.col = color(255, 90, 90);
    //     break;
    //   case "P":
    //     this.col = color(119, 158, 203);
    //     break;
    //   default:
    //     this.col = color(255);
    //     break;
    // }
    // fill(this.col);
    // rect(this.x * tileSize, this.y * tileSize, this.x * tileSize + tileSize, this.y * tileSize + tileSize);
  }
}

class Player {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
  }

  move(dir) {
    switch (dir) {
      case "UP":
        if (this.y == 0) {
          BigMap[BigMapX][BigMapY].changeMap("NORTH");
          this.y = sceneSize - 1;
        }
        else if (this.y > 0 && BigMap[BigMapX][BigMapY].tile(this.x, this.y - 1) == "0") {
          this.y--;
        }
        break;
      case "DOWN":
        if (this.y == sceneSize - 1) {
          BigMap[BigMapX][BigMapY].changeMap("SOUTH");
          this.y = 0;
        }
        else if (this.y < sceneSize && BigMap[BigMapX][BigMapY].tile(this.x, this.y + 1) == "0") {
          this.y++;
        }
        break;
      case "RIGHT":
        if (this.x == sceneSize - 1) {
          BigMap[BigMapX][BigMapY].changeMap("EST");
          this.x = 0;
        }
        else if (this.x < sceneSize && BigMap[BigMapX][BigMapY].tile(this.x + 1, this.y) == "0") {
          this.x++;
        }
        break;
      case "LEFT":
        if (this.x == 0) {
          BigMap[BigMapX][BigMapY].changeMap("WEST");
          this.x = sceneSize - 1;
        }
        else if (this.x > 0 && BigMap[BigMapX][BigMapY].tile(this.x - 1, this.y) == "0") {
          this.x--;
        }
        break;
      default:
        break;
    }
  }
}
