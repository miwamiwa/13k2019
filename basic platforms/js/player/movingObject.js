class movingObject{

  constructor(x, y, display){

    this.speedX = 0;
    this.x = x;
    this.y = y;
    this.jumping = false;
    this.fallSpeed=0;
    this.display = display;
  }

  update(){
    refreshContext();
    this.display();
  }

  newPos(){
    this.x += this.speedX;

    if(this.jumping) this.calculateJump();
    else this.calculateFall();
  }

  startJump(){

    if(!this.jumping&&distToGround()<2){
      this.jumping = true;
      this.jumpFactor =0;
      this.jumpForce = 20;
    }
  }

  calculateJump(){

    // during jump
    this.jumpFactor += this.jumpForce;
    this.jumpForce -= 2;

    this.y -= this.jumpForce;
    // jump over
    if(this.jumpForce<=0) this.jumping = false;
  }

  calculateFall(){

    // if there is distance left to fall
    let dist = distToGround();
    // during fall:
    if( dist>this.fallSpeed ){

      this.y += this.fallSpeed;
      this.fallSpeed +=1;
    }
    // fall end:
    else if(dist>0){
      this.fallSpeed = 0;
      this.y += dist-1;
    }
  }
}

function distToGround(){

  let nearest = canvasH; // set nearest point to lowest point on canvas

  for(let i=0; i<ground.length; i++){ // for each platform/ground tile

    if(
      inSegment(player.x,ground[i].x,ground[i].w) // if player and ground tile are aligned on x axis
      && ground[i].y>player.y // and ground is below player
      && ground[i].y < nearest // and ground is above last nearest platform
    )
    nearest = ground[i].y; // update nearest platform value
  }
  return nearest - player.y; // return distance to nearest platform
}


// having this canvas variable hidden in a function instead of directly in class
// Player allows me to initialize player and canvas objects in any order

function refreshContext(){
  ctx = canvas.context;
}
