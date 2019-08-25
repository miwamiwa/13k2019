class groundTile{
  constructor(x,y,w){
    this.x = x;
    this.y = y;
    this.w = w;
    this.hasNest = false;
  }

  display(){


    // if ground tile is on screen (kinda)
    if(
      inRange(this.x,player.x,canvasW/2)
      || inRange(this.x+this.w,player.x,canvasW/2)
    ){
      /*
      ctx.beginPath();
      ctx.strokeStyle = "#000000";
          let xPos = canvasW/2 - (player.x-this.x)
      addLine(xPos,this.y-yShift,xPos+this.w,this.y-yShift);
      ctx.stroke();
      ctx.closePath();

      */
      let xPos = canvasW/2 - (player.x-this.x)
      for(let i=0; i<this.w/20; i++){
        displayImage( groundImg.a, groundImg.c, xPos+i*20,this.y-yShift-4, 5,4,1 )
      }


      if(this.hasNest!=false){ // display nest if there is a nest

        ctx.beginPath();
        ctx.fillStyle = "#99FF99";
        ctx.fillRect(xPos+this.hasNest,this.y-yShift-40, 40, 40);
        ctx.closePath();
      }
    }
  }
}
