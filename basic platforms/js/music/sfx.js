
function sfxOne(){
monkeyCrySFX();

}

function monkeyCrySFX(){
  sfxSeq(5, 2.2+ Math.random()*0.2 ,-0.02, 0.08 ,-0.01, 50,0, organWaveAt,false,0.5)
}

function collideSFX(){
  sfxSeq(3, 100,-30, 0.05, 0.09, 5, 10, roundedSineWaveAt,6,0.1);
}

function thumpSFX(){
  sfxSeq(2, 200,-100, 0.05, 0.09, 5, 10, roundedSineWaveAt,6,0.1);
}

function jumpSFX(t1,t2,l){ //input tone 1 and tone 2
  loadSlidingSound(organWaveAt,7,l,1,t1,t2);
}

function birdChirpSFX(){

  loadSlidingSound(sineWaveAt,100,0.10,0.1,1400+Math.random()*400,2650);
  if(!chirping) setTimeout(
    function(){
      loadSlidingSound(sineWaveAt,100,0.25,0.06,1400+Math.random()*400,2700+Math.random()*800);
    }, 150
  )
  chirping = true;
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
        freq, false
      );
    }, i*(timeBetween+i*tbDif))
  }
}









function sfxTwo(){}
function sfxThree(){
}
function sfxFour(){

}
