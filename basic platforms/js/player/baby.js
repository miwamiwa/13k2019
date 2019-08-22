
function newBaby(){

  babies.push( new movingObject(player.x+50,player.y, displayBaby,babies.length) );
 babies[babies.length-1].isExploring = true;
 babies[babies.length-1].isCarried = false;

}

  function displayBaby(){
//    this.jumping = false;
    if(this.isCarried){
//      console.log(this.isCarried)
    this.x = player.x;
    this.y = player.y - 15;
    }
    else {
      if(this.isExploring) this.speedX = constrain(
        this.speedX+-1+Math.random()*2,
        -2,2
      );
      else this.speedX =0;

      if( inBox(this.x,this.y,player.x,player.y,40,40)){
        this.isCarried = true;
        console.log("carried!")
      }
    }

  //  console.log(this.y)
    let translateDist = -10;
    ctx = canvas.context;
      ctx.translate(0,translateDist)
    ctx.beginPath();

    ctx.fillStyle = "#00FFFF";
      //  let xPos = canvasW/2 - (player.x-this.x)
      let xPos = canvasW/2 - (player.x-this.x)
    ctx.fillRect(xPos,this.y, 20,20);
    ctx.stroke();
    ctx.closePath();

        ctx.translate(0,-translateDist)
  }
