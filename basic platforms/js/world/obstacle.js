class groundTile{
  constructor(x,y,w){
    this.x = x;
    this.y = y;
    this.w = w;
    this.hasCos = false;
  }

  display(){


    // if ground tile is on screen (kinda)
    if(
      inRange(this.x,player.x,canvasW/2)
      || inRange(this.x+this.w,player.x,canvasW/2)
    ){

      let xPos = canvasW/2 - (player.x-this.x)
      for(let i=0; i<this.w/20; i++){
        displayImage( groundImg.a, groundImg.c, xPos+i*20,this.y-yShift-4, 5,4,1 )
      }


      if(this.hasCos!=false){ // display nest if there is a nest
      let tree = trees[this.hasCos.t];
        let stretch = 3;
        displayTree(tree, xPos+this.hasCos.x, this.y-yShift-tree.w*stretch,stretch)
      }
    }
  }
}

function displayTree(tree,x,y,stretch){
//let stretch = 3;
  displayImage( tree.a, tree.c, x,y, tree.w,stretch,1 )

}
