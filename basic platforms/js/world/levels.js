
function continueLevel(){

  if(babiesReturned>=babies.length) nextPhase();

  if(timeLeft<=0) gameIsOver();

}

function gameIsOver(){
  gameOver = true;
  currentScreen = "gameover";
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
      case 2:
      thankYouText = "congrats! you've reached the end. thank you for playing.\n";
      gameIsOver();
      // game is over. return to menu screen; thank you for playing.
      break;
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
      if(currentPhase>=1){
        phase.baddies.push({p:20, x:30, r:300, kit:fB });
          phase.baddies.push({p:6, x:10, r:40, kit:jB });
            phase.baddies.push({p:-1, x:550, r:345, kit:jB });
        if(currentPhase===2){

            phase.baddies.push({p:1, x:0, r:245, kit:fB });
          phase.baddies.push({p:10, x:250, r:245, kit:fB });
            phase.baddies.push({p:10, x:250, r:245, kit:jB });
        };
      }
      break;

      case 1:
      if(currentPhase>=1){
        //  {p:-1, x:1500, r:200, kit:jB },
        phase.baddies.push({p:-1, x:1500, r:200, kit:jB });
        phase.baddies.push( {p:3, x:30, r:100, kit:fB });
        phase.baddies.push({p:11, x:30, r:100, kit:fB })


        phase.baddies.push({p:16,x:0,r:250,kit:fB});
        phase.baddies.push({p:6, x:30, r:100, kit:fB })

        if(currentPhase===2){

          phase.baddies.push({ p: -1, x:1050, r:500, kit:fB});
          phase.baddies.push({ p: -1, x: 1650, r:500, kit: fB});
          phase.baddies.push({ p: 12, x: 0, r:100, kit: fB});

          phase.baddies.push({ p: 10, x: 0, r:300, kit: fB});


        }
      }
      break;
    }

    setupLevel(phase);
  }
}
