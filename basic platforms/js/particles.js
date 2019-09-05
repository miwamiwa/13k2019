function triggerParticles(x,y,co){

  let amount = 4+ randI(5);

  for(let i=0; i<amount; i++){
    let col = flRand(0,co.length);
    particles.push( new Particle(x,y,particles.length,co[col]) );
  }
}

class Particle{

  constructor(x,y,index,co){
  //  console.log("new particle")
    this.x=x-player.w/2;
    this.y=y-player.h/2;
    this.speed = flRand(2,4);
    this.dir = Math.random()*2*Math.PI;
    this.vel = {
      x: this.speed*Math.cos(this.dir),
      y: this.speed*Math.sin(this.dir)
    };
    this.opa = 0.8;
    this.r = co.r;
    this.g = co.g;
    this.b = co.b;

  }

  update(){
//console.log("eyo")
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.opa -= this.speed/150;
    ctx = canvas.context;
    ctx.beginPath();
    ctx.globalAlpha = this.opa;
    ctx.fillStyle = "rgba("+this.r+","+this.g+","+this.b+")";
    let pos = posOnScreen(this);
    ctx.fillRect(pos.x,pos.y,8,8);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.closePath();

    if(this.opa<=0) killParticle(this.index);
  }
}



function killParticle(index){
  particles.splice(index,1);
}
