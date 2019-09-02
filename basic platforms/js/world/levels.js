let jBaddie = {t:"jump",w:27*3,h:27*1.5}; // "kit" for a jumping Baddie
let fBaddie = {t:"fly",w:20*2,h:20*2}; // "kit" for flying Baddie


// ********** level design does here! ***********

// EXAMPLE LEVEL OBJECT:

let  levelx = {
  size:800,
  platforms: [ // list each platform here:
    //{ x: position, y: position, w: width }

    {x:0,y:0,w:100}, //0: decorative platforms at ground level
    {x:200,y:0,w:100},
    {x:-100,y:0,w:100},
    {x:450,y:0,w:100},
    {x:600,y:0,w:100},

    {x:0,y:500,w:200}, //5
    {x:220,y:450,w:80},
    {x:300,y:400,w:80},
    {x:380,y:350,w:80},
    {x:460,y:300,w:80}, //9
    { x: 400, y: 250, w: 100 },
    { x: 350, y: 200, w: 100 },
    { x: 460, y: 200, w: 100 },
    { x: 250, y: 150, w: 50 },
    { x: 300, y: 110, w: 50 }, //14
    { x: 250, y: 100, w: 100 }, //15
    { x: 200, y: 50, w: 50 },


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
    {p:5, x:50, r:45, kit:jBaddie },
  //  {p:8, x:50, r:45, kit:fBaddie },
    {p:8, x:100, r:45, kit:fBaddie },
  ],
  cosmetics: [
    //{p: platform ,x: distance from left }
    {p:7,x:10},
    {p:9,x:-5},
    {p:0,x:0},
    {p:1,x:0},
    {p:2,x:0},
    {p:3,x:0},
    {p:4,x:0},
  ],
  player: {p:6,x:0},
  babies:{count:3, pos:[11, 12, 13, 14, 15, 16, -1],p:0,x:0}
};

let  level1 = {
  size:1300, // boundaries for the level (not actually implemented yet shh)
  platforms: [ // list each platform here:
    //{ x: position, y: position, w: width }

    {x:0,y:0,w:100}, //0: decorative platforms at ground level
    {x:200,y:0,w:100},
    {x:-100,y:0,w:100},
    {x:450,y:0,w:100},
    {x:600,y:0,w:100},

    // top two
    {x:300,y:750,w:300},  //5
    {x:650,y:670,w:50},

    // left steps
    {x:450,y:600,w:100}, //7
    {x:380,y:580,w:50},
    {x:300,y:520,w:100},
    {x:380,y:460,w:80},

    // right steps
    {x:800,y:600,w:100}, //11
    {x:920,y:580,w:50},
    {x:1000,y:520,w:100},
    {x:920,y:460,w:80},

    // middle platform
    {x:320,y:400,w:730}, //15

    // steps leading up
    {x:550,y:350,w:50}, //16
    {x:750,y:350,w:50},
    {x:650,y:280,w:50}, // small step

    {x:400,y:250,w:80}, //19 // left steps
    {x:320,y:180,w:50},
    {x:380,y:120,w:50},
    {x:320,y:60,w:50},


    {x:880,y:250,w:80}, //23 // right steps
    {x:950,y:180,w:50},
    {x:890,y:120,w:50},
    {x:950,y:60,w:50},


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


    {p:15, x:365, r:325, kit:jBaddie },
    {p:15, x:480, r:245, kit:fBaddie },
    {p:21, x:30, r:300, kit:fBaddie },
    {p:-1, x:500, r:450, kit:jBaddie },
  ],
  cosmetics: [
    //{p: platform ,x: distance from left }
    {p:7,x:10},
    {p:9,x:-5},
    {p:0,x:0},
    {p:1,x:0},
    {p:2,x:0},
    {p:3,x:0},
    {p:4,x:0},
  ],
  player: {p:5,x:30},
  babies:{count:1, pos:[11, 12, 13, 14, 15, 16, -1],p:0,x:0}
};

//Object.freeze(level1);

