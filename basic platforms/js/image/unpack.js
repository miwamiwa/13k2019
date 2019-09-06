function unpackImage(input){
  let bunched = [];
  for(let i=0; i<input.length; i++){
    bunched.push({
      type: Math.floor((input.charCodeAt(i)-40)/10),
      add: (input.charCodeAt(i))%10
    });
  }
  let unpacked = [];
  for(let i=0; i<bunched.length; i++){
    unpacked.push( bunched[i].type );
    for(let j=0; j<bunched[i].add; j++){
      unpacked.push( bunched[i].type );
    }
  }
  //console.log(unpacked);
  return unpacked;
}


function unpackImgLoop(input){
  for(let i=0; i<input.length; i++){
    input[i].a = [];
    input[i].a = unpackImage(input[i].s);
  }
}

function unpack3(input){
  for(let i=0; i<input.length; i++){
    unpackImgLoop(input[i]);
    input[i].push(input[i][1]);
  }
}

function unpackAll(){

  pushCol(jumpCol,jumpLoop);
  pushCol(sleepCol,sleepLoop);
  pushCol(stillCol,stillLoop);
  pushCol(babyCol,babyWalkLoop);
  pushCol(babyCol,babyCarriedLoop);
  pushCol(sunCol,sunLoop);

  unpackImgLoop(tigerWalkLoop);
  unpackImgLoop(walkLoop);
  unpackImgLoop(trees);


  unpack3([babyCarriedLoop,jumpLoop,stillLoop,sleepLoop,birdStillLoop,tigerJumpLoop,sunLoop])

  unpackImgLoop(birdFlapLoop);
  birdFlapLoop.push(birdFlapLoop[2]);
  birdFlapLoop.push(birdFlapLoop[1]);

  unpackImgLoop(babyWalkLoop);
  babyWalkLoop.push(babyWalkLoop[2]);
  babyWalkLoop.push(babyWalkLoop[1]);

  groundImg.a = unpackImage(groundImg.s);
  bgImage.a = unpackImage(bgImage.s);
  homeImg.a = unpackImage(homeImg.s);

  for(let i=0; i<letters.length; i++){
    alphabet[i] = {s:letters[i],c:[false,c[1]],w:5};
  }
  unpackImgLoop(alphabet);
}
