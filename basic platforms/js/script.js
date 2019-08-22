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


// game setup
function startGame() {


  setupLevel(level1);

    canvas.start();
}

// game loop
function updateGameArea() {
  canvas.clear();

  //  runBaddies();
  updateAll(baddies);
  //  player.newPos();
  player.update();

  displayAll(ground);
  updateAll(babies);

  displayGround();

  updatePlayerMotion();
  //   runBGM();
  frame++;
}

function displayGround(){

  ctx = canvas.context;
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  addLine(0,canvasH-yShift,canvasW,canvasH-yShift);
  ctx.stroke();
  ctx.closePath();
}



function setupLevel(level){


  for(let i=0; i<level.platforms.length; i++){
    ground.push(new groundTile(
      level.platforms[i].x,
      canvasH-level.platforms[i].y,
      level.platforms[i].w
    ));
  };

  for(let i=0; i<level.baddies.length; i++){

      let res = getXYOnPlat(level.baddies[i],level.platforms);

    newBaddie( res.x, res.y, level.baddies[i].r, level.baddies[i].display );
  }

  for(let i=0; i<level.nests.length; i++){
    ground[level.nests[i].p].hasNest = level.nests[i].x;
  }

  let playerPos = getXYOnPlat(level.player,level.platforms);
  player = new movingObject(playerPos.x, playerPos.y, displayDudeBox,"player");



  /*
  let lasty = 30;

  for(let i=0; i<100; i++){

    ground.push(new groundTile(i*170, canvasH - (lasty + (Math.random()*60-30)), 150));
  }

  setupBaddies();
  newBaby();
  player = new movingObject(100, 120, displayDudeBox,"player");
  */
}


function getXYOnPlat(input,platforms){
  let x,y;
  if(input.p ===-1) {
    x = input.x;
    y = canvasH-10;
  }
  else {
    x = platforms[ input.p ].x + input.x;
    y = platforms[ input.p ].y - 10;
  }
  return {x:x,y:y};
}

// keypressed() / keyreleased()
// these are triggered in the html <body>
// note that onkeypress events are actual keyCodes
// while onkeyup events use Unicode.
// that's why there are different values for A and D in both functions. enjoy.

function keyReleased(){
  console.log("key release "+event.keyCode)
  if(event.keyCode===65) inputLeft = false;
  else if(event.keyCode===68) inputRight = false; // 65 A left // 68 D right
}

function keyPressed(){
  console.log("key pressed! code: "+event.keyCode)
  switch(event.keyCode){

    //    case 119: moveY(-1); break;//up W 119
    //    case 115: moveY(1); break;//down S 115
    case 97: moveX(-1); break;//left A  97
    case 100: moveX(1); break;// right D 100

    case 32: player.startJump(player); break; // jump SPACE 32
    // 1,2,3,4: 49,50,51,52...
  }
}
