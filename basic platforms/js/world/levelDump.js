let jB = {t:"jump",w:27*3,h:27*1.5}; // "kit" for a jumping Baddie
let fB = {t:"fly",w:20*2,h:20*2}; // "kit" for flying Baddie



let  level1 = {
  size:1300,

  cosmetics: [
    0,2,4,6,8,14,18
  ],

  plat: [ // list each platform here:
    //{ x: position, y: position, w: width }

    // top two
    {x:30,y:75,w:30},  //0
    {x:65,y:67,w:5},

    // left steps
    {x:45,y:60,w:10}, //2
    {x:38,y:58,w:5},
    {x:30,y:52,w:10},
    {x:31,y:46,w:3},

    // right steps
    {x:80,y:60,w:10}, //6
    {x:92,y:58,w:5},
    {x:100,y:52,w:10},
    {x:102,y:46,w:3},

    // middle platform
    {x:32,y:40,w:73}, //10

    // steps leading up
    {x:55,y:35,w:5}, //11
    {x:75,y:35,w:5},
    {x:65,y:28,w:5}, // small step

    {x:40,y:25,w:8}, //14 // left steps
    {x:32,y:18,w:5},
    {x:38,y:12,w:5},
    {x:32,y:6,w:5},

    {x:88,y:25,w:8}, //18 // right steps
    {x:95,y:18,w:5},
    {x:89,y:12,w:5},
    {x:95,y:6,w:5},

    {x:66,y:46,w:3},


  ],
  baddies: [

    {p:10, x:365, r:325, kit:jB },
    {p:10, x:480, r:245, kit:fB },
    {p:16, x:30, r:300, kit:fB },
    {p:-1, x:500, r:450, kit:jB },
    {p:2, x:10, r:40, kit:jB },


    {p:14, x:-5, r:245, kit:fB },
  ],

  player: {p:0,x:30},
  babies:{count:3, pos:[15, -1,21,5],p:0,x:0}
};

//Object.freeze(level1);

let  level2 = {
  size:2500, // boundaries for the level (not actually implemented yet shh)
  cosmetics: [
    2, 5, 10, 8, 12, 13, 14, 17, 18, 20, 21

  ],
  plat: [ // list each platform here:
    //{ x: position, y: position, w: width }

    {x:0,y:5,w:5}, //0 stairs to nest
    {x:0,y:10,w:5},
    {x:0,y:15,w:15}, //2 : nest

    {x:30,y:8,w:10}, //3
    {x:40,y:14,w:10},
    {x:50,y:20,w:25}, //5 first peak

    {x:90,y:8,w:10}, //6
    {x:100,y:14,w:10},
    {x:90,y:21,w:10}, //8
    {x:100,y:28,w:10},
    {x:110,y:35,w:25}, //10 second peak

    // third peak:

    {x:150,y:7,w:10}, //11 lower steps
    {x:160,y:14,w:10},
    {x:170,y:20,w:25}, //13 first platform

    {x:195,y:27,w:25}, //14 second platform

    {x:190,y:35,w:5}, //15 left steps
    {x:185,y:42,w:5}, //16
    {x:180,y:49,w:5}, //17
    {x:170,y:56,w:10}, //18 top left platform

    {x:220,y:35,w:5}, //19 right step
    {x:225,y:42,w:5},
    {x:230,y:49,w:5}, //21
    {x:235,y:49,w:10}, //22 top right platform


  ],
  baddies: [ // list each baddie here:
        // step patrols

    {p:7, x:30, r:100, kit:fB },
  { p: 21, x:-100, r:250, kit:fB},
    {p:4, x:-50, r:100, kit:fB },

    // larger plat baddies
    {p:5, x:80, r:70, kit:jB },
    {p:10, x:80, r:70, kit:jB },
    {p:13, x:80, r:70, kit:jB },
    {p:14, x:80, r:70, kit:jB },

      // ground patrols
    {p:-1, x:500, r:200, kit:jB },
    {p:-1, x:1000, r:200, kit:jB },

    {p:-1, x:2000, r:200, kit:jB },
    {p:-1, x:1700, r:800, kit:fB },
  ],


  player: {p:2,x:10},
  babies:{count:3, pos:[5, 10, 13, 14, 18, 22],p:0,x:0}
};
/*
let  level3 = {
  size:800, // boundaries for the level (not actually implemented yet shh)
  plat: [ // list each platform here:
    //{ x: position, y: position, w: width }

    {x:0,y:0,w:10}, //0: decorative plat at ground level
    {x:20,y:0,w:10},
    {x:-10,y:0,w:10},
    {x:45,y:0,w:10},
    {x:60,y:0,w:10},

    {x:0,y:50,w:20}, //5
    {x:22,y:45,w:8},
    {x:30,y:40,w:8},
    {x:38,y:35,w:8},
    {x:46,y:30,w:8}, //9
    { x: 40, y: 25, w: 10 },
    { x: 35, y: 20, w: 10 },
    { x: 45, y: 20, w: 10 },
    { x: 25, y: 15, w: 5 },
    { x: 30, y: 13, w: 5 }, //14
    { x: 25, y: 10, w: 10 }, //15
    { x: 20, y: 5, w: 5 },


  ],
  baddies: [ // list each baddie here:

    {p:5, x:30, r:40, kit:jB },
    {p:8, x:20, r:40, kit:fB },
    {p:8, x:100, r:45, kit:fB },
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

*/
// EMPTY LEVEL OBJECT:
/*
let levelX = {
  size:0, // boundaries for the level (not actually implemented yet shh)
  plat: [
    //{ x: 0, y: 0, w: 0 }
  ],
  baddies: [
  //  { p: 0, x: 0, r: 0, kit: jB or fB }
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
  plat: [ // list each platform here:
    //{ x: position, y: position, w: width }

    {x:0,y:0,w:100}, //0: decorative plat at ground level
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

    {p:5, x:50, r:45, kit:jB },
  //  {p:8, x:50, r:45, kit:fB },
    {p:8, x:100, r:45, kit:fB },
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
