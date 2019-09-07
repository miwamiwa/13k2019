class groundTile{
  constructor(x,y,w){
    this.x = x;
    this.y = y;
    this.w = w;
    this.hasCos = false;
  }

  display(){

      // display ground tile
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

function displayTree(tree,x,y,stretch){
  displayImage( tree.a, tree.c, x,y, tree.w,stretch,1 )
}
