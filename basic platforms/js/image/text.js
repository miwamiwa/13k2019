function displayText(text,x,y,w,colour,stretch,wub){
  let txt = 0;
  for(let i=0; i<text.length; i++){

    let ch = text.charCodeAt(i);

    if(ch>=97&&ch<=122) txt= ch-97 ;
    else if(ch>=48&&ch<=57) txt= ch-48 + 30 ;
    else if(ch===46) txt= 27 ;
    else if(ch===44) txt= 28 ;
    else if(ch===33) txt= 26 ;
    else if(ch===32) txt= -1 ;
    else if(ch===47) txt= 29 ;

    let xPos = x+i*(stretch+5);
    let yPos = y;
    if(wub) yPos = y + Math.sin(i/text.length+frame/30)*10;

    if(txt!=-1) displayImage( alphabet[txt].a, [false,colour], xPos, yPos, 5, stretch/5, 1 );

  }
}

let introTxt = [
  "they call you mama ape.",
  "your three kiddos that is.",
  "mama ape likes her naps. ",
  "three times a day.",
  "nothing less. ",
  " ",

  "everytime you wake,",
  "you find your three rascals are gone",
  "you cannot sleep again",
  "until they are back home.",
  " ",
  "those baby apes",
  "are helpless on their own",
  "so you will have to haul them ",
  "on your back,",
  "knocking back the junglefolk",
  "that block your way.",
  " ",
  "in short",
  "by sundown, everyone must be back home",
  "and you must have thrice napped",
  " ",
  "click to wake up!"
];
