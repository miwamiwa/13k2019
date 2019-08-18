class groundTile{
  constructor(x,y,w){
    this.x = x;
    this.y = y;
    this.w = w;
  }

  display(){
    if(
      inRange(this.x,player.x,canvasW/2)
      || inRange(this.x+this.w,player.x,canvasW/2)
    ){
      ctx.beginPath();
      ctx.strokeStyle = "#000000";
          let xPos = canvasW/2 - (player.x-this.x)
      addLine(xPos,this.y,xPos+this.w,this.y);
      ctx.stroke();
      ctx.closePath();
    }
  }
}


function setupPlatforms(){
  let lasty = 30;
for(let i=0; i<100; i++){

  ground.push(new groundTile(i*170, canvasH - (lasty + (Math.random()*60-30)), 150));
}
//  ground.push(new groundTile(10,200,200));
//  ground.push(new groundTile(180,250,200));
}

class Obstacle{

  constructor(){

  }

  display(){

  }
}
