/*
looper.js:
Here you can setup image files to read in a loop.
This way you can start an atom live server and see the changes in your
animation as you modify the individual image files.
This is a design tool, not to be included in the final game.
*/

let loopImages = [ // indicate files to loop here et voila.
      "assets/images/birdFlap1.png",
      "assets/images/birdFlap2.png",
      "assets/images/birdFlap3.png",
      "assets/images/birdFlap4.png",
      "assets/images/birdFlap3.png",
      "assets/images/birdFlap2.png",
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
