function packImage(){

  let img = document.getElementById("image");
  ctx.drawImage(img, 0,0);

  var imgData = ctx.getImageData(0,0,img.width,img.height);

  console.log("height "+img.height)
  let pixels = [];

  // classify colors
  let colors = [];
  for(let i=0; i<img.width*img.height; i++){
    console.log("tick")
    let index = i*4;
    let thisColor = {
      r:imgData.data[index],
      g:imgData.data[index+1],
      b:imgData.data[index+2],
      a:imgData.data[index+3]
    }
    let found=false;
    for(let j=0; j<colors.length; j++){
      if(
        colors[j].r===thisColor.r
        && colors[j].g===thisColor.g
        && colors[j].b===thisColor.b
        && colors[j].a===thisColor.a
      ){
        pixels.push(j);
        found=true;
      }

    }

    if(!found){
      colors.push(thisColor);
      pixels.push(colors.length-1);
    }

  }

// console.log(colors);
//  console.log(pixels);

  // bunch together adjacent pixels of same color type
  let bunched = [];

  for(let i=0; i<pixels.length; i++){
    if(bunched.length>0){

      if(bunched[bunched.length-1].type===pixels[i] && bunched[bunched.length-1].add<9) bunched[bunched.length-1].add++;
      else bunched.push({type:pixels[i],add:0});
    }
    else bunched.push({type:pixels[0],add:0})
  }

//  console.log(bunched);


  // convert to string
  let result = bunchedToString(bunched);

  console.log(result);
}


function bunchedToString(input){

  let result = "";
  for(let i=0; i<input.length; i++){
    let add = String.fromCharCode(40+input[i].type*10+input[i].add)
//    console.log(add)
    result = result+ add;
  }
//  console.log(result);
  return result;
}
