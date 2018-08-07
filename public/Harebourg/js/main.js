let tiles = [];
let tileSize = 30;
let mapSize = 21;
let TilePerso = {x:-1, y:-1};
let TileCible = {x:-mapSize, y:-mapSize};
let TileSort  = {x:-1, y:-1};

var Personnage, Ennemi, Sort;
function preload() {
  Personnage = loadImage('Ressources/Personnage.png');
  Ennemi = loadImage('Ressources/Ennemi.png');
  Sort = loadImage('Ressources/Sort.png');
}

let Carte = [];
Carte[1] = "000000000000000000000" //Harebourg
          +"000000001100000000000"
          +"000001111122111000000"
          +"000011111110111100000"
          +"000111111111111110000"
          +"000112211111111111000"
          +"001112211111111111000"
          +"001112211111111111200"
          +"011110011111111111100"
          +"011111111122111111110"
          +"011111111122111111110"
          +"011111111111110220110"
          +"001111111111110221110"
          +"001111111111111111100"
          +"001120111111111111100"
          +"000111111111111111100"
          +"000011111111111111000"
          +"000001111111111110000"
          +"000000111111112200000"
          +"000000000111100000000"
          +"000000000000000000000";
Carte[2] = "000000000000000000000" //Nileza
          +"000000011111000000000"
          +"000002211111111000000"
          +"000021111111011100000"
          +"000111111111211110000"
          +"001111111111111111000"
          +"001111211111111111000"
          +"011111211111111111000"
          +"011111111111111111000"
          +"011111111122111111000"
          +"011111111122111111000"
          +"011111011111111111000"
          +"001111111111111111000"
          +"001111111111110111000"
          +"001111111111112111000"
          +"000111111111111112200"
          +"000011111111111110000"
          +"000001111111111110000"
          +"000000201111111100000"
          +"000000000111110000000"
          +"000000000000000000000";
Carte[3] = "000000000000000000000" //Klime
          +"000000011211000000000"
          +"000002111111102000000"
          +"000011111111111100000"
          +"000111111211111110000"
          +"001111102211111111000"
          +"001111100211111111000"
          +"011111111111111111000"
          +"011111111101111111000"
          +"011111111022111111000"
          +"011111111022111111000"
          +"011111011100111111000"
          +"001111011111111111000"
          +"001111111111100111000"
          +"001111111111102111000"
          +"000111111111100112200"
          +"000011111111111110000"
          +"000001111111111110000"
          +"000000201111111100000"
          +"000000000111110000000"
          +"000000000000000000000";
Carte[4] = "000000000000000000000" //Frizz
          +"000000011111000000000"
          +"000002211111111000000"
          +"000021111111011100000"
          +"000111111111211110000"
          +"001111111111111111000"
          +"001111111111111111000"
          +"011112211111111111000"
          +"011112211110111111000"
          +"011110011102111111000"
          +"011110011100111111000"
          +"011111111111111111000"
          +"001111111111111111000"
          +"001111111111022111000"
          +"001111111111022111000"
          +"000111111111102112200"
          +"000011111111111110000"
          +"000001111111111110000"
          +"000000201111111100000"
          +"000000000111110000000"
          +"000000000000000000000";
Carte[5] = "000000000000000000000" //Sylargh
          +"000000002211000000000"
          +"000001111111102000000"
          +"000011111111111100000"
          +"000111111111111110000"
          +"001111111111111111000"
          +"001112221111111111000"
          +"011110011111111111000"
          +"011111111222111111000"
          +"011111111022111111000"
          +"011111111022111111000"
          +"011111111100111111000"
          +"001111111111112211000"
          +"001111111111112211000"
          +"001111111111111011000"
          +"000111111111111112200"
          +"000011111111111110000"
          +"000001111111111110000"
          +"000000201111111100000"
          +"000000000111110000000"
          +"000000000000000000000";

function changeColor() {
  if (document.body.style.color == "black") {
    document.body.style.color = "white";
    document.body.style.background = "black";
  } else {
    document.body.style.color = "black";
    document.body.style.background = "white";
  }

  return false;
}

function showMap() {
  CarteIndex = select("#map").value();
  url = "https://albanthv.github.io/public/Harebourg/Assets/";
  switch (CarteIndex) {
    case "1":
      url += "Harebourg.png";
      break;
    case "2":
      url += "Nileza.png";
      break;
    case "3":
      url += "Klime.png";
      break;
    case "4":
      url += "Missiz Frizz.png";
      break;
    case "5":
      url += "Sylargh.png";
      break;
    default:
      url += "Confusion horaire.jpg";
      break;
  }

  window.open(url,
    "_blank",
    "toolbar=no, menubar=no, top=50, left=100, width=960, height=540");

  return false;
}

