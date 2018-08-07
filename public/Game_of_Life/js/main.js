let tiles = [[]];
let tileSize = 16;
let tilesH;
let tilesL;

let Gen = 0;
let Pause = true;
let btnPause;
let btnPauseCtx = "Play";

let Step = false;
let btnStep;

let btnClear;

let stored = [];
let btnStore;

let speed;
let btnSpeed;

function setup() {
  let cnv = createCanvas(floor((windowWidth-tileSize)/tileSize)*tileSize, floor((windowHeight-tileSize)/tileSize)*tileSize);
  cnv.style('display', 'block');
  // noStroke();
  strokeWeight(1);
  stroke(0);

  for (let y = tileSize; y < height; y += tileSize) {
    tiles[y/tileSize-1] = [];
    for (let x = tileSize; x < width; x += tileSize) {
      tiles[y/tileSize-1][x/tileSize-1] = new Tile({x, y});
    }
  }

  tilesH = tiles.length;
  tilesL = tiles[0].length;

  btnPause = document.getElementById('pause');
  btnPause.onclick = fctplay;

  btnStep = document.getElementById('step');
  btnStep.onclick = fctstep;

  btnClear = document.getElementById('clear');
  btnClear.onclick = fctclear;

  btnSpeed = document.getElementById('speed');
  btnSpeed.oninput = fctspeed;
  speed = btnSpeed.value;

  btnStore = document.getElementById('store');
  btnStore.onclick = store;

  for (let i = 0; i < tilesH; i++) {
    for (let j = 0; j < tilesL; j++) {
      tiles[i][j].show();
    }
  }
}

function draw() {
  frameRate(parseInt(speed));
  // console.log(frameRate(), parseInt(speed))

  if (!Pause || Step) {

    for (let i = 0; i < tilesH; i++) {
      for (let j = 0; j < tilesL; j++) {

        let neighbour = getNeighbour(i, j);

        if (tiles[i][j].isAlive == 0 && neighbour == 3) {
          tiles[i][j].nextStep = 1;
        }
        if (tiles[i][j].isAlive == 1 && neighbour == 2 || neighbour == 3) {
          tiles[i][j].nextStep = 1;
        } else if (tiles[i][j].isAlive == 1) {
          tiles[i][j].nextStep = 0;
        }
      }
    }

    Gen++;
    btnPause.textContent = btnPauseCtx + " (Gen:" + Gen + ")";

    //background(0);
    for (let i = 0; i < tilesH; i++) {
      for (let j = 0; j < tilesL; j++) {
        if (tiles[i][j].isAlive == 1 || tiles[i][j].nextStep == 1 || getNeighbour(i, j) > 0) {
          tiles[i][j].show();
        }
      }
    }

    Step = false;
  }
}

function getNeighbour(i, j) {
  let neighbour = 0;

  if (i == 0 && j == 0) {
    tileNO = tiles[tiles.length-1][tiles[i].length-1].isAlive;
  } else if (i == 0) {
    tileNO = tiles[tiles.length-1][j-1].isAlive;
  } else if (j == 0) {
    tileNO = tiles[i-1][tiles[i].length-1].isAlive;
  } else {
    tileNO = tiles[i-1][j-1].isAlive;
  }

  if (i == 0) {
    tileN = tiles[tiles.length-1][j].isAlive;
  } else {
    tileN = tiles[i-1][j].isAlive;
  }

  if (i == 0 && j == tiles[i].length-1) {
    tileNE = tiles[tiles.length-1][0].isAlive;
  } else if (i == 0) {
    tileNE = tiles[tiles.length-1][j+1].isAlive;
  } else if (j == tiles[i].length-1) {
    tileNE = tiles[i-1][0].isAlive;
  } else {
    tileNE = tiles[i-1][j+1].isAlive;
  }

  if (j == 0) {
    tileO = tiles[i][tiles[i].length-1].isAlive;
  } else {
    tileO = tiles[i][j-1].isAlive;
  }

  if (j == tiles[i].length-1) {
    tileE = tiles[i][0].isAlive;
  } else {
    tileE = tiles[i][j+1].isAlive;
  }

  if (i == tiles.length-1 && j == 0) {
    tileSO = tiles[0][tiles[i].length-1].isAlive;
  } else if (i == tiles.length-1) {
    tileSO = tiles[0][j-1].isAlive;
  } else if (j == 0) {
    tileSO = tiles[i+1][tiles[i].length-1].isAlive;
  } else {
    tileSO = tiles[i+1][j-1].isAlive;
  }

  if (i == tiles.length-1) {
    tileS = tiles[0][j].isAlive;
  } else {
    tileS = tiles[i+1][j].isAlive;
  }

  if (i == tiles.length-1 && j == tiles[i].length-1) {
    tileSE = tiles[0][0].isAlive;
  } else if (i == tiles.length-1) {
    tileSE = tiles[0][j+1].isAlive;
  } else if (j == tiles[i].length-1) {
    tileSE = tiles[i+1][0].isAlive;
  } else {
    tileSE = tiles[i+1][j+1].isAlive;
  }

  neighbour =
    tileNO
  + tileN
  + tileNE
  + tileO
  + tileE
  + tileSO
  + tileS
  + tileSE;

  return neighbour;
}

