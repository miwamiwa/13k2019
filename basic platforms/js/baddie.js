function displayJumpingBaddie(){

  checkPlayerCollision(this.index);
  //console.log(this.counter)
  if(this.counter%150===0) this.startJump(baddies[this.index]);
if(!this.knockedBack) this.moveInBounds(2);

console.log(this.speedX)
//console.log(this.speedX)
//  console.log(this.speedX)

  ctx = canvas.context;
  ctx.beginPath();
  ctx.fillStyle = "#FF6600";
      let xPos = canvasW/2 - (player.x-this.x)
  ctx.fillRect(xPos,this.y-40, 40, 40);
  ctx.stroke();
  ctx.closePath();
  this.counter++;
}

function displayFlyingBaddie(){

  checkPlayerCollision(this.index);

  if(this.flying) {

    if(this.y>100) this.y --;
    else this.y = constrain( this.y + -1+Math.random()*2, 40,canvasH);

    if(this.counter%450===0) this.flying = false;
    if(!this.knockedBack){
      this.moveInBounds(2);
    }

  }
  else {
    if(this.counter%150===0) this.flying = true;
    if(!this.knockedBack){
      this.moveInBounds(2);
    }
  }



  ctx = canvas.context;
  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
      let xPos = canvasW/2 - (player.x-this.x)
  ctx.fillRect(xPos,this.y-40, 40, 40);
  ctx.stroke();
  ctx.closePath();
  this.counter++;
}

function setupBaddies(){

    newBaddieAtX(player.x+ canvasW/2 -20,canvasH,displayJumpingBaddie);
    newBaddieAtX(player.x+ -20,0,displayFlyingBaddie);

}

/*
function runBaddies(){

  for(let i=0; i<baddies.length; i++){
    baddies[i].display();
  //  baddies[i].newPos();
  }
}
*/
function newBaddieAtX(x,y,type){
  baddies.push( new movingObject(x, y, type, baddies.length) );
  let index = baddies.length-1;
  baddies[index].leftBoundX = baddies[index].x - 200;
  baddies[index].rightBoundX = baddies[index].x + 200;
  baddies[index].speedX = 2;
}
