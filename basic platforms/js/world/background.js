
let skyShades = [
  {r:133,g:186,b:214,t:0},
  {r:17,g:128,b:214,t:0.6},
  {r:101,g:155,b:184,t:0.7},
  {r:236,g:236,b:29,t:0.8},
  {r:255,g:59,b:59,t:0.9},
  {r:51,g:70,b:95,t:0.96},
  {r:51,g:70,b:95,t:1}
];

let sunShades = [
  {r:255,g:235,b:215,t:0},
  {r:255,g:255,b:15,t:0.5},
  {r:255,g:255,b:15,t:0.7},
  {r:255,g:55,b:55,t:0.8},
  {r:255,g:35,b:185,t:1}
]
//let sunState = 0;

function fadeLight(s){
  let r,g,b;
  let sunState = frame/sunDownFrame;
  for(let i=0; i<s.length; i++){
    if(sunState<s[i].t){
      let fact = (frame-s[i-1].t*sunDownFrame)/((s[i].t-s[i-1].t)*sunDownFrame);
      r = s[i-1].r + fact*(s[i].r-s[i-1].r)
      g = s[i-1].g + fact*(s[i].g-s[i-1].g)
      b = s[i-1].b + fact*(s[i].b-s[i-1].b)
      return {r:r,g:g,b:b}
    }
  }
}

function displayBackground(){

  let sky = fadeLight(skyShades);


  bgImage.c[0] = "rgb("+sky.r+","+sky.g+","+sky.b+")";

  //displayImage(bgImage.a,bgImage.c,-player.x/4,-0.4*canvasH-yShift/2,bgImage.w,2*canvasW/bgImage.w,1);
  drawBG();

  drawSun();
}

function drawSun(){
  let sun = fadeLight(sunShades);
  for(let i=0; i<sunLoop.length; i++){
    sunLoop[i].c[1] = "rgb("+sun.r+","+sun.g+","+sun.b+")";
  }
  let sunDir = 1;
 if(frame/sunDownFrame<0.5) sunDir = -1;

 sunPos.y += sunDir*((canvasH)/(sunDownFrame));
 sunPos.x += (canvasW/2)/(sunDownFrame);

  displayStringLoop(
    sunLoop,
    sunPos.x-player.x/4,
    sunPos.y-yShift/2,
    8,
    8,
    1);
}

function drawBG(){

  displayImage(
    bgImage.a,bgImage.c,
    -player.x/4,
    -0.4*canvasH-yShift/2,
    bgImage.w,
    1.5*canvasW/bgImage.w,
    1
  );

}


// display the ground below all platforms
function displayGround(){

  let xPos = canvasW/2 - (player.x-this.x)
  for(let i=0; i<canvasW/20; i++){
    displayImage( groundImg.a, groundImg.c, i*20-player.x%20,canvasH-yShift-4, 5,4,1 )
  }
}
