/*
so far babies don't do much but they can run around and be picked up and carried
this script contains update() and display() functions that go in a new movingObject,
and a function to add babies to the game.
*/

// newbaby(): to be called during level setup
function newBaby(x,y){

  babies.push( new movingObject(x,y, 20,20,displayBaby,updateBaby,babies.length) );
  babies[babies.length-1].isExploring = true;
  babies[babies.length-1].isCarried = false;

}


function updateBaby(){

  // if baby is carried then stick to player position
  if(this.isCarried){
    this.x = player.x;
    this.y = player.y - 15;
  }

  // if baby is not carried
  else {
    // if exploring, move around randomly
    if(this.isExploring) this.speedX = constrain(
      this.speedX+-1+Math.random()*2, -2,2
    );
    // if not exploring don't move
    else this.speedX =0;

    // if overlapping with player, mark as carried.
    if( inBox(this.x,this.y,player.x,player.y,player.w,player.h)) this.isCarried = true;

  }
}


function displayBaby(){

  let translateDist = -10;
  ctx = canvas.context;
  ctx.translate(0,translateDist)

  let xPos = canvasW/2 - (player.x-this.x)
  let yPos = this.y-yShift-this.h;
//  if(distToGround(this.x+this.w/2,this.y,this.w)>2)  displayStringLoop(tigerJumpLoop,xPos,yPos,15,2,this.dir);
  displayStringLoop(babyWalkLoop,xPos,yPos,15,2,this.dir);

  ctx.translate(0,-translateDist)
}
