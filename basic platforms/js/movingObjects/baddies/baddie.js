/*
baddie.js:
remnants of a larger file that used to be ..
*/


// newBaddie()
// creates a new baddie during game setup.
// arguments: - x,y: coordinates at start
//            - range: space between start position and boundaries
//            - kit: update and display functions

function newBaddie(x,y,range,kit){
  baddies.push( new movingObject(x, y, kit.w,kit.h,kit.d,kit.u, baddies.length) );
  let index = baddies.length-1;
  baddies[index].leftBoundX = baddies[index].x - range;
  baddies[index].rightBoundX = baddies[index].x + range;
}

// check collision between all baddies and player.

function checkPlayerCollision(index){
/*
// DISPLAY COLLISION RECTANGLE
  ctx.beginPath();
  ctx.strokeStyle = "#FF6600";
  ctx.rect(canvasW/2 - (player.x-baddies[index].x),
  baddies[index].y-yShift-baddies[index].h,
  baddies[index].w,
  baddies[index].h);
  ctx.rect(canvasW/2,player.y-yShift-player.h,player.w,player.h)
  ctx.stroke();
  ctx.closePath();
*/
  if(collideRectRect(
    canvasW/2 - (player.x-baddies[index].x),
    baddies[index].y-yShift-baddies[index].h,
    baddies[index].w,
    baddies[index].h,
    canvasW/2,player.y-yShift-player.h,player.w,player.h)
    && !player.knockedBack
  ){

    triggerParticles(player.x+player.w/2,player.y+player.h/2,[{r:255,g:125,b:125}])
    collideSFX();
    let knock = false;
    let whichBaby = 0;
    let playerOnTop = false;
    let force = 0.8;

    if(baddies[index].y-20>player.y&&distToGround(player.x+player.w/2,player.y,player.w)>5){
      playerOnTop = true;
      force = 1.5;
    }
    for(let i=0; i<babies.length; i++){

      if(babies[i].isCarried&&!knock&&!playerOnTop) {
        babies[i].isCarried = false;
        knock = true;
        whichBaby = i;
      }
    }

    setTimeout( function(){
      babies[whichBaby].grabbable = true;
    },1000);

if(baddies[index].x<player.x){
  baddies[index].collided(-force);
  player.collided(1);
  if(knock) babies[whichBaby].collided(-3);
}
else{
  baddies[index].collided(force);
  player.collided(-1);
  if(knock)  babies[whichBaby].collided(3);
}


      console.log("collision!")
  }
}
