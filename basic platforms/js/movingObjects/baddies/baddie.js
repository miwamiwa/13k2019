


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
  baddies[index].stunTimer;
  baddies[index].stunned = false;
}

// check collision between all baddies and player.

function checkPlayerCollision(index){

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
    let pOnTop = false;
    let force = 0.8;

    if(baddies[index].y-20>player.y&&distToGround(player.x+player.w/2,player.y,player.w)>5){
      pOnTop = true;
      force = 1.5;
      baddies[index].stunned = true;
      let i = index;
      clearTimeout(baddies[index].stunTimer); 
      baddies[index].stunTimer = setTimeout(function(){baddies[i].stunned = false;},1000)
    }

    for(let i=0; i<babies.length; i++){

      if(babies[i].isCarried&&!knock&&!pOnTop) {
        babies[i].isCarried = false;
        knock = true;
        whichBaby = i;
        player.babiesCarried --;
        babies[whichBaby].grabbable = false;
      }
    }

    if(knock) setTimeout( function(){
      babies[whichBaby].grabbable = true;
    },500);

    let jforce = 15;

    if(baddies[index].x<player.x)sendEmFlying(index,force,jforce,pOnTop,knock,whichBaby,-1)
    else sendEmFlying(index,force,jforce,pOnTop,knock,whichBaby,1)

  }
}

function sendEmFlying(i,f,jf,pOT,k,wB,dir){
  baddies[i].collided(dir*f);
  if(pOT) player.forceJump(jf);
  else  player.collided(-1);
  if(k)  babies[wB].collided(dir*3);
}
