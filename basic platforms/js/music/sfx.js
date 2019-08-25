
function sfxOne(){
  // sliding up sound (for a jump or somethin)
//  loadSlidingSound(organWaveAt,7,0.35,1,0.5,1)

  // bird chirp kind of
//  loadSlidingSound(sineWaveAt,100,0.35,1,600,650)

// baby monkey cry
  sfxSeq(5, 2.2+ Math.random()*0.2 ,-0.02, 0.08 ,-0.01, 50,0, organWaveAt,false,0.5)
}

function sfxSeq(num,baseF,fDif,baseT,tDif,timeBetween,tbDif,wave,comb,vol){
  for(let i=0; i<num; i++){
    let freq = baseF+fDif*i;
    let leng = baseT+tDif*i;
    setTimeout( function(){
      loadAndPlay(
        wave,
        comb,
        leng,
        vol,
        freq
      );
    }, i*(timeBetween+i*tbDif))
  }
}









function sfxTwo(){}
function sfxThree(){
}
function sfxFour(){

}
