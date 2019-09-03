
function continueLevel(){

  if(babiesReturned>=babies.length) nextPhase();

  if(timeLeft<=0){
    gameOver = true;
    currentScreen = "gameover";
  }
}


function nextPhase(){

  napping = true;
  babiesReturned = true;
  player.sleeping = true;
  trace =0;

  naps++;

  if(naps===3){

    currentText = [
      "the day is over. level complete!",
      "click to continue"
    ];

    setTimeout(function(){currentScreen = "wakeplayer";},1000)
    shootTextSequence();

    introSeq =0;

  //  console.log("new level!");
    level++
    switch(level){
      case 1:   currentLevel  = level2; break;
      case 2:   currentLevel  = level3; break;
    }

    naps =0;
    setupLevel(currentLevel);
  }
  else {

    currentText = [
      "good job mama ape!",
      "time for a nap."
    ];

    currentScreen = "wakeplayer";
    shootTextSequence();

    introSeq =0;
    traceSpeed = 10;
    currentPhase++;

    setTimeout( function(){
      player.sleeping = false;
      traceSpeed = 0.1;
    }, 5000 );

    phase  = JSON.parse(JSON.stringify(currentLevel));

    switch(level){

      case 0:
      if(currentPhase===1) phase.baddies.push({p:25, x:30, r:300, kit:fBaddie });
      else if(currentPhase===2){

        phase.baddies.push({p:25, x:30, r:300, kit:fBaddie });
        phase.baddies.push({p:15, x:250, r:245, kit:fBaddie });
      }; break;
    }

    setupLevel(phase);
  }
}
