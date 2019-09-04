// update() and display() functions for a flying baddie

function displayFlyingBaddie(){

  let tDist = -this.h;
  ctx.translate(0,tDist)

  let pos = posOnScreen(this);
  this.getDir();

  if(this.flying) displayStringLoop(birdFlapLoop,pos.x,pos.y,20,2,-this.dir);
  else displayStringLoop(birdStillLoop,pos.x,pos.y,20,2,this.dir);

  ctx.translate(0,-tDist)
  this.counter++;

}

function updateFlyingBaddie(){

  checkPlayerCollision(this.index);

  // while flying
  if(this.flying) {

    // fly up until this.y=100
    if(this.y>this.init.y-50) this.y --;
    // if this.y>100, fly up and down at random
    else {
      this.y = constrain( this.y + -1+Math.random()*2, this.init.y-100,canvasH);

      // stop flying at some point (baddies falls back to the ground)
      if(this.counter%450===0) {
        this.flying = false;
      if(this.onScreen) birdChirpSFX();
      }
    }



    // if not knocked back, update speedX so as to move between boundaries
    if(!this.knockedBack) this.moveInBounds(2);
  }
  else {

    // if no longer flying
    // move between boundaries
    if(!this.knockedBack) this.moveInBounds(2);
    // start flying at some point
    if(this.counter%150===0) {
      this.flying = true;
      if(this.onScreen) birdChirpSFX();
    }

  }
}
