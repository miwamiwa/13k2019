/*
This is where unpacked strings get displayed. 
*/

function displayStringLoop(input,x,y,w){

  let index = Math.floor(frame/6 % input.length);

  displayImage(
    input[index].a, //input image data
    input[index].c,
    x,y, //input top-left corner x,y position
    w, // input image size (must be square.. could update this to support rectangles if needed)
    12 // input stretch factor. 1 = normal size
  );
}



function displayImage(input,c,x,y,w,stretch){
  ctx = canvas.context;

  for(let i=0; i<input.length; i++){
    if(c[input[i]]!=false){
      ctx.beginPath();
      ctx.fillStyle = c[input[i]];
      ctx.fillRect(
        x+(i%w)*stretch,
        y+Math.floor(i/w)*stretch,
        stretch,
        stretch
      );
      ctx.closePath();
    }
  }
}
