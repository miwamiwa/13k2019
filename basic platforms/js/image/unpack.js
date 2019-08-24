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
