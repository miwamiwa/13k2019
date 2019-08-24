let jBaddie = {d:displayJumpingBaddie,u:updateJumpingBaddie}; // "kit" for a jumping Baddie
let fBaddie = {d:displayFlyingBaddie,u:updateFlyingBaddie}; // "kit" for flying Baddie


// ********** level design does here! ***********

// EXAMPLE LEVEL OBJECT:

let  level1 = {
  size:10000, // boundaries for the level (not actually implemented yet shh)
  platforms: [ // list each platform here:
    //{ x: position, y: position, w: width }
    {x:100,y:50,w:100},
    {x:150,y:100,w:100},
    {x:250,y:30,w:100},
    {x:220,y:150,w:250},
    {x:490,y:130,w:250}
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
  nests: [
    //{p: platform ,x: distance from left }
    {p:2,x:30},
    {p:4,x:100}
  ],
  player: {p:0,x:0}
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
  nests: [
    //{p: 0,x: 0 }
  ],
  player: {p:0,x:0}
}


// setuplevel()
// create all game elements according to input level object

function setupLevel(level){

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

  for(let i=0; i<level.nests.length; i++){
    ground[level.nests[i].p].hasNest = level.nests[i].x;
  }

  let playerPos = getXYOnPlat(level.player,level.platforms);
  player = new movingObject(playerPos.x, playerPos.y, displayDudeBox,updatePlayerMotion,"player");

}
