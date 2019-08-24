/*
so far babies don't do much but they can run around and be picked up and carried
this script contains update() and display() functions that go in a new movingObject,
and a function to add babies to the game.
*/

// newbaby(): to be called during level setup
function newBaby(x,y){

  babies.push( new movingObject(x,y, displayBaby,updateBaby,babies.length) );
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
    if( inBox(this.x,this.y,player.x,player.y,40,40)) this.isCarried = true;

  }
}


function displayBaby(){

  let translateDist = -10;
  ctx = canvas.context;
  ctx.translate(0,translateDist)
  ctx.beginPath();

  ctx.fillStyle = "#00FFFF";
  /*
  let xPos = canvasW/2 - (player.x-this.x)
  ctx.fillRect(xPos,this.y-yShift-40, 40, 40);
  */
  let xPos = canvasW/2 - (player.x-this.x)
  ctx.fillRect(xPos,this.y-yShift-10, 20,20);
  ctx.stroke();
  ctx.closePath();

  ctx.translate(0,-translateDist)
}