function setup() {
  let cnv = createCanvas(mapSize*tileSize+2, mapSize*tileSize+2);
  cnv.style('display', 'block');
  noStroke();
  background(50);

  let Pi = Array.from(document.getElementsByName("Pi")).find(r => r.checked).value;

  for (let y = 2; y < height; y += tileSize) {
    for (let x = 2; x < width; x += tileSize) {
      tiles.push(new Tile(x, y));
    }
  }
}

function draw() {
  Pi = Array.from(document.getElementsByName("Pi")).find(r => r.checked).value;
  CarteIndex = select("#map").value();

  if (Pi == "Gauche") {
      if (TileCible.x>=TilePerso.x && TileCible.y<=TilePerso.y) {
        TileSort.x = TilePerso.x-abs(TilePerso.y-TileCible.y);
        TileSort.y = TilePerso.y-abs(TilePerso.x-TileCible.x);
      } else {
        TileSort.x = TilePerso.x-(TilePerso.y-TileCible.y);
        TileSort.y = TilePerso.y+(TilePerso.x-TileCible.x);
      }
  } else if (Pi == "Droite") {
    if (TileCible.x>=TilePerso.x && TileCible.y<=TilePerso.y) {
      TileSort.x = TilePerso.x+abs(TilePerso.y-TileCible.y);
      TileSort.y = TilePerso.y+abs(TilePerso.x-TileCible.x);
    } else {
      TileSort.x = TilePerso.x+(TilePerso.y-TileCible.y);
      TileSort.y = TilePerso.y-(TilePerso.x-TileCible.x);
    }
  } else if (Pi == "Envers") {
    if (TileCible.x>=TilePerso.x && TileCible.y>=TilePerso.y) {
      TileSort.x = TilePerso.x-abs(TilePerso.x-TileCible.x);
      TileSort.y = TilePerso.y-abs(TilePerso.y-TileCible.y);
    } else if (TileCible.x>=TilePerso.x && TileCible.y<=TilePerso.y) {
      TileSort.x = TilePerso.x-abs(TilePerso.x-TileCible.x);
      TileSort.y = TilePerso.y+abs(TilePerso.y-TileCible.y);
    } else if (TileCible.x<=TilePerso.x && TileCible.y<=TilePerso.y) {
      TileSort.x = TilePerso.x+abs(TilePerso.x-TileCible.x);
      TileSort.y = TilePerso.y+abs(TilePerso.y-TileCible.y);
    } else if (TileCible.x<=TilePerso.x && TileCible.y>=TilePerso.y) {
      TileSort.x = TilePerso.x+abs(TilePerso.x-TileCible.x);
      TileSort.y = TilePerso.y-abs(TilePerso.y-TileCible.y);
    }
  }
  let impair = 1;
  for (let i = 0; i < tiles.length; i++) {
    if (i%(21*21) == 0) {
      impair++;
    }
    if (Carte[CarteIndex][i] == "1") {
      if ((i+impair)%2 == 0) {
        tiles[i].col = color(202,155,81); //clair
      } else {
        tiles[i].col = color(187,138,64); //sombre
      }
    } else if (Carte[CarteIndex][i] == "2") {
      tiles[i].col = color(136,81,18);
    } else if (Carte[CarteIndex][i] == "0") {
      tiles[i].col = color(0);
    }

    tiles[i].picture = 0;
    if (tiles[i].gridX == TilePerso.x && tiles[i].gridY == TilePerso.y) {
      tiles[i].col = color(0,255,0);
      tiles[i].picture = 1;
    }
    if (tiles[i].gridX == TileCible.x && tiles[i].gridY == TileCible.y) {
      tiles[i].col = color(255,0,0);
      tiles[i].picture = 2;
    }
    if (tiles[i].gridX == TileSort.x && tiles[i].gridY == TileSort.y) {
      tiles[i].col = color(255,0,255);
      tiles[i].picture = 3;
    }

    tiles[i].show();
  }
}

function mousePressed() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].drag();
  }
}

function mouseDragged() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].drag();
  }
}

class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.col = color(255,100);
    this.gridX = (x-2)/tileSize;
    this.gridY = (y-2)/tileSize;
    this.picture = 0;
  }

  show() {
    fill(this.col);
    rect(this.x, this.y, 28, 28);
    if(this.picture == 1) {
      image(Personnage, this.x, this.y, 28, 28);
    }
    else if(this.picture == 2) {
      image(Ennemi, this.x, this.y, 28, 28);
    }
    else if(this.picture == 3) {
      image(Sort, this.x, this.y, 28, 28);
    }
  }

  drag() {
    let d = (mouseX > this.x
          && mouseX < (this.x + tileSize)
          && mouseY > this.y
          && mouseY < (this.y + tileSize))
    if (d) {
      if (mouseButton == "right") {
        TilePerso.x = this.gridX;
        TilePerso.y = this.gridY;
      }
      if (mouseButton == "left") {
        TileCible.x = this.gridX;
        TileCible.y = this.gridY;
      }
    }
  }
}
