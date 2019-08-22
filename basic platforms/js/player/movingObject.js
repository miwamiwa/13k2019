class movingObject{

  constructor(x, y, display,index){

    this.speedX = 0;
    this.x = x;
    this.y = y;
    this.w =40;
    this.h=40;
    this.jumping = false;
    this.fallSpeed=0;
    this.display = display;
    this.counter =0;
    this.index=index;
    this.isCarried = false;
    if(y===0) this.flying = true;
    else this.flying = false;
  }

  update(){
    this.newPos();
    this.display();
  }

  newPos(){
    this.x += this.speedX;
    if(!this.knockedBack){
      if(this.jumping) this.calculateJump();
      else if(!this.flying&&!this.isCarried){
        if(this.index==="player") this.calculateFall(player);
        else this.calculateFall(baddies[this.index]);
      }
    }
    else {
      let vel = Math.floor(this.speedX);
      if(vel>0) this.speedX--;
      else if(vel<0) this.speedX++;
      else {
        this.knockedBack = false;
        console.log("knock back over "+this.knockedBack)
      }
    }
  }

  startJump(input){

    if(!this.jumping&&distToGround(this.x+20,this.y)<2){
      console.log("jumping")
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

  calculateFall(input){
//console.log("fallin")
    // if there is distance left to fall
    let dist = distToGround(this.x+20,this.y);
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

  collided(input){

    this.knockedBack = true;
    this.speedX = 10*input;
  }

  moveInBounds(vel){

    if(this.x<=this.leftBoundX) this.speedX = vel;
    else if(this.x>=this.rightBoundX)  this.speedX = -vel;
    else if(this.speedX ===0){
      if(Math.random()>0.5) this.speedX = 1;
      else this.speedX =-1;
    }
  }
}

function distToGround(x,y){

  let nearest = canvasH; // set nearest point to lowest point on canvas

  for(let i=0; i<ground.length; i++){ // for each platform/ground tile

    if(
      inSegment(x,ground[i].x,ground[i].w) // if player and ground tile are aligned on x axis
      && ground[i].y>y // and ground is below player
      && ground[i].y < nearest // and ground is above last nearest platform
    )
    nearest = ground[i].y; // update nearest platform value
  }
  return nearest - y; // return distance to nearest platform
}


// having this canvas variable hidden in a function instead of directly in class
// Player allows me to initialize player and canvas objects in any order

function refreshContext(){
  ctx = canvas.context;
}
