class movingObject{

  constructor(x, y, display){

    this.speedX = 0;
    this.speedY = 4;  // downward velocity (stays constant right now)
    this.pointsCount= 8; // number of points on each side
    this.angle =0;
    this.w = 30;
    this.x = x;
    this.y = y;
    this.rotationForce = 0;

    this.rotationSlow = 0.02; // rate at which rotation speed slows down
    this.impactFactor = 20; // higher value = softer impacts

    this.thickness = 4; // thickness of the tartine's layers
    this.layers = ["#ede182","#bd1c44"]; // layer colors

    this.maxLateralSpeed = 10;
    this.lateralAcceleration =0.5;

  }

  // one-stop function to be called in the main game loop
  update(){

    this.updateXY();
    this.checkCollision();
    this.updateAngle();

    refreshContext();
    this.display();
  }

  checkCollision(){

    /*
    collision:
    collision is checked by verifying overlap between points each pin on screen
    and points along the tartine's line.
    */
    let xDist = Math.cos(this.angle) * this.w/(2*this.pointsCount);
    let yDist = Math.sin(this.angle) * this.w/(2*this.pointsCount);

    for(let i=0; i<pinsOnScreen.length; i++){
      // don't continue if distance to pin excedes segment length
      if(distance(pinsOnScreen[i].x,pinsOnScreen[i].y,this.x,this.y)<this.w*2) checkPinCollision(pinsOnScreen[i],xDist,yDist);
    }
  }


  // update rotation force upon collision
  collided(point){
    console.log("collided at point "+point);
    if(point!=0) this.rotationForce += (2+point)/this.impactFactor;
  }


  // update angle according to rotation force, and dampen force
  updateAngle(){
    // update angle
    this.angle += this.rotationForce;
    // slow rotation speed
    if(this.rotationForce+this.rotationSlow<0) this.rotationForce += this.rotationSlow;
    else if(this.rotationForce-this.rotationSlow>0) this.rotationForce -= this.rotationSlow;
  }


  updateXY(){
    // add speed to current position
    this.x = constrain(this.x+this.speedX,0,canvasW);
    this.y += this.speedY;
  }


  display(){

    // position
    ctx.translate(this.x,centerY);
    ctx.rotate(this.angle);

    // draw the tartine
    this.drawLayers(this.layers)

    // p5's "pop()" basically
    ctx.rotate(-this.angle);
    ctx.translate(-this.x,-centerY)
  }


  // draw layers using colors provided
  drawLayers(input){
    for(let i=0; i<input.length; i++){
      ctx.beginPath();
      ctx.strokeStyle = input[i];
      ctx.lineWidth=this.thickness;
      addLine(-this.w/2,i*this.thickness,+this.w/2,i*this.thickness);

      ctx.stroke();
      ctx.closePath();
    }
  }
}