function keyPressed() {
  if (keyCode === ENTER) {
    fctplay();
  } else if (keyCode === 32) {
    fctstep();
  } else if (keyCode === BACKSPACE || keyCode === DELETE) {
    fctclear();
  }
}

function mousePressed() {
  mouse();
}

function mouseDragged() {
  mouse();
}

function mouse() {
  //background(0);
  for (let i = 0; i < tilesH; i++) {
    for (let j = 0; j < tilesL; j++) {
      tiles[i][j].drag();
      if (tiles[i][j].isAlive == 1 || tiles[i][j].nextStep == 1 || getNeighbour(i, j) > 0) {
        tiles[i][j].show();
      }
    }
  }
}

function fctplay() {
  Pause = !Pause
  if (Pause) {
    btnPauseCtx = "Play";
  } else {
    btnPauseCtx = "Stop";
  }
  btnPause.blur();
}

function fctstep() {
  Step = !Step;
  btnStep.blur();
}

function fctclear() {
  //background(0);
  for (let i = 0; i < tilesH; i++) {
    for (let j = 0; j < tilesL; j++) {
      tiles[i][j].nextStep = 0;
      tiles[i][j].show();
    }
  }
  Gen = 0;
  Pause = true;
  btnPauseCtx = "Play";
  btnPause.textContent = btnPauseCtx;
  btnClear.blur();
}

function fctspeed() {
  speed = btnSpeed.value;
  btnSpeed.blur();
}

function store() {
    let newTiles = [[]];
    for (let i = 0; i < tilesH; i++) {
        newTiles[i] = [];
        for (let j = 0; j < tilesL; j++) {
            newTiles[i][j] = new Tile(tiles[i][j]);
        }
    }
    stored.push(newTiles);

    btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("class", stored.length - 1);
    btn.style.position = "absolute";
    btn.style.marginLeft = "40px";
    btn.style.marginTop = stored.length * 30 + 100 + "px";
    btn.textContent = "Restore " + stored.length;
    btn.onclick = function() {
      restore(stored[this.classList["value"]]);
      this.blur();
    };

    del = document.createElement("button");
    del.setAttribute("type", "button");
    del.setAttribute("class", stored.length - 1);
    del.style.position = "absolute";
    del.style.marginLeft = "10px";
    del.style.marginTop = stored.length * 30 + 100 + "px";
    del.textContent = "x";
    del.onclick = function() {
      btnDel(this.classList["value"]);
      this.blur();
    };

    document.getElementById("buttons").appendChild(btn);
    document.getElementById("buttons").appendChild(del);

    btnStore.blur();
}

function restore(storage) {
    let newTiles = [[]];
    for (let i = 0; i < storage.length; i++) {
        newTiles[i] = [];
        for (let j = 0; j < storage[i].length; j++) {
            newTiles[i][j] = new Tile(storage[i][j]);
        }
    }
    tiles = newTiles;
}

function btnDel(id) {
  stored[id] = null;
  document.getElementById("buttons").removeChild(document.getElementsByClassName(id)[0]);
  document.getElementById("buttons").removeChild(document.getElementsByClassName(id)[0]);
}

const defaults = {
    x: 0,
    y: 0,
    isAlive: 0,
    nextStep: 0,
}

class Tile {
  constructor(options) {
    this.x = options.x || defaults.x;
    this.y = options.y || defaults.y;
    this.gridX = (this.x-tileSize)/tileSize;
    this.gridY = (this.y-tileSize)/tileSize;

    this.col = color(0);
    this.isAlive = options.isAlive || defaults.isAlive;
    this.nextStep = options.nextStep || defaults.nextStep;
  }

  show() {
    this.isAlive = this.nextStep;
    if (this.isAlive) {
      this.col = color(200,0,0);
    } else {
      this.col = color(100);
    }
    fill(this.col);
    rect(this.x, this.y, tileSize, tileSize);
  }

  drag() {
    let d = (mouseX > this.x
          && mouseX < (this.x + tileSize)
          && mouseY > this.y
          && mouseY < (this.y + tileSize))
    if (d) {
      if (mouseButton == "left") {
        this.nextStep = 1;
      }
      if (mouseButton == "right") {
        this.nextStep = 0;
      }
    }
  }
}
