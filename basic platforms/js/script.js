var player;
var yShift =0;
var frameRate=30;
var bgm;
var frame=0;
let ground = [];
let canvasH = 570;
let canvasW = window.innerWidth;
let levelRange =0;
let currentLevel;
let clickA={x:0,y:0,w:200,h:50};
let currentScreen = "start";

let trace =0;
let traceSpeed = 0.001;

let gameLoop;

let babies = [];
let baddies = [];
let baddieLocations= [];
let baddiesOnScreen =0;
let startPos;
let babiesReturned = 0;

let inputLeft = false;
let inputRight = false;
let stopSpeed = 0.4;
let chirping = false;

let level =0;
let naps =0;

let alphabet = [];

let particles = []


var canvas = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = canvasW;
    this.canvas.height = canvasH;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//    this.interval = setInterval(updateGameArea, 1000/frameRate);
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function preload(){

  unpackAll();
  canvas.start();

  clickA.x = canvasW/2-clickA.w/2;
  clickA.y = canvasH/2+50;

  gameLoop = setInterval(function(){
    displaygameLoop();
    trace+=traceSpeed;
    frame++;
  },1000/frameRate)

}

function displaygameLoop(){

  displayText("mamas naps",canvasW/2-100, canvasH/2-50, 0, "black", 25);

  displayText("click to",clickA.x, clickA.y, 0, "black", 20);
  displayText("start",clickA.x, clickA.y+25, 0, "black", 20);

// place rect around click area
  ctx.beginPath();
  ctx.strokeStyle ="black";

    ctx.rect( clickA.x,clickA.y,clickA.w,clickA.h );
    ctx.stroke();
  ctx.closePath();

}

//

// startGame() is called on document load
// game setup

function startGame() {

  clearInterval(gameLoop)
  gameLoop = setInterval(updateGameArea, 1000/frameRate);
  console.log("game started")
  frame =0;
  trace =0;
  currentLevel = level1;
  setupLevel(currentLevel);


  setTimeout(function(){ traceSpeed =0.8 },1000);
  setTimeout(function(){ traceSpeed =10 },2000)

}

// updateGameArea(): main game loop, or
// the mother of most loops

function updateGameArea() {

    canvas.clear();

  if(!player.sleeping){

      chirping = false;
      displayImage(bgImage.a,bgImage.c,-player.x/4,-0.4*canvasH-yShift/2,bgImage.w,2*canvasW/bgImage.w,1);

        player.update();
      displayReturnPoint();
      displayAll(ground); // these are platforms

      updateAll(baddies);

      updateAll(particles);

      updateAll(babies);

      displayGround();

      continueLevel();

  //    displayText("welcome!",100,300,400,"red",25)

  }
  else {

    player.update();
  }



      //runBGM();
  trace+=traceSpeed;
  frame++;
}

function displayReturnPoint(){

  ctx.beginPath();
  ctx.fillStyle = "#FF6600";
  ctx.fillRect(canvasW/2 - (player.x-startPos.x),
  startPos.y-yShift-80,
  80,80);
//  ctx.rect(canvasW/2,player.y-yShift-player.h,player.w,player.h)
  ctx.stroke();
  ctx.closePath();

}

function continueLevel(){

if(babiesReturned===babies.length) nextPhase();

}


function nextPhase(){

  napping = true;
  babiesReturned = true;
  player.sleeping = true;

  naps++;

  if(naps===3){

    console.log("new level!");
    level++
    switch(level){
      case 1: currentLevel = level2; break;
      case 2: currentLevel = level3; break;
    }

    naps =0;
    setupLevel(currentLevel);
  }
  else {

    console.log("new nap!");
  let phase = currentLevel;
    setTimeout( function(){
      player.sleeping = false;
    }, 5000 );
  // push new baddies and stuff
  //  phase.baddies.push({p:5, x:50, r:45, kit:jBaddie });

    setupLevel(phase);
  }

}


// display the ground below all platforms
function displayGround(){

  let xPos = canvasW/2 - (player.x-this.x)
  for(let i=0; i<canvasW/20; i++){
    displayImage( groundImg.a, groundImg.c, i*20-player.x%20,canvasH-yShift-4, 5,4,1 )
  }
}
