function displayText(text,x,y,w,colour,stretch){
  let textToShow = 0;
  for(let i=0; i<text.length; i++){
    //console.log(text.length)
    let thisChar = text.charCodeAt(i);

    if(thisChar>=97&&thisChar<=122) textToShow= thisChar-97 ;
    else if(thisChar===46) textToShow= 27 ;
    else if(thisChar===33) textToShow= 26 ;
    else if(thisChar===32) textToShow= -1 ;
    let xPos = x+i*(stretch+5);
    let yPos = y;//y+Math.floor((i*stretch)/w)*stretch;

    if(textToShow!=-1){
      displayImage(
        alphabet[textToShow].a,
        [false,colour],
        xPos,
        yPos,
        5,
        stretch/5,
        1
      );
    }

  }

}
