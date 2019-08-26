function triggerParticles(x,y,c){

  let amount = 4+ Math.floor( Math.random()* 5);

  for(let i=0; i<amount; i++){
    let col = flRand(0,c.length);
    particles.push( new Particle(x,y,particles.length,col) );
  }
}

class Particle{

  constructor(x,y,index,c){
    console.log("new particle")
    this.x=x-player.w/2;
    this.y=y-player.h/2;
    this.speed = flRand(2,4);
    this.dir = Math.random()*2*Math.PI;
    this.vel = {
      x: this.speed*Math.cos(this.dir),
      y: this.speed*Math.sin(this.dir)
    };
    this.opa = 1;
    this.r = c.r;
    this.g = c.g;
    this.b = c.b;

  }

  update(){
console.log("eyo")
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.opa -= this.speed/150;
ctx = canvas.context;
    ctx.beginPath();
    ctx.globalAlpha = this.opa;
    ctx.fillStyle = "rgba("+this.r+","+this.g+","+this.b+")";
    let xPos = canvasW/2 - (player.x-this.x);
    let yPos = this.y-yShift;
    ctx.fillRect(xPos,yPos,5,5);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.closePath();

    console.log(this.opa)

    if(this.opa<=0) killParticle(this.index);
  }
}

function flRand(min,max){
  return Math.floor( min+Math.random()*(max-min) );
}

function killParticle(index){
  console.log("particle dead")
  particles.splice(index,1);
}
