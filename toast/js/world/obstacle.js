class Obstacle{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.r = Math.floor( 4+Math.random()*5); // give this obstacle a random radius.
    // the way the collision code is right now, large radii make the collisions
    // look unrealistic. could be improved or obstacles could be kept small. 
  }

  display(){
    // if this obstacle is on screen
    if( inRange(this.y,player.y,canvasH/2) ){
      // count it in the array of obstacles to check for collision
      pinsOnScreen.push({x:this.x,y:this.y,r:this.r});

      // display obstacle
      ctx.beginPath();
      ctx.strokeStyle = "#000000";
      let yPos = canvasH/2 - (player.y-this.y);
      ctx.arc(this.x,yPos, this.r, 0, 2 * Math.PI); // this is a circle
      ctx.lineWidth=2;
      ctx.stroke();
      ctx.closePath();
    }
  }
}



// creates obstacles on setup()
function setupObstacles(){

  for(let i=0; i<numberOfPins; i++){
    pins.push(new Obstacle( Math.random()*canvasW, i*spaceBetween ));
  }
}
