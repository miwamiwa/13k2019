// update() and display() functions for a jumping baddie

function displayJumpingBaddie(){

  ctx = canvas.context;
  ctx.beginPath();
  ctx.fillStyle = "#FF6600";
  let xPos = canvasW/2 - (player.x-this.x)
  ctx.fillRect(xPos,this.y-yShift-40, 40, 40);
  ctx.stroke();
  ctx.closePath();
  this.counter++;
}

function updateJumpingBaddie(){

  checkPlayerCollision(this.index);
  
  // jump at some point
  if(this.counter%150===0) this.startJump(baddies[this.index]);
  // if not knocked back, move between boundaries
  if(!this.knockedBack) this.moveInBounds(2);
}