let  level2 = {
  size:1300, // boundaries for the level (not actually implemented yet shh)
  platforms: [ // list each platform here:
    //{ x: position, y: position, w: width }

    {x:0,y:0,w:100}, //0: decorative platforms at ground level
    {x:200,y:0,w:100},
    {x:-100,y:0,w:100},
    {x:450,y:0,w:100},
    {x:600,y:0,w:100},

    // top two
    {x:300,y:750,w:300},  //5
    {x:650,y:670,w:50},

    // left steps
    {x:450,y:600,w:100}, //7
    {x:380,y:580,w:50},
    {x:300,y:520,w:100},
    {x:380,y:460,w:80},

    // right steps
    {x:800,y:600,w:100}, //11
    {x:920,y:580,w:50},
    {x:1000,y:520,w:100},
    {x:920,y:460,w:80},

    // middle platform
    {x:320,y:400,w:730}, //15

    // steps leading up
    {x:550,y:350,w:50}, //16
    {x:750,y:350,w:50},
    {x:650,y:280,w:50}, // small step

    {x:400,y:250,w:80}, //19 // left steps
    {x:320,y:180,w:50},
    {x:380,y:120,w:50},
    {x:320,y:60,w:50},


    {x:880,y:250,w:80}, //23 // right steps
    {x:950,y:180,w:50},
    {x:890,y:120,w:50},
    {x:950,y:60,w:50},


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


    {p:15, x:365, r:325, kit:jBaddie },
    {p:15, x:480, r:245, kit:fBaddie },
    {p:21, x:30, r:300, kit:fBaddie },
    {p:-1, x:500, r:450, kit:jBaddie },
  ],
  cosmetics: [
    //{p: platform ,x: distance from left }
    {p:7,x:10},
    {p:9,x:-5},
    {p:0,x:0},
    {p:1,x:0},
    {p:2,x:0},
    {p:3,x:0},
    {p:4,x:0},
  ],
  player: {p:5,x:30},
  babies:{count:3, pos:[11, 12, 13, 14, 15, 16, -1],p:0,x:0}
};

let  level3 = {
  size:800, // boundaries for the level (not actually implemented yet shh)
  platforms: [ // list each platform here:
    //{ x: position, y: position, w: width }

    {x:0,y:0,w:100}, //0: decorative platforms at ground level
    {x:200,y:0,w:100},
    {x:-100,y:0,w:100},
    {x:450,y:0,w:100},
    {x:600,y:0,w:100},

    {x:0,y:500,w:200}, //5
    {x:220,y:450,w:80},
    {x:300,y:400,w:80},
    {x:380,y:350,w:80},
    {x:460,y:300,w:80}, //9
    { x: 400, y: 250, w: 100 },
    { x: 350, y: 200, w: 100 },
    { x: 450, y: 200, w: 100 },
    { x: 250, y: 150, w: 50 },
    { x: 300, y: 130, w: 50 }, //14
    { x: 250, y: 100, w: 100 }, //15
    { x: 200, y: 50, w: 50 },


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
    {p:5, x:30, r:40, kit:jBaddie },
    {p:8, x:20, r:40, kit:fBaddie },
    {p:8, x:100, r:45, kit:fBaddie },
  ],
  cosmetics: [
    //{p: platform ,x: distance from left }
    {p:7,x:10},
    {p:9,x:-5},
    {p:0,x:0},
    {p:1,x:0},
    {p:2,x:0},
    {p:3,x:0},
    {p:4,x:0},
  ],
  player: {p:6,x:0},
  babies:{count:2, pos:[11, 12, 13, 14, 15, 16, -1],p:0,x:0}
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
  ground = [];
  baddies = [];
  babies = [];
  currentPhase =0;

//  babiesReturned =0;


  for(let i=0; i<level.platforms.length; i++){
    ground.push(new groundTile(
      level.platforms[i].x,
      canvasH-level.platforms[i].y,
      level.platforms[i].w
    ));
  };

  for(let i=0; i<level.baddies.length; i++){
    let res = getXYOnPlat(level.baddies[i],level.platforms);
    let kit = level.baddies[i].kit;
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
  player.sleeping = true;
  player.babiesCarried =0;
  startPos = {x:playerPos.x,y:playerPos.y,w:80,h:80};
  babiesReturned = 0;

  for(let i=0; i<level.babies.count; i++){
    level.babies.p  = level.babies.pos[ Math.floor(Math.random()*level.babies.pos.length) ];
    let res = getXYOnPlat(level.babies,level.platforms)
    newBaby( res.x,res.y )
  }

}
