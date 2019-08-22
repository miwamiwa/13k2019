var  level1 = {
    size:10000,
    platforms: [
      //{x:0,y:0,w:0}
      {x:100,y:50,w:100},
      {x:150,y:100,w:100},
      {x:250,y:30,w:100},
      {x:220,y:150,w:250},
      {x:490,y:130,w:250}
    ],
    baddies: [
      //{p:0,x:0,r:0,display:displayJumpingBaddie or displayFlyingBaddie}
      {p:0, x:50, r:45, display:displayJumpingBaddie},
      {p:3, x:50, r:45, display:displayFlyingBaddie},
      {p:3, x:100, r:45, display:displayFlyingBaddie},
        ],
    nests: [
      //{p:0,x:0}
      {p:2,x:30},
      {p:4,x:100}
    ],
    player: {p:0,x:0}
  };
