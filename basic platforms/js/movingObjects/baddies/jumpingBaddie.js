// update() and display() functions for a jumping baddie

function displayJumpingBaddie(){

  let translateDist = -this.h;
  ctx.translate(0,translateDist)

  let xPos = canvasW/2 - (player.x-this.x);
  let yPos = this.y-yShift;
  if(this.speedX!=0) this.dir = -this.speedX/Math.abs(this.speedX);

//  if(this.flying) displayStringLoop(birdFlapLoop,xPos,yPos,20,2,-this.dir);
   displayStringLoop(tigerWalkLoop,xPos,yPos,27,3,this.dir);

  ctx.translate(0,-translateDist)
  this.counter++;
}

function updateJumpingBaddie(){

  checkPlayerCollision(this.index);

  // jump at some point
  if(this.counter%150===0) this.startJump(baddies[this.index]);
  // if not knocked back, move between boundaries
  if(!this.knockedBack) this.moveInBounds(2);
}
