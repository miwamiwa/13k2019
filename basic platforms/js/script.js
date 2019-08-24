var player;
var yShift =0;
var frameRate=30;
var bgm;
var frame=0;
let ground = [];
let canvasH = 270;
let canvasW = window.innerWidth;

let babies = [];
let baddies = [];
let baddieLocations= [];
let baddiesOnScreen =0;

let inputLeft = false;
let inputRight = false;
let stopSpeed = 0.4;



var canvas = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = canvasW;
    this.canvas.height = canvasH;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 1000/frameRate);
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

// startGame() is called on document load
// game setup

function startGame() {

  setupLevel(level1);
  canvas.start();
}

// updateGameArea(): main game loop, or
// the mother of most loops

function updateGameArea() {

  canvas.clear();

  player.update();

  updateAll(baddies);
  displayAll(ground); // these are platforms
  updateAll(babies);

  displayGround();

  runBGM();
  frame++;
}


// display the ground below all platforms
function displayGround(){

  ctx = canvas.context;
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  addLine(0,canvasH-yShift,canvasW,canvasH-yShift);
  ctx.stroke();
  ctx.closePath();
}
