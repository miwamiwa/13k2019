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
  baddies.push( new movingObject(x, y, 40,40,kit.d,kit.u, baddies.length) );
  let index = baddies.length-1;
  baddies[index].leftBoundX = baddies[index].x - range;
  baddies[index].rightBoundX = baddies[index].x + range;
}

// check collision between all baddies and player.

function checkPlayerCollision(index){

  if(collideRectRect(
    baddies[index].x,
    baddies[index].y,
    baddies[index].w,
    baddies[index].h,
    player.x,player.y,player.w,player.h)
    && !player.knockedBack
  ){

    let knock = false;
    let whichBaby = 0;
    for(let i=0; i<babies.length; i++){
      if(babies[i].isCarried&&!knock) {
        babies[i].isCarried = false;
        knock = true;
        whichBaby = i;
      }
    }

if(baddies[index].x<player.x){
  baddies[index].collided(-1);
  player.collided(1);
  babies[whichBaby].collided(-3);
}
else{
  baddies[index].collided(1);
  player.collided(-1);
    babies[whichBaby].collided(3);
}


      console.log("collision!")
  }
}