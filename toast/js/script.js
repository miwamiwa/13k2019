/*
toast!
some baseline elements to build what i picture as a falling-toast game.
collision code is totally wonky but it does work in many cases xD
*/

var frameRate=30; // set framerate
let canvasH = 340; // set canvas dimensions
let canvasW = 480; // set canvas dimensions
let stopSpeed = 0.4; // set friction
let spaceBetween = 10; // set vertical space between pins
let numberOfPins = 400; // set amount of pins
        // could also just push more of those into pins[] at regular intervals

let centerY = canvasH/2;
let pinsOnScreen = [];
var bgm;
var frame=0;
let pins = [];
var player;

// a lovely canvas object ripped off w3 schools
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


// ------------ game setup() ---------------
function startGame() {

  canvas.start();
  player = new movingObject(100, 120);
  setupObstacles()

}

// ---------------- game loop "draw()" -------------
function updateGameArea() {

  canvas.clear();

  updateInputs();
  player.update();

  pinsOnScreen = [];
  for(let i=0; i<pins.length; i++){
    pins[i].display();
  }
  frame++;
}



// ------------- INPUTS: -----------------

let inputLeft = false;
let inputRight = false;

function updateInputs(){

  if(!inputLeft&&!inputRight) {
    if(player.speedX+stopSpeed<0 && player.x<=canvasW) player.speedX+=stopSpeed;
    else if(player.speedX-stopSpeed>0 && player.x>=0) player.speedX-=stopSpeed;
    else player.speedX = 0;

  }
  else if(inputRight) player.speedX += player.lateralAcceleration;
  else if(inputLeft) player.speedX -= player.lateralAcceleration;
  player.speedX = constrain(player.speedX,-player.maxLateralSpeed,player.maxLateralSpeed);


}

// keypressed() / keyreleased()
// some of these "event" things return keyCodes, some are Unicode. see w3 schools
// for reference or something. <3 u javascript

function keyReleased(){
  console.log("key release "+event.keyCode)
  if(event.keyCode===65) inputLeft = false;
  else if(event.keyCode===68) inputRight = false; // 65 A left // 68 D right
}

function keyPressed(){
  console.log("key pressed! code: "+event.keyCode)
  switch(event.keyCode){

    case 97: moveX(-1); break;//left A  97
    case 100: moveX(1); break;// right D 100

    case 32: player.startJump(); break; // jump SPACE 32
    // 1,2,3,4: 49,50,51,52...
  }
}
