let organ= [
  {f:499.98 ,a:0.05024,p:-79.26},
  {f:989.78, a:0.01608,p:10.89},
  {f:1489.66,a:0.02179,p:-13.22},
  {f:1989.55,a:0.03411,p:-30.97},
  {f:2489.44,a:0.01904,p:156.26},
  {f:2989.32,a:0.03099,p:-54.57},
  {f:3469.21,a:0.00796,p:-49.46},
  {f:3979.10,a:0.01728,p:-129.91},
];


let lengthOf8 = 8;
let time =0;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
let buffers = [];

var voices = [
  {
    notes: "UPNPQPNPIIUPNPQPNPNLNLNPNLNLKLKLNLNPNLPNLKLNLKLILKNLKIPLKIPLKINLKINKIGNKIGNKIGLKIGLIGFLIGFLIGFKIGFKGFGIGFGFDFGIKFGIFGIGFIGDGKGKPKPSPSUSRPRPOWRPOWSRPWSRPWOMKWNLKNPRKOP",
    durations:"**))*))*****))*))*))*))*))*))*))*))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))*))*))))))))))))))))))))))))))))))))))))))))))))))))))))))****.",
    nextTrigger:0,
    noteCounter:0,
  },
  {
    notes: "=?@=@=B=B=@=B=@=?=@=@=B=B=@=@=?=?=<?:?<?8?=8=8?8?8@8=8?8<8=848148;:=6:/36:8;48.1487:378383737383,383837373838;8;?DC?C?D?8;=;=:;=?3DEDB@?",
    durations:"))))))))))))))))))))))))))))))))))))))))))))))))))))))))))****************************))))))))****))))))))************************))))))",
    nextTrigger:0,
    noteCounter:0
  }
]

function  runBGM(){

  playVoice(1,organWaveAt,0.25,10,0.19,0.5)
  playVoice(0,organWaveAt,0.25,40+frame%3000,0.45,0.3);
  playDrum();
  time++;
}

function playDrum(){

  let stim = Math.random();
  let drum;

  if(checkTime(2)) drum=chanceToPlay( stim ,1, 7,2,1 );
  else if(checkTime(1)) drum=chanceToPlay( stim ,0.4, 3,2,1 );
  else if(checkTime(0.5)) drum=chanceToPlay( stim ,0.4,0,2,8 );
  //  else if(checkTime(0.5)) drum=chanceToPlay( stim ,0.1, 0,0,7 );

  if(drum!=undefined){
    let tone =  drum.base+Math.random()*drum.vari;
    let comb =5
    loadAndPlay(noiseAt,comb,0.45,drum.vol,tone,true);
  }
}

function checkTime(fact){
  return time%(lengthOf8*fact)==0
}


// different drum hit sounds are setup here
function chanceToPlay(stim,chance,t1,t2,t3){
  if(stim<chance){
    let total = t1+t2+t3;
    if(stim<t1/total) return {base:20,vari:5,vol:0.04};
    else if(stim<(t1+t2)/total) return {base:4000,vari:1000,vol:0.04};
    else return {base:10000,vari:1000,vol:0.01};
  }
}


function playVoice(input,waveGen,fact,comb,length,vol){

  let voice = voices[input];
  if(time===voice.nextTrigger) {

    let index=voice.noteCounter;
    let noteLength = voice.durations.charCodeAt( index )-40;
    let seconds = noteLength*length,
    tone = Math.pow(2, ( voice.notes.charCodeAt( index )-64)/12)*fact

    loadAndPlay(waveGen,comb,seconds,vol,tone,false);

    // set next time at which to trigger next note
    voices[input].nextTrigger = time+noteLength*lengthOf8;

    // continue and reset loop
    voices[input].noteCounter++;
    if(voice.noteCounter>=voice.notes.length) voices[input].noteCounter=0;
  }
}

function loadAndPlay(waveGen,comb,seconds,volume,tone,isDrum){
  let combDist;
  let arr = [];
  if(comb!=false) combDist = comb;
  let vol = 0;
  let length = context.sampleRate * seconds;

  for (var i = 0; i < length; i++) {
    let pos = i/length;
    if(pos>0.7) vol = constrain(vol-0.0003,0,volume);
    else if(pos<0.1) vol = constrain(vol+0.005,0,volume);
    arr[i] = waveGen(i, tone) * vol
    if(i>=combDist &&i +10<length&&comb!=false&&isDrum) {
    for(let j=0; j<4; j++){
      arr[i-combDist + j*2] -= arr[ Math.round(i-combDist + j*2+1)];
    }
    }
    else if(i>=combDist &&i +10<length&&comb!=false)arr[i-combDist] += arr[i];

  }

  playSound(arr)
}

function loadSlidingSound(waveGen,comb,seconds,volume,tone,tone2){
  let combDist;
  let arr = [];
  let length = context.sampleRate * seconds;
  let vol = 0;
  let returnVel = 0.01*seconds;
  if(comb!=false) combDist = comb;

  for (var i = 0; i < length; i++) {
    let pos = i/length;
    let freq = tone+ pos*(tone2-tone);
    if(pos>0.7) vol = constrain(vol-returnVel,0,1);
    else if(pos<0.1) vol = constrain(vol+returnVel,0,volume);
    arr[i] = waveGen(i, freq) * vol
    if(i>=combDist&&comb!=false) arr[i-combDist] += arr[i];

  }

  playSound(arr)
}


function playSound(arr) {
  var buf = new Float32Array(arr.length)
  for (var i = 0; i < arr.length; i++) buf[i] = arr[i]
  var buffer = context.createBuffer(1, buf.length, context.sampleRate)
  buffer.copyToChannel(buf, 0)
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
}

function sineWaveAt(sampleNumber, tone) {
  let sampleFreq = context.sampleRate / tone
  return Math.sin(sampleNumber / (sampleFreq / (Math.PI*2)));
}


function noiseAt(sampleNumber, tone) {
  let sampleFreq = context.sampleRate / tone;
  let amp = constrain(Math.pow(sampleNumber,2)/15000000,0.1,0.9);
  let noiseAmp = 4;
  let wavAmp = constrain(6-tone/4000,0,20000);
  if(sampleNumber%2===0) return 0;
  else return (-noiseAmp/2 + Math.random()*noiseAmp + wavAmp*roundedSineWaveAt(sampleNumber,tone))*(1-amp);
}

function roundedSineWaveAt(sampleNumber, tone) {
  let sampleFreq = context.sampleRate / tone
  return Math.round(Math.sin(sampleNumber / (sampleFreq / (Math.PI*2))));
}

function organWaveAt(sampleNumber,transpose){

  let t = sampleNumber/context.sampleRate;
  let result=0;
  for(let i=0; i<organ.length; i++){
    result += organ[i].a * Math.cos( 2*Math.PI*transpose*organ[i].f*t+organ[i].p );
  }
  return result;
}
