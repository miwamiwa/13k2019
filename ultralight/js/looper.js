let loopImages = [
      "assets/images/rat01.png",
      "assets/images/rat02.png",
      "assets/images/rat03.png",
      "assets/images/rat02.png"
];


function setupImageLoop(input){
  var myImage = new Image(200, 200);
  myImage.src = input[0];
  myImage.id = "imageElement"
  myImage.className="pixelated"
  document.body.appendChild(myImage);
}

function displayLoop(input){

  let index = Math.floor(frame/6 % input.length);
  document.getElementById("imageElement").src=input[index];
}

function displayStringLoop(input){

  let index = Math.floor(frame/6 % input.length);

  displayImage(
    input[index].a, //input image data
    input[index].c,
    0,0, //input top-left corner x,y position
    20, // input image size (must be square.. could update this to support rectangles if needed)
    10 // input stretch factor. 1 = normal size
  );
}
