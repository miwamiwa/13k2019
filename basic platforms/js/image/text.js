function displayText(text,x,y,w,colour,stretch,wub){
  let txt = 0;
  for(let i=0; i<text.length; i++){
    
    let ch = text.charCodeAt(i);

    if(ch>=97&&ch<=122) txt= ch-97 ;
    else if(ch>=48&&ch<=57) txt= ch-48 + 29 ;
    else if(ch===46) txt= 27 ;
    else if(ch===44) txt= 28 ;
    else if(ch===33) txt= 26 ;
    else if(ch===32) txt= -1 ;

    let xPos = x+i*(stretch+5);
    let yPos = y;
    if(wub) yPos = y + Math.sin(i/text.length+frame/30)*10;//y+Math.floor((i*stretch)/w)*stretch;

    if(txt!=-1) displayImage( alphabet[txt].a, [false,colour], xPos, yPos, 5, stretch/5, 1 );

  }
}
