var player;

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
    player = new movingObject(100, 120, displayDudeBox,"player");
    setupPlatforms();
    canvas.start();
    setupBaddies();
    newBaby();
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

    updatePlayerMotion();
//   runBGM();
frame++;
}

function displayAll(input){
  for(let i=0; i<input.length; i++){
    input[i].display();
  }
}

function updateAll(input){
  for(let i=0; i<input.length; i++){
    input[i].update();
  }
}



function updateAngle(pos,speed,maxDisplacement,min,max,phase){
//  if(player.flip>0)
  return constrain( (pos + phase* Math.sin( frame / speed )*maxDisplacement), min,max);
//  else return constrain( (pos + phase* Math.sin( frame / speed )*maxDisplacement), -max,-min);
}


function addLine(x,y,x2,y2){
  ctx.moveTo(x,y);
  ctx.lineTo(x2,y2);
}


let inputLeft = false;
let inputRight = false;

let stopSpeed = 0.4;

function updatePlayerMotion(){
if(!this.knockedBack){
  if(!inputLeft&&!inputRight) {
  if(player.speedX+stopSpeed<0) player.speedX+=stopSpeed;
  else if(player.speedX-stopSpeed>0) player.speedX-=stopSpeed;
  else player.speedX = 0;

  }
  else if(inputRight) player.speedX += 0.5;
  else if(inputLeft) player.speedX -= 0.1;
  player.speedX = constrain(player.speedX,-10,10);


}

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


function constrain(input,min,max){
   return Math.min(Math.max(input, min), max);
}
