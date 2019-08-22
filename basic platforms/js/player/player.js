let body = {
  legLength:20,
  armLength:18,
  legs:[
    {thigh:0,knee:0,thighGoal:0,kneeGoal:0},
    {thigh:0,knee:0,thighGoal:0,kneeGoal:0}
  ],

  arms:[
    {shoulder:0,elbow:0,shoulderGoal:0,elbowGoal:0},
    {shoulder:0,elbow:0,shoulderGoal:0,elbowGoal:0}
  ],
}

function updateCurrentAngles(){
  let speed = 0.05;
  for(let i=0; i<2; i++){
    body.legs[i].thigh = reachGoal(body.legs[i].thigh,body.legs[i].thighGoal,speed);
    body.legs[i].knee = reachGoal(body.legs[i].knee,body.legs[i].kneeGoal,speed);
    body.arms[i].shoulder = reachGoal(body.arms[i].shoulder,body.arms[i].shoulderGoal,speed);
    body.arms[i].elbow = reachGoal(body.arms[i].elbow,body.arms[i].elbowGoal,speed);
  }

}

function reachGoal(input,goal,speed){
  result = input;
  if(input+speed<goal) result += speed;
  else if(input-speed>goal) result -= speed;
  return result;
}

function displayDudeBox(){

  ctx = canvas.context;
  let xPos = canvasW/2;
  let translateDist = -40;
    ctx.translate(0,translateDist)
  ctx.beginPath();

  ctx.fillStyle = "#0000FF";
    //  let xPos = canvasW/2 - (player.x-this.x)
  ctx.fillRect(xPos,this.y, 40, 40);
  ctx.stroke();
  ctx.closePath();

      ctx.translate(0,-translateDist)
//  this.counter++;
}


// displaydude()
//
// draws the player

function displayDude(){
  let xPos = canvasW/2;
  let translateDist = -40;
    ctx.translate(0,translateDist)
  ctx.beginPath();
  ctx.strokeStyle = "#000000";

  updateMotion();
  updateCurrentAngles();

  drawLeg(xPos-2,this.y+10,body.legs[0].thigh,body.legs[0].knee,body.legLength);
  drawLeg(xPos+2,this.y+10,body.legs[1].thigh,body.legs[1].knee,body.legLength);

  drawLeg(xPos-2,this.y-20,body.arms[0].shoulder,body.arms[0].elbow,body.armLength);
  drawLeg(xPos+2,this.y-20,body.arms[1].shoulder,body.arms[1].elbow,body.armLength);

  // draw back
  addLine(xPos,this.y+10,xPos,this.y-20);

  //addLine(xPos,this.y,xPos+10,this.y+10)
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
    ctx.arc(xPos,this.y-32, 10, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

      ctx.translate(0,-translateDist)
}

/*
function moveY(dir) {
    player.speedY += dir*2;
}
*/
function moveX(dir) {

    if(dir>0) inputRight= true;
    else inputLeft = true;

}


function updateMotion(){

  let speedFactor = player.speedX * 0.5;
  let thighSpeed = 10/(1+speedFactor);
  let thighPos = 0.05;
  let thighMaxD = 0.01+0.09*speedFactor;

  let kneeSpeed = 10/(1+speedFactor);
  let kneePos = 0.9;
  let kneeMaxD = 0.01+0.2*speedFactor;

  body.legs[0].thighGoal = updateAngle(thighPos,thighSpeed,thighMaxD,-0.5,0.5,1);
  body.legs[1].thighGoal = updateAngle(thighPos,thighSpeed,thighMaxD,-0.5,0.5,-1);

  body.legs[0].kneeGoal = updateAngle(kneePos,kneeSpeed,kneeMaxD,0.3,0.95,1);
  body.legs[1].kneeGoal = updateAngle(kneePos,kneeSpeed,kneeMaxD,0.3,0.95,-1);

  let shoulderSpeed = 10/(1+speedFactor);
  let shoulderPos =  0.1- 0.03*speedFactor;
  let shoulderMaxD =  0.01- 0.08*speedFactor;

  let elbowSpeed = 10/(1+speedFactor);
  let elbowPos = -0.8*speedFactor;
  let elbowMaxD = 0.01-0.4*speedFactor;

  body.arms[0].shoulderGoal = updateAngle(shoulderPos,shoulderSpeed,shoulderMaxD,-0.6,0.5,1);
  body.arms[1].shoulderGoal = updateAngle(shoulderPos,shoulderSpeed,shoulderMaxD,-0.6,0.5,-1);

  body.arms[0].elbowGoal = updateAngle(elbowPos,elbowSpeed,elbowMaxD,-0.95,-0.3,1);
  body.arms[1].elbowGoal = updateAngle(elbowPos,elbowSpeed,elbowMaxD,-0.95,-0.3,-1);
}



function drawLeg(x,y,aThigh,aKnee,limbLength){

  let angle1 = aThigh*Math.PI;
  let x2 = x+ limbLength*Math.sin(angle1);
  let y2 = y+ limbLength*Math.cos(angle1);

  let angle2 = (aKnee- (0.5-aThigh))*Math.PI;
  let x3 = x2 - limbLength*Math.cos(angle2);
  let y3 = y2 + limbLength*Math.sin(angle2);

  addLine(x,y,x2,y2);
  addLine(x2,y2,x3,y3);
}



function updatePlayerMotion(){
  if(!this.knockedBack){
    if(!inputLeft&&!inputRight) {
      if(player.speedX+stopSpeed<0) player.speedX+=stopSpeed;
      else if(player.speedX-stopSpeed>0) player.speedX-=stopSpeed;
      else player.speedX = 0;

    }
    else if(inputRight) player.speedX += 0.5;
    else if(inputLeft) player.speedX -= 0.1;
    player.speedX = constrain(player.speedX,-10,10);
  }
}
