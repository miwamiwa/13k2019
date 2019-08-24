/*

this code is designed to convert .png images to String in order to save some disk space.
before you can display the images, the strings need to be "unpacked" into array form first,
using unpackImage() or unpackImgLoop().

images can be packed into strings using the packImage() function. then you can copy-paste
the resulting code into the script, and remove the original .png files from
the game folder. My code for converting batches of images is still wonky, so right
now images have to be converted individually.

Color values also have to be re-entered (in hex format) for the images to display!
this code allows for about 7 colors per image (but they don't have to be the same
for every image). it doesn't matter what colors go into your original .png file
(even the transparent color can be anything)

********* reasons for doing this:
- .png files don't get compressed when placed in a .zip file. sometimes they even gain weight xD
- what matters for this competition is the size of the final .zip file.
- individual image files' sizes get reduced about 50% when converted, then another
20%-60% when zipped. the compression ratio gets better the more images you have.
- You can expect roughly 75% compression with this process, much better than 0% without.

********* what's the maximum amount of space we can allocate to images?
- tldr: i think roughly 6-8kb (zipped)
- right now the basic game mechanics + music total ~3.5kb zipped. At the end I
expect a maximum of 5kb zipped for everything except images
but - who knows - it could be more. To me, allocating 6kb for images is a
very safe worst case scenario.

********* how many images is that?

- depends on their size. some examples:

- 10 converted images of size 10x10 totals about 500kb zipped.
so 6kb ~= 120 images sized 10x10.
- 7 converted images of size 25x25 totals about 800kb zipped.
so 6kb ~= 50 images sized 25x25
- 3 converted images of size 20x20 totals about 400kb zipped. note that sub-par
compression which i think is because of the small amount of images.

- all of the above + an array with a few colors = 1.56kb zipped. note how this is lower than
the individual .zip files combined. so tbh my estimates for how many images we can fit
in 6kb are probably low. and mind you 6kb is also a low estimate.

- right now i have 4 characters. they all stand still, and walk and get knocked back.
    3 of them jump and fall, while 1 of them flies.
- i think we're looking at an average of 10 animation frames per character?
- think: walking (maybe 3-5 frames), standing still (2-3 frames?), knock-back (1-3)
    jumping/flying/falling (2-6 frames???), other??

- considering all zis tings, i would say we can use anything up to 30x30 px
  to design characters. they don't all have to be the same size:
    small characters (baby) will require less space and frames to animate,
    main character could be larger than others for a better design, etc.


note to self: think about defining the character set to avoid
faulty conversions
*/



var frameRate=30;
var frame=0;

let canvasH = 400;
let canvasW = 600;

var canvas = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = canvasW;
    this.canvas.height = canvasH;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 1000/frameRate);
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}





// game setup
function startGame() {

  canvas.start();
  ctx = canvas.context;

  // use this method to display a loop of .png files (see looper.js)
  setupImageLoop(loopImages);

  packImage(); // use this to convert an image file to string.
  // set image file to convert in index.html
  // (not to be included in final build)

  // use this method to unpack individual image data before game starts :
  unpackedSmiley = unpackImage(smiley);

  // use this method to unpack an array of images:
  unpackImgLoop(walkLoop);
  unpackImgLoop(ratLoop);

  // complete the rat loop by copying the second frame and placing it at the end
  ratLoop.push(ratLoop[1])
}





// game loop
function updateGameArea() {

  canvas.clear();

  displayStringLoop(walkLoop,0,0,25);
  displayStringLoop(ratLoop,300,0,20);

  displayLoop(loopImages);
  frame++;
}
