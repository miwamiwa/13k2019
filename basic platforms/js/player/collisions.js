
function checkPlayerCollision(index){
  if(collideRectRect(
    baddies[index].x,
    baddies[index].y,
    baddies[index].w,
    baddies[index].h,
    player.x,player.y,player.w,player.h)
    && !player.knockedBack
  ){
if(baddies[index].x<player.x){
  baddies[index].collided(-1);
  player.collided(1);
}
else{
  baddies[index].collided(1);
  player.collided(-1);
}

      console.log("collision!")
  }
}
