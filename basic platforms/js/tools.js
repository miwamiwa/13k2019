
// check if point p1 is inside radius r around point p2
function inRange(p1,p2,r){
return  ( p1< p2+r
  && p1 > p2-r );
}

// check if point p1 is in segment from x to x+w
function inSegment(p1,w1,x,w){
  return (
    p1+w1/2-8 > x
    && p1-w1/2+8 < x+w
  );
}

// check if point is in box
function inBox(px,py,x,y,w,h){

  if(px>=x && px<=x+w && py>=y && py<=y+h) return true;
  else return false;
}


// https://github.com/bmoren/p5.collide2D/blob/master/p5.collide2d.js

function collideRectRect(x, y, w, h, x2, y2, w2, h2) {
  //2d
  //add in a thing to detect rectMode CENTER
  if (x + w >= x2 &&    // r1 right edge past r2 left
      x <= x2 + w2 &&    // r1 left edge past r2 right
      y + h >= y2 &&    // r1 top edge past r2 bottom
      y <= y2 + h2) {    // r1 bottom edge past r2 top
        return true;
  }
  return false;
};

function displayAll(input){
  for(let i=0; i<input.length; i++){
    input[i].display();
  }
}

function updateAll(input){
  
  for(let i=0; i<input.length; i++){
    input[i].update();
  }
}


function constrain(input,min,max){
   return Math.min(Math.max(input, min), max);
}


function updateAngle(pos,speed,maxDisplacement,min,max,phase){
  //  if(player.flip>0)
  return constrain( (pos + phase* Math.sin( frame / speed )*maxDisplacement), min,max);
  //  else return constrain( (pos + phase* Math.sin( frame / speed )*maxDisplacement), -max,-min);
}


function addLine(x,y,x2,y2){
  ctx.moveTo(x,y);
  ctx.lineTo(x2,y2);
}


function distToGround(x,y,w){

  let nearest = canvasH; // set nearest point to lowest point on canvas

  for(let i=0; i<ground.length; i++){ // for each platform

    if(
      inSegment(x,w,ground[i].x,ground[i].w) // if player and platform are aligned on x axis
      && ground[i].y>y // and ground is below player
      && ground[i].y < nearest // and ground is above last "nearest" platform
    )
    nearest = ground[i].y; // then this is platform is the closer than the last
  }
  return nearest - y; // return distance to nearest platform
}



function getXYOnPlat(input,platforms){
  let x,y;
  if(input.p ===-1) { // if input is -1, ground is the actual ground
    x = input.x;
    y = canvasH;
  }
  else { // if input is anything else, ground is a platform
    x = platforms[ input.p ].x + input.x;
    y = canvasH-platforms[ input.p ].y - 10;
  }
  return {x:x,y:y};
}
