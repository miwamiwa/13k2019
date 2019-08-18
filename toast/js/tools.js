
// check for circle/pin collision at points along the tartine/line.
function checkPinCollision(pin,xDist,yDist){

  for(let i=0; i<player.pointsCount+1; i++){

    if(collidePointCircle(player.x+i*xDist,player.y+i*yDist, pin.x, pin.y, pin.r*2)){
      player.collided(-i);
      return;
    }
    if(collidePointCircle(player.x-i*xDist,player.y-i*yDist, pin.x, pin.y, pin.r*2)){
      player.collided(i);
      return;
    }
  }
}



// gotta refresh dat ctx variable. this is a weird remnant of the w3schools
// canvas examples.. not sure if im doing this right but apparently i need to
// call this before drawing each object.

function refreshContext(){
  ctx = canvas.context;
}


// a short method to setup a line to draw
function addLine(x,y,x2,y2){
  ctx.moveTo(x,y);
  ctx.lineTo(x2,y2);
}


// check if point p1 is inside radius r around point p2
function inRange(p1,p2,r){
return  ( p1< p2+r
  && p1 > p2-r );
}


// grabbed this from p5js collide 2d
function collidePointCircle(x, y, cx, cy, d) {
if( distance(x,y,cx,cy) <= d/2 ) return true;
return false;
};

// returns distance between point 1 and 2
function distance(x1,y1,x2,y2){
  return Math.sqrt( Math.pow(x2-x1,2) + Math.pow(y2-y1,2) );
}

// return value constrained between min and max
function constrain(input,min,max){
   return Math.min(Math.max(input, min), max);
}

// toggle motion booleans upon key press
function moveX(dir) {
    if(dir>0) inputRight= true;
    else inputLeft = true;
}
