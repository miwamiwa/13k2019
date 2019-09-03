// update() and display() functions for a jumping baddie

function displayJumpingBaddie(){

  let tDist = -this.h;
  ctx.translate(0,tDist)

  let pos = posOnScreen(this);
  if(this.speedX!=0) this.dir = -this.speedX/Math.abs(this.speedX);

  if(
    distToGround(this.x+this.w/2,this.y,this.w)>2
  )  displayStringLoop(tigerJumpLoop,pos.x,pos.y-1.5*27,27,3,this.dir);
  else   displayStringLoop(tigerWalkLoop,pos.x,pos.y-1.5*27,27,3,this.dir);

  ctx.translate(0,-tDist)
  this.counter++;
}

function updateJumpingBaddie(){

  checkPlayerCollision(this.index);

  // jump at some point
  if(this.counter%150===0) this.startJump(baddies[this.index]);
  // if not knocked back, move between boundaries
  if(!this.knockedBack&&this.stunned!=true) this.moveInBounds(2);
}
