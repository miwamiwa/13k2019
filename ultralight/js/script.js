/*

this code is designed to convert tiny image files with up to 8 colors to even
tinier string representations, and then display them.

see function startGame() for how to convert an image file to string.
see function updateGameArea() for how to display a converted image.

Tools.js and all .png files are to be removed from the final build.

all images used to test the zip files were 15x15 pixels.

total file size for script.js + unpack.js + colorsarray.js with one image
was 1.26 kb minified and 792 bytes zipped, without shortening variable names.
this particular image file was 344 bytes.

with 10 different images of the same size, the code minifies to 2.08kb and zips to 1.19kb.
note that i was using only 4 colors all together.

However, if i decide to zip a minified script.js without any of the file
converting content (and without any code to display images for that matter),
together with the actual .png files, i get a 4.38 kb zip file... or 3.36 kb unzipped!

even if all the images are stuck together in one .png file, and still no code
to read that file is included in script.js, the .zip package comes out to 2.0 kb.
i'm not sure if .png gets compressed at all when zipped.

so! this stuff stands out to me as being pretty useful.
ps: horizontal lines of the same color in the images make the code especially light

*/

let c = [
  "#000000","#ffd738","#d1ff3a",
  "#327fa8", // dark blue
  "#6d92a6", // pale blue
  "#c37dc9" // violet
];

var frameRate=30;
var frame=0;

let canvasH = 200;
let canvasW = 200;

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

// declare image-strings first, and declare an empty array to hold the uncompressed array
let smiley = ")7+4(3@2)3=3B4>2F<2=2=3F<2<2HA2H<2F2G@2F2G2G2G2F<3G2F3G3G5G2(2K2)2H)2H3+2G)7+4(3@2)3=3B4>2F<2=2=3F<2<2HA2H<";
let imgz = [
  // moar images, for file size test.
  "(6)7<(4<4*4*<4(5)<(;3*4+5<2)2(2)<(2)4)2(2)<(2)5(2-2)5(4+8)2(2+3(4)4(3,3(21(3(6(2(2+2(3)<+6)3,5)<",
  "1(2)2+3(3/2)2(>(2(2*D2(2*2(B2(2*2)2(=(=(2-2+=(2+2(2(<)=(2)B(2=(2)<)2+2=(2)=(2(2(?,E-3(B-211+2",
  "(8*4<(2+7*2)4,4(2(3)5)3(2(3(;4)2+6)2(3(3)3(2)2(3)3(2)2)2)6(2)2(4)5(2)3)3-7(;3(2)7)3)3/4*;2)",
  "(3E=(A6*2<(4>)4(=3)3=)3(<(3(5=5=2)2+<2>(=(3(3(>(<)2>)3(=(<(>(6>(<(<3>4<2>2=3(@7=4A3(2(@3)=)3.?(E<3)",
  "(;?(AI2*2<(H2=)3F(8F=)3(<(9<G2F<3)F*3F<2<(3(G9<)3=6<;5=4<;2<3<9<F;2@3(F(8)<3(G-7@;",
  "(6)7<(4<4*4*<4(5)<(;3*4+5<2)2(2)<(2)4)2(2)<(2)5(2-2)5(4+8)2(2+3(4)4(3,3(21(3(6(2(2+2(3)<+6)3,5)<",
  ")2)2(<+<*<(2<2(=)=*?2(@,=*<(2=,<(<(<)2<(=(=(2(=(5(?(3<(=(2)<(<(>*=3=+=)<2(>)<(@(2)=*=)>)<)<)>(<(?3(<*>)>3=6?)2=,3(<+<)",
  ")2)2(<+<*<(2<2(=6)?2(9)=*3>4)<(<(<3<2<5<(2(=3>5<(3<(3>5(=6>7<6>7<2<4>7(2<;3<(2A8C9=;;4",
  "1-;5+;2*;3*8(2+;2+;2+;21)41)411+7/80211*" //this particular image has many long horizontal lines
];
let unpackedSmiley = [];

let ratLoop = [
  {
    s:"1111*3,=1(3=(@1>3A/?3B.2<2E<,EA+@)2@2>)G=*3@3=)G+3A3>-4A3>F,2)A2?F,2)A3>F0A2>)F-2D*G+F4@3+G)H3@3,I)3+3.G(5)5*",
    c:[false,c[4],c[3],c[5]]
  },
  {
    s:"111111*3,?03=2B/>3C-?2E,2<2E=+E>2>*@)2@3=)G=*3@3>(G+3@3?F-2(@2@F,2)@2@H.@2?)G+F2D+G*F4@3,J(3@3-H)3)2(315*4*",
    c:[false,c[4],c[3],c[5]]
  },
  {
    s:"111111*2103<2=(A.>3D,EA+EA+2<2D2?*@(2@3>)?)3@3>(G=)2(@3?H*3(?3@F,2)?2AF(G,FE)F,F2D*G*G4@3+G(G)3@3,H(2(3+31(4)5*",
    c:[false,c[4],c[3],c[5]]
  }
]



// game setup
function startGame() {

  canvas.start();
  refreshContext();
  setupImageLoop(loopImages);


  unpackImgLoop(ratLoop);
  ratLoop.push(ratLoop[1])

     packImage(); // use this to convert an image file to string.
    // set image file to convert in index.html
    // (not to be included in final build)

// use this method to unpack image data before game starts :
  unpackedSmiley = unpackImage(smiley);
}

function unpackImgLoop(input){
  for(let i=0; i<input.length; i++){
    input[i].a = [];
    input[i].a = unpackImage(input[i].s);
  }
}



// game loop
function updateGameArea() {

  canvas.clear();
/*
    // display an unpacked image:
  displayImage(
    unpackedSmiley, //input image data. should be unpacked first during setup
    [false,c[0],c[1],c[2]], // input up to 8 colors. transparent = false.
                            // colors are stored inside colorsarray.js so they may be repeated at low size cost.
                            // must be written in the order in which they appear in the file.. opa!
    0,0, //input top-left corner x,y position
    15, // input image size (must be square.. could update this to support rectangles if needed)
    6 // input stretch factor. 1 = normal size
  );
*/
  displayStringLoop(ratLoop);

  displayLoop(loopImages);
  frame++;
}

function refreshContext(){
  ctx = canvas.context;
}
