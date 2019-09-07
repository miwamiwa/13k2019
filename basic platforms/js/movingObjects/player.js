// displayDudeBox()
// displays the player, mama ape

function displayDudeBox(){

  ctx = canvas.context;
  let xPos = canvasW/2;
  let tDist = -this.h;
  if(currentScreen==='wakeplayer') tDist -= 150;
  ctx.translate(0,tDist)

  this.getDir();
  let stretch = 3;
  let loop = walkLoop;

  if(this.sleeping){
    loop=sleepLoop;
    stretch=4;
  }
  else if(distToGround(this.x+this.w/2,this.y,this.w)>2)  loop=jumpLoop;
  else if(this.speedX===0) loop=stillLoop;

  displayStringLoop(loop,xPos,this.y-yShift,25,stretch,this.dir);

  ctx.translate(0,-tDist)
}


// updatePlayerMotion():
// update player speed according to keypresses

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

function moveX(dir) {

  if(dir>0) inputRight= true;
  else inputLeft = true;
}
