

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
    case 97: moveX(-1); break;//left A  97
    case 100: moveX(1); break;// right D 100

    case 32: player.startJump(player); break; // jump SPACE 32
    // 1,2,3,4: 49,50,51,52...
  }
}