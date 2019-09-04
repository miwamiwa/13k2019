// setuplevel()
// create all game elements according to input level object

function setupLevel(l){

  levelRange = l.size;
  ground = [];
  baddies = [];
  babies = [];
  currentPhase =0;

  for(let i=0; i<l.platforms.length; i++){
    ground.push( new groundTile(
      l.platforms[i].x,
      canvasH-l.platforms[i].y,
      l.platforms[i].w
    ));
  };

  for(let i=0; i<l.baddies.length; i++){
    let res = getXYOnPlat(l.baddies[i],l.platforms);
    let kit = l.baddies[i].kit;
    switch(kit.t){
      case "jump":
      kit.d=displayJumpingBaddie;
      kit.u=updateJumpingBaddie;
      break;
      case "fly":
      kit.d=displayFlyingBaddie;
      kit.u=updateFlyingBaddie;
      break;
    }
    newBaddie( res.x, res.y, l.baddies[i].r, l.baddies[i].kit );
  }

  // add extra tiles throughout the ground with trees on em
  for(let i=0; i<l.size/150; i++){
      let rand = Math.floor(Math.random()*3);
    ground.push(new groundTile( i*150+(-1+rand)*10, canvasH, 10 ));

    ground[ ground.length-1 ].hasCos = {
      x:0,
      t:rand
    };
  }

  let playerPos = getXYOnPlat(l.player,l.platforms);
  player = new movingObject(playerPos.x, playerPos.y, 75,75,displayDudeBox,updatePlayerMotion,"player");
  player.sleeping = true;
  player.babiesCarried =0;
  startPos = {x:playerPos.x,y:playerPos.y,w:80,h:80};
  babiesReturned = 0;

  for(let i=0; i<l.babies.count; i++){
    l.babies.p  = l.babies.pos[ Math.floor(Math.random()*l.babies.pos.length) ];
    let res = getXYOnPlat(l.babies,l.platforms)
    newBaby( res.x+i*10,res.y )
  }

}
