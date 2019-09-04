// update() and display() functions for a jumping baddie

function displayJumpingBaddie(){

  let tDist = -this.h;
  ctx.translate(0,tDist)

  let pos = posOnScreen(this);
  this.getDir();
  let loop= tigerWalkLoop;
  if(
    distToGround(this.x+this.w/2,this.y,this.w)>2
  )  loop = tigerJumpLoop;


  displayStringLoop(loop,pos.x,pos.y-1.5*27,27,3,this.dir);

  ctx.translate(0,-tDist)
  this.counter++;
}

function updateJumpingBaddie(){

  checkPlayerCollision(this.index);

  // jump at some point
  if(this.counter%150===0) this.startJump(baddies[this.index]);
  // if not knocked back, move between boundaries
  this.moveInBounds(2);
}
