// update() and display() functions for a flying baddie

function displayFlyingBaddie(){

  let translateDist = -this.h;
  ctx.translate(0,translateDist)

  let xPos = canvasW/2 - (player.x-this.x);
  let yPos = this.y-yShift;
  if(this.speedX!=0) this.dir = -this.speedX/Math.abs(this.speedX);

  if(this.flying) displayStringLoop(birdFlapLoop,xPos,yPos,20,2,-this.dir);
  else displayStringLoop(birdStillLoop,xPos,yPos,20,2,this.dir);

  ctx.translate(0,-translateDist)
  this.counter++;

}

function updateFlyingBaddie(){

  checkPlayerCollision(this.index);

  // while flying
  if(this.flying) {

    // fly up until this.y=100
    if(this.y>this.init.y-50) this.y --;
    // if this.y>100, fly up and down at random
    else this.y = constrain( this.y + -1+Math.random()*2, this.init.y-100,canvasH);

    // stop flying at some point (baddies falls back to the ground)
    if(this.counter%450===0) this.flying = false;

    // if not knocked back, update speedX so as to move between boundaries
    if(!this.knockedBack) this.moveInBounds(2);
  }
  else {

    // if no longer flying
    // move between boundaries
    if(!this.knockedBack) this.moveInBounds(2);
    // start flying at some point
    if(this.counter%150===0) this.flying = true;

  }
}
