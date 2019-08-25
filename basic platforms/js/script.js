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

  unpackImgLoop(walkLoop);
  unpackImgLoop(jumpLoop);
  jumpLoop.push(jumpLoop[1]);
  unpackImgLoop(stillLoop);
  stillLoop.push(stillLoop[1]);

  unpackImgLoop(birdStillLoop);
  birdStillLoop.push(birdStillLoop[1]);

  unpackImgLoop(tigerWalkLoop);

  unpackImgLoop(tigerJumpLoop);
  tigerJumpLoop.push(tigerJumpLoop[1]);

  unpackImgLoop(birdFlapLoop);
  birdFlapLoop.push(birdFlapLoop[2]);
  birdFlapLoop.push(birdFlapLoop[1]);

  unpackImgLoop(babyWalkLoop);
  babyWalkLoop.push(babyWalkLoop[2]);
  babyWalkLoop.push(babyWalkLoop[1]);

  groundImg.a = unpackImage(groundImg.s);

  setupLevel(level1);
  canvas.start();

}

// updateGameArea(): main game loop, or
// the mother of most loops

function updateGameArea() {

  canvas.clear();

  displayAll(ground); // these are platforms

  player.update();

  updateAll(baddies);

  updateAll(babies);

  displayGround();

  //runBGM();
  frame++;
}


// display the ground below all platforms
function displayGround(){
/*
  ctx = canvas.context;
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  addLine(0,canvasH-yShift,canvasW,canvasH-yShift);
  ctx.stroke();
  ctx.closePath();
  */

  let xPos = canvasW/2 - (player.x-this.x)
  for(let i=0; i<canvasW/20; i++){
    displayImage( groundImg.a, groundImg.c, i*20-player.x%20,canvasH-yShift-4, 5,4,1 )
  }
}
