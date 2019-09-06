

// keypressed() / keyreleased()
// these are triggered in the html <body>
// note that onkeypress events are actual keyCodes
// while onkeyup events use Unicode.

function keyReleased(){
  console.log("key release "+event.keyCode)
  if(event.keyCode===65) inputLeft = false;
  else if(event.keyCode===68) inputRight = false; // 65 A left // 68 D right
}

function keyPressed(){
  console.log("key pressed! code: "+event.keyCode)
  switch(event.keyCode){

    //    case 119: moveY(-1); break;//up W 119
    //    case 115: moveY(1); break;//down S 115
    case 97: moveX(-1); console.log("left"); break;//left A  97
    case 100: moveX(1); break;// right D 100

    case 32: if(!player.sleeping)player.startJump(player); break; // jump SPACE 32

    // 1,2,3,4: 49,50,51,52...
  }
}


function mousePressed(){
console.log(event.clientX)
  if(currentScreen==="start") {
    if( inBox( event.clientX, event.clientY, clickA.x,clickA.y,clickA.w,clickA.h)) startGame();
    startSound();
  }
  else if(currentScreen==="gameover") {
  //  console.log("ey")
  //  console.log(currentLevel)
    Object.assign(currentLevel, level1);
  //    console.log(currentLevel)
    currentText = introTxt;
    level = 0;
    currentScreen="wakeplayer"
    introSeq =0;
  //  frame=0;
    naps =0;
    currentPhase =0;
    player.sleeping = false;
    gameOver = false;
    trace=0;
    setupLevel(currentLevel);

      //startGame();
  }
  else if(currentScreen==="wakeplayer"||currentScreen==="introscreen") {
    console.log("yo")
    if(player.sleeping){

    if(naps===0)  frame =0;
  //    traceSpeed=1;
    }
    if(introSeq<currentText.length) introSeq = currentText.length;
    else {
      player.sleeping = false;
      trace=0;
    }
//  setTimeout(function(){ traceSpeed =0.8 },1000);
//    setTimeout(function(){ traceSpeed =10 },2000)
  }
}
