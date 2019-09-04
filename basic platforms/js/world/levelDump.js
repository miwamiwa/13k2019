let jBaddie = {t:"jump",w:27*3,h:27*1.5}; // "kit" for a jumping Baddie
let fBaddie = {t:"fly",w:20*2,h:20*2}; // "kit" for flying Baddie



let  level1 = {
  size:1300, // boundaries for the level (not actually implemented yet shh)
  platforms: [ // list each platform here:
    //{ x: position, y: position, w: width }

    // top two
    {x:300,y:750,w:300},  //0
    {x:650,y:670,w:50},

    // left steps
    {x:450,y:600,w:100}, //2
    {x:380,y:580,w:50},
    {x:300,y:520,w:100},
    {x:380,y:460,w:80},

    // right steps
    {x:800,y:600,w:100}, //6
    {x:920,y:580,w:50},
    {x:1000,y:520,w:100},
    {x:920,y:460,w:80},

    // middle platform
    {x:320,y:400,w:730}, //10

    // steps leading up
    {x:550,y:350,w:50}, //11
    {x:750,y:350,w:50},
    {x:650,y:280,w:50}, // small step

    {x:400,y:250,w:80}, //13 // left steps
    {x:320,y:180,w:50},
    {x:380,y:120,w:50},
    {x:320,y:60,w:50},

    {x:880,y:250,w:80}, //18 // right steps
    {x:950,y:180,w:50},
    {x:890,y:120,w:50},
    {x:950,y:60,w:50},


  ],
  baddies: [

    {p:10, x:365, r:325, kit:jBaddie },
    {p:10, x:480, r:245, kit:fBaddie },
    {p:16, x:30, r:300, kit:fBaddie },
    {p:-1, x:500, r:450, kit:jBaddie },
    {p:2, x:10, r:40, kit:jBaddie },
    {p:6, x:10, r:40, kit:jBaddie },
  ],
  cosmetics: [

  ],
  player: {p:0,x:30},
  babies:{count:3, pos:[15, -1],p:0,x:0}
};

//Object.freeze(level1);

let  level2 = {
  size:2500, // boundaries for the level (not actually implemented yet shh)
  platforms: [ // list each platform here:
    //{ x: position, y: position, w: width }

    {x:0,y:50,w:50}, //0 stairs to nest
    {x:0,y:100,w:50},
    {x:0,y:150,w:150}, //2 : nest

    {x:300,y:80,w:100}, //3
    {x:400,y:140,w:100},
    {x:500,y:200,w:250}, //5 first peak

    {x:900,y:80,w:100}, //6
    {x:1000,y:140,w:100},
    {x:900,y:210,w:100}, //8
    {x:1000,y:280,w:100},
    {x:1100,y:350,w:250}, //10 second peak

    // third peak:

    {x:1500,y:70,w:100}, //11 lower steps
    {x:1600,y:140,w:100},
    {x:1700,y:200,w:250}, //13 first platform

    {x:1950,y:270,w:250}, //14 second platform

    {x:1900,y:350,w:50}, //15 left steps
    {x:1850,y:420,w:50}, //16
    {x:1800,y:490,w:50}, //17
    {x:1700,y:560,w:100}, //18 top left platform

    {x:2200,y:350,w:50}, //19 right step
    {x:2250,y:420,w:50},
    {x:2300,y:490,w:50}, //21
    {x:2350,y:490,w:100}, //22 top right platform


  ],
  baddies: [ // list each baddie here:
        // step patrols
    {p:3, x:30, r:100, kit:fBaddie },
    {p:7, x:30, r:100, kit:fBaddie },
    {p:11, x:30, r:100, kit:fBaddie },

    // larger plat baddies
    {p:5, x:80, r:70, kit:jBaddie },
    {p:10, x:80, r:70, kit:jBaddie },
    {p:13, x:80, r:70, kit:jBaddie },
    {p:14, x:80, r:70, kit:jBaddie },

      // ground patrols
    {p:-1, x:500, r:200, kit:jBaddie },
    {p:-1, x:1000, r:200, kit:jBaddie },
    {p:-1, x:1500, r:200, kit:jBaddie },
    {p:-1, x:2000, r:200, kit:jBaddie },
    {p:-1, x:1000, r:800, kit:fBaddie },
  ],

  cosmetics: [
    //{p: platform ,x: distance from left }


  ],
  player: {p:2,x:10},
  babies:{count:3, pos:[5, 10, 13, 14, 18, 22],p:0,x:0}
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
/*
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
*/
// ********** level design does here! ***********

// EXAMPLE LEVEL OBJECT:
/*
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
*/
