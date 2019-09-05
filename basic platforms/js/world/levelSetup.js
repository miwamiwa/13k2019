// setuplevel()
// create all game elements according to input level object

function setupLevel(l){

  levelRange = l.size;
  ground = [];
  baddies = [];
  babies = [];
  currentPhase =0;

  for(let i=0; i<l.plat.length; i++){
    ground.push( new groundTile(
      l.plat[i].x*10,
      canvasH-l.plat[i].y*10,
      l.plat[i].w*10
    ));
  };

  for(let i=0; i<l.baddies.length; i++){
    let res = getXYOnPlat(l.baddies[i],l.plat);
    let kit = l.baddies[i].kit;

    if(kit.t==="jump"){
      kit.d=displayJumpingBaddie;
      kit.u=updateJumpingBaddie;
    }
    else {
      kit.d=displayFlyingBaddie;
      kit.u=updateFlyingBaddie;
    }
    newBaddie( res.x, res.y, l.baddies[i].r, l.baddies[i].kit );
  }

  // add extra tiles throughout the ground with trees on em
  for(let i=0; i<l.size/150; i++){
    let rand = randI(3)
    ground.push(new groundTile( i*150+flRand(0,50), canvasH, 10 ));
    ground[ ground.length-1 ].hasCos = { x:0, t:rand };
  }

  let p = getXYOnPlat(l.player,l.plat);
  player = new movingObject(p.x, p.y, 75,75,displayDudeBox,updatePlayerMotion,"player");
  player.sleeping = true;
  player.babiesCarried =0;
  startPos = {x:p.x,y:p.y,w:80,h:80};
  babiesReturned = 0;

  for(let i=0; i<l.babies.count; i++){
    l.babies.p  = l.babies.pos[ randI(l.babies.pos.length) ];
    let res = getXYOnPlat(l.babies,l.plat)
    newBaby( res.x+i*10,res.y )
  }

}
