/*
class movingObject
this is the class for the player, babies, jumping baddies and flying baddies.
listens for (and runs) falls, jumps and knockbacks.
updates X position using speedX value. the rest has to be added as arguments.

arguments:
- x,y: coordinates at start
- a display function
- a motion function (includes things like changes in speedX, jump trigger etc)
- index: position within parent array (for babies[] or baddies[])
*/

class movingObject{

  constructor(x, y ,w,h,display,motion,index){

    this.speedX = 0;
    this.x = x;
    this.y = y;
    this.w =w;
    this.h=h;
    this.jumping = false;
    this.fallSpeed=0;
    this.display = display;
    this.updateMotion = motion;
    this.counter =0;
    this.index=index;
    this.isCarried = false;
    this.dir = 1;
    this.init = {x:x,y:y};
    if(y===0) this.flying = true;
    else this.flying = false;
  }

  // update(): updates position of and displays this object
  update(){
    this.onScreen = false;
    let xPos = canvasW/2 - (player.x-this.x);
    let yPos = this.y-yShift;
    if(inBox(xPos,yPos,0,0,canvasW,canvasH)) this.onScreen = true;

    this.newPos();
    this.updateMotion();
    this.display();
  }

  newPos(){

    // if knocked back, update this.speedX
    if(this.knockedBack) this.calculateKnockBack();

    // update x pos


  this.x = constrain(this.x+this.speedX,0,levelRange);
//  else this.x += this.speedX;

    // if jumping, update y position
    if(this.jumping) this.calculateJump();
    // if not flying or carried, check if falling and update y position
    else if(!this.flying&&!this.isCarried) this.calculateFall();

  }

  // startjump()
  // check if already jumping and loosely near the ground then trigger jump

  startJump(input){

    if(!this.jumping&&distToGround(this.x+this.w/2,this.y,this.w)<2){

      if(this.index==="player") jumpSFX(0.5,1,0.35);
      else if(this.onScreen) jumpSFX(0.8,1.2,0.1);
      this.jumping = true;
      this.jumpForce = 20;
    }
  }

  // calculateJump: update this.y during jump. also ends jump.
  calculateJump(){

    // during jump, decrease jump force and move up
    this.jumpForce -= 2;
    this.y -= this.jumpForce;

    // jump is over once force reaches 0
    if(this.jumpForce<=0) this.jumping = false;
  }

  // calculateFall(): check distance to ground, then fall.
  // there is no fall "end": movingObject will fall as long as there is
  // fall distance below.

  calculateFall(){

    // check distance to ground
    let dist = distToGround(this.x+this.w/2,this.y,this.w);

    // during fall:
    if( dist>this.fallSpeed ){
      this.y += this.fallSpeed;
      this.fallSpeed +=1;
      this.falling = true;
        //if(this.index==="player") console.log("hi")
    }
    // fall end:
    else if(dist>0){
      if(
        this.falling===true
        &&this.fallSpeed>1
        &&inBox(this.x,this.y,player.x-canvasW/2,player.y-canvasH/2,canvasW,canvasH)
      ) thumpSFX();
     this.falling = false;

      this.fallSpeed = 0;
      this.y += dist-1;
    }


  }

  // calculateKnockBack: updates speedX during knockback. also ends knockback.
  calculateKnockBack(){
    let vel = Math.floor(this.speedX);
    if(vel>0) this.speedX--;
    else if(vel<0) this.speedX++;
    else  this.knockedBack = false;
  }

  // collided()
  // trigger and setup knockback motion
  // called in checkPlayerCollision() (in collisions.js)

  collided(input){

    this.knockedBack = true;
    this.speedX = 10*input;
    this.jumpForce =0;
    this.flying = false;
    this.grabbable = false;
  }

  // moveInBounds()
  // when called, updates speedX so that this object moves
  // between boundaries. this.leftBoundX and this.rightBoundX variables
  // aren't part of this.constructor(); they are added in manually after
  // creating a new movingObject (as done in function newBaddie() in baddies.js)

  moveInBounds(vel){
    if(this.x<=this.leftBoundX) this.speedX = vel;
    else if(this.x>=this.rightBoundX)  this.speedX = -vel;
    else if(this.speedX ===0){
      if(Math.random()>0.5) this.speedX = 1;
      else this.speedX =-1;
    }
  }
}
