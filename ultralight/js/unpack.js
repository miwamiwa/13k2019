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

// requires an unpacked image and an array of 4 color values
function displayImage(input,c,x,y,w,stretch){
  refreshContext();

  for(let i=0; i<input.length; i++){
    if(c[input[i]]!=false){
      ctx.beginPath();
      ctx.fillStyle = c[input[i]];
      ctx.fillRect(
        (i%w)*stretch,
        Math.floor(i/w)*stretch,
        stretch,
        stretch
      );
      ctx.closePath();
    }
  }
}
