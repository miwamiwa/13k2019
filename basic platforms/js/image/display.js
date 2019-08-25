/*
This is where unpacked strings get displayed.
*/

function displayStringLoop(input,x,y,w,stretch,dir){

  let index = Math.floor(frame/6 % input.length);

  displayImage(
    input[index].a, //input image data
    input[index].c,
    x,y, //input top-left corner x,y position
    w, // input image size (must be square.. could update this to support rectangles if needed)
    stretch, // input stretch factor. 1 = normal size
    dir
  );
}



function displayImage(input,c,x,y,w,stretch,dir){
  ctx = canvas.context;

  for(let i=0; i<input.length; i++){
    if(c[input[i]]!=false){
      ctx.beginPath();
      ctx.fillStyle = c[input[i]];
      let fact = 0
      if(dir===-1) fact=w*stretch;

        ctx.fillRect(
          x+ fact  +dir*(i%w)*stretch,
          y+Math.floor(i/w)*stretch,
          dir*(stretch+0.5),
          stretch+0.5
        );

      ctx.closePath();
    }
  }
}
