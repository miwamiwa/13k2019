var frameRate=30;
let sunDownFrame = frameRate*100;


var player;
var yShift =0;

var bgm;
var frame=0;
let ground = [];
let canvasH = 570;
let canvasW = window.innerWidth;
let levelRange =0;
let phase;
let currentLevel = {};
let currentPhase=0;
let clickA={x:0,y:0,w:200,h:50};
let currentScreen = "start";

let introSeq =0;
let introTxt = [
  "they call you mama ape.",
  "your three kiddos that is.",
  "mama ape likes her naps. ",
  "three times a day.",
  "nothing less. ",
  " ",
  "your three rascals invevitably run off",
  "everytime you take a snooze.",
  "once you wake,",
  "you cannot sleep again",
  "until they are back home.",
  " ",
  "those baby apes",
  "are helpless on their own",
  "so you will have to haul them ",
  "on your back.",
  " ",
  "in short",
  "by sundown, everyone must be back home",
  "and you must have thrice napped",
  " ",
  "click to wake up!"
];
let currentText = introTxt;


let trace =0;
let traceSpeed = 0.1;

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


let timeLeft =0;

let alphabet = [];

let particles = [];
let gameOver = false;


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
    displayStartScreen();
    trace+=traceSpeed;
    frame++;
  },1000/frameRate)

}

function displayStartScreen(){

  let c1 = 2.5*(frame%100);
  let c2 = 165+Math.sin(frame/100)*60;

  displayText("ape naps",canvasW/2-150, canvasH/2-50, 0, "rgb("+c1+","+c2+","+50+")", 35,true);

  displayText("click to",clickA.x, clickA.y, 0, "black", 20,false);
  displayText("start",clickA.x+40, clickA.y+25, 0, "black", 20,false);

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
  currentScreen="wakeplayer" // or currentScreen="nada"
  frame =0;
  trace =0;

  currentLevel = level1;
  setupLevel(currentLevel);

  shootTextSequence();

  setTimeout(function(){ currentScreen="wakeplayer"; }, (currentText.length-1)*1000)


}

function shootTextSequence(){
  for (let i=0; i<currentText.length; i++){

    setTimeout(function(){ if(introSeq<currentText.length) introSeq ++; },i*1000);

  }
}

// updateGameArea(): main game loop, or
// the mother of most loops

function updateGameArea() {

  canvas.clear();

  if(!player.sleeping &&!gameOver){

    currentScreen = "game";
    timeLeft = Math.floor((sunDownFrame - frame)/frameRate);

    chirping = false;
    displayBackground();
    updateAll(particles);
    displayGround(); // this is ground 0
    displayAll(ground); // these are platforms
    displayReturnPoint();

    player.update();
    updateAll(baddies);
    updateAll(babies);

    displayText(timeLeft.toString(), canvasW-100,canvasH-100,0,"white",25,false)

    continueLevel();

  }
  else if(gameOver){

    displayText("game over. click to start again ", canvasW/4, canvasH/2,0,"black",25,true)
  }
  else {
    triggerParticles(
      flRand(-50,canvasW/2+200),
      flRand(50,canvasH-200),
      [
        {r:225,g:200,b:10},
        {r:225,g:20,b:10},
        {r:25,g:200,b:10},
        {r:25,g:20,b:210}
      ]
    );
    for(let i=0; i<introSeq; i++){
      displayText(currentText[i],50,50+i*20,400,"red",10,true);
    }
    if(introSeq<currentText.length) displayText("click to skip", canvasW-160,canvasH-30,0,"black",5,false);
    updateAll(particles);

    player.update();
  }



  runBGM();
  trace+=traceSpeed;
  frame++;
}

function displayReturnPoint(){

  ctx.beginPath();
  ctx.fillStyle = "#FF6600";
  ctx.fillRect(canvasW/2 - (player.x-startPos.x),
  startPos.y-yShift-80,
  80,80);
  ctx.stroke();
  ctx.closePath();

}
