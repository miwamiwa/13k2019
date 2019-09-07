
/*
inputs.js
the following function are called in the html body
*/

// check key release to stop player acceleration
function keyReleased(){
  if(event.keyCode===65) inputLeft = false;
  else if(event.keyCode===68) inputRight = false;
}

// move left right and jump keys
function keyPressed(){
  switch(event.keyCode){
    case 97: moveX(-1); break;//left A  97
    case 100: moveX(1); break;// right D 100
    case 32: if(!player.sleeping) player.startJump(player); break; // jump SPACE 32
  }
}

// mouse press events are dependant on the currentScreen value
function mousePressed(){

  if(currentScreen==="start") {
    // if currently on start screen and clicked in box, start game and sound
    if( inBox( event.clientX, event.clientY, clickA.x,clickA.y,clickA.w,clickA.h)){
    startGame();
    startSound();
  }
  }

  else if(currentScreen==="gameover") {
  //  if game over screen, reset game on click
    Object.assign(currentLevel, level1);
    currentText = introTxt;
    level = 0;
    currentScreen="wakeplayer"
    introSeq =0;
    naps =0;
    currentPhase =0;
    player.sleeping = false;
    gameOver = false;
    trace=0;
    setupLevel(currentLevel);
  }

  else if(currentScreen==="wakeplayer"||currentScreen==="introscreen") {
    // if currently on napping screen, start the round
    thankYouText = ""; // reset game over text
    if(player.sleeping){
      // reset time if this is a new level
    if(naps===0)  frame =0;
    }

    // if intro text is still loading, speed that up
    if(introSeq<currentText.length) introSeq = currentText.length;
    else {
      // if intro text is all there, start the round on click.
      player.sleeping = false;
      trace=0;
    }
  }
}
