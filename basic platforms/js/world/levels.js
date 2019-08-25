let jBaddie = {d:displayJumpingBaddie,u:updateJumpingBaddie,w:27*3,h:27*1.5}; // "kit" for a jumping Baddie
let fBaddie = {d:displayFlyingBaddie,u:updateFlyingBaddie,w:20*2,h:20*2}; // "kit" for flying Baddie


// ********** level design does here! ***********

// EXAMPLE LEVEL OBJECT:

let  level1 = {
  size:10000, // boundaries for the level (not actually implemented yet shh)
  platforms: [ // list each platform here:
    //{ x: position, y: position, w: width }
    {x:0,y:500,w:200}, //0
    {x:220,y:450,w:80},
    {x:300,y:400,w:80},
    {x:380,y:350,w:80},
    {x:460,y:300,w:80}, //4
    { x: 400, y: 250, w: 100 },
    { x: 350, y: 200, w: 100 },
    { x: 450, y: 200, w: 100 },
    { x: 250, y: 150, w: 50 },
    { x: 300, y: 130, w: 50 }, //9
    { x: 250, y: 100, w: 100 }, //10
    { x: 200, y: 50, w: 50 }
  ],
  baddies: [ // list each baddie here:
    /*
    {
    p: platform to place baddie on (-1 = ground)
    x: distance from platform's left point ,
    r: boundary ("radius" around x,y),
    kit: {d:display,u:update} (use jBaddie or fBaddie)
  }
    */
    {p:0, x:50, r:45, kit:jBaddie },
    {p:3, x:50, r:45, kit:fBaddie },
    {p:3, x:100, r:45, kit:fBaddie },
  ],
  cosmetics: [
    //{p: platform ,x: distance from left }
    {p:2,x:30},
    {p:4,x:-5}
  ],
  player: {p:0,x:0},
  babies:{count:2, pos:[6, 7, 8, 9, 10, 11, -1],p:0,x:0}
};


// EMPTY LEVEL OBJECT:

let levelX = {
  size:0, // boundaries for the level (not actually implemented yet shh)
  platforms: [
    //{ x: 0, y: 0, w: 0 }
  ],
  baddies: [
  //  { p: 0, x: 0, r: 0, kit: jBaddie or fBaddie }
  ],
  cosmetics: [
    //{p: 0,x: 0,t:0 }
  ],
  player: {p:2,x:0},
  babies:{count:2, pos:[6, 7, 8, 9, 10, 11, -1],p:0,x:0}
}


// setuplevel()
// create all game elements according to input level object

function setupLevel(level){

  levelRange = level.size;

  for(let i=0; i<level.platforms.length; i++){
    ground.push(new groundTile(
      level.platforms[i].x,
      canvasH-level.platforms[i].y,
      level.platforms[i].w
    ));
  };

  for(let i=0; i<level.baddies.length; i++){
    let res = getXYOnPlat(level.baddies[i],level.platforms);
    newBaddie( res.x, res.y, level.baddies[i].r, level.baddies[i].kit );
  }

  for(let i=0; i<level.cosmetics.length; i++){
    let rand = Math.floor(Math.random()*3);
    ground[
      level.cosmetics[i].p
    ].hasCos = {
      x:level.cosmetics[i].x,
      t:rand
    };
  }

  let playerPos = getXYOnPlat(level.player,level.platforms);
  player = new movingObject(playerPos.x, playerPos.y, 75,75,displayDudeBox,updatePlayerMotion,"player");

  for(let i=0; i<level.babies.count; i++){
    level.babies.p  = level.babies.pos[ Math.floor(Math.random()*level.babies.pos.length) ];
    let res = getXYOnPlat(level.babies,level.platforms)
    newBaby( res.x,res.y )
  }

}
