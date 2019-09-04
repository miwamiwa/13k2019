/*
this script contains functions to create new baddies and check their collisions
*/


// newBaddie()
// creates a new baddie during game setup.
// arguments: - x,y: coordinates at start
//            - range: space between start position and boundaries
//            - kit: update and display functions

function newBaddie(x,y,range,kit){
  baddies.push( new movingObject(x, y, kit.w,kit.h,kit.d,kit.u, baddies.length) );
  let index = baddies.length-1;
  let b = baddies[index];
  b.leftBoundX = b.x - range;
  b.rightBoundX = b.x + range;
  b.stunTimer;
  b.stunned = false;
}

// check collision between all baddies and player.

function checkPlayerCollision(index){

  let b = baddies[index];
  let p = player;

  if(collideRectRect(
    canvasW/2 - (p.x-b.x),
    b.y-yShift-b.h,
    b.w,
    b.h,
    canvasW/2,p.y-yShift-p.h,p.w,p.h)
    && !p.knockedBack
//&& !b.knockedBack
  ){


    let knock = false;
    let whichBaby = 0;
    let pOnTop = false;
    let pOnBot = false;
    let force = 0.8;

    if(distToGround(p.x+p.w/2,p.y,p.w)>5){
      if(b.y-20>p.y) pOnTop = true;
      else if (b.y-b.h<p.y) pOnBot = true;
      else return;
      force = 1.5;
      b.stunned = true;
      let i = index;
      clearTimeout(b.stunTimer);
      b.stunTimer = setTimeout(function(){baddies[i].stunned = false;},1000)
    }

    for(let i=0; i<babies.length; i++){

      if(babies[i].isCarried&&!knock&&!pOnTop) {
        babies[i].isCarried = false;
        babies[i].isExploring = true;
        knock = true;
        whichBaby = i;
        p.babiesCarried --;
        babies[whichBaby].grabbable = false;
      }
    }

    if(knock) setTimeout( function(){
      babies[whichBaby].grabbable = true;
    },500);

    let jforce = 15;

    if(b.x<p.x)sendEmFlying(index,force,jforce,pOnTop,pOnBot,knock,whichBaby,-1)
    else sendEmFlying(index,force,jforce,pOnTop,pOnBot,knock,whichBaby,1)

  }
}

function sendEmFlying(i,f,jf,pOT,pOB,k,wB,dir){
  let p = player;
  if(pOT) {
    p.forceJump(jf);
    baddies[i].collided(dir*f);
    console.log("over!")
  }
  else if(pOB) {
    console.log("under!")
    player.collided(-dir);
    baddies[i].forceJump(1.5*jf);
  //  baddies[i].knockedBack = true;
  //  setTimeout(function(){
//baddies[i].knockedBack = false;
  //  }, 50);
  }
  else  {
    console.log("neither!")
    p.collided(dir);
    baddies[i].collided(-dir*f)

  }
  if(k)  babies[wB].collided(dir*3);

  triggerParticles(p.x+p.w/2,p.y+p.h/2,[{r:255,g:125,b:125}])
  collideSFX();
}
