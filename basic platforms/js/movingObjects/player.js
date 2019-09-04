// displayDudeBox()
// to be included as argument in player's movingObject.

function displayDudeBox(){

  ctx = canvas.context;
  let xPos = canvasW/2;
  let translateDist = -this.h;
  if(currentScreen==='wakeplayer') translateDist -= 150;
  ctx.translate(0,translateDist)

  let limit = canvasH*0.5;
  if(this.y>limit)  yShift = 0;
  else yShift=this.y-limit;
  if(this.speedX!=0) this.dir = -this.speedX/Math.abs(this.speedX);

if(this.sleeping) displayStringLoop(sleepLoop,xPos,this.y-yShift,25,4,this.dir);
else {
  if(distToGround(this.x+this.w/2,this.y,this.w)>2)  displayStringLoop(jumpLoop,xPos,this.y-yShift,25,3,this.dir);
  else {
    if(this.speedX===0) displayStringLoop(stillLoop,xPos,this.y-yShift,25,3,this.dir);
    else displayStringLoop(walkLoop,xPos,this.y-yShift,25,3,this.dir);
  }
}


  ctx.translate(0,-translateDist)
}


// updatePlayerMotion(): see moveX().
// to be included as argument in player's movingObject.

function updatePlayerMotion(){

  if(!this.knockedBack && !this.sleeping){
    if(!inputLeft&&!inputRight) {
      if(player.speedX+stopSpeed<0) player.speedX+=stopSpeed;
      else if(player.speedX-stopSpeed>0) player.speedX-=stopSpeed;
      else player.speedX = 0;

    }
    else if(inputRight) player.speedX += 0.5;
    else if(inputLeft) player.speedX -= 0.5;
    player.speedX = constrain(player.speedX,-10,10);
  }
  else if(this.sleeping) this.speedX = 0;
}

// moveX() is called in keyPressed().
// for some reason when i hold down a key, there's a lapse of time between the first
// keypress event and the moment where the event starts to loop. so instead
// of updating speedX on keypress, these booleans are triggered and speedX
// gets updated in updatePlayerMotion().

function moveX(dir) {

  if(dir>0) inputRight= true;
  else inputLeft = true;
}
