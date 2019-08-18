let violin= [
  {freq:499.98 ,amp:0.05024,phi:-79.26},
  {freq:989.78, amp:0.01608,phi:10.89},
  {freq:1489.66,amp:0.02179,phi:-13.22},
  {freq:1989.55,amp:0.03411,phi:-30.97},
  {freq:2489.44,amp:0.01904,phi:156.26},
  {freq:2989.32,amp:0.03099,phi:-54.57},
  {freq:3469.21,amp:0.00796,phi:-49.46},
  {freq:3979.10,amp:0.01728,phi:-129.91},
];


let lengthOf8 = 6;
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

  playVoice(0)
  playVoice(1)
  time++;
}


function playVoice(input){
  let voice = voices[input];
  if(time===voice.nextTrigger) {

    let index=voice.noteCounter;
    let noteLength = (voice.durations.charCodeAt( index )-40);
    let arr = [],
    volume = 0.2,
    seconds = noteLength*0.200,
    tone = Math.pow(2, ( voice.notes.charCodeAt( index )-64)/12);//*440;

    for (var i = 0; i < context.sampleRate * seconds; i++) {
      //arr[i] = sineWaveAt(i, tone*440) * volume
      //arr[i] = roundedSineWaveAt(i, tone*440) * volume
      arr[i] = violinWaveAt(i, tone/2) * volume
    }

    playSound(arr)

    // set next time at which to trigger next note
    voices[input].nextTrigger = time+noteLength*lengthOf8;

    // continue and reset loop
    voices[input].noteCounter++;
    if(voice.noteCounter>=voice.notes.length) voices[input].noteCounter=0;
  }
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

function roundedSineWaveAt(sampleNumber, tone) {
  let sampleFreq = context.sampleRate / tone
  return Math.round(Math.sin(sampleNumber / (sampleFreq / (Math.PI*2))));
}

function violinWaveAt(sampleNumber,transpose){

  let t = sampleNumber/context.sampleRate;
  let result=0;
  for(let i=0; i<violin.length; i++){
    result += violin[i].amp * Math.cos( 2*Math.PI*transpose*violin[i].freq*t+violin[i].phi );
  }
  return result;
}


function arraySum(input){
  let result=0;
  for(let i=0; i<input.length;i++){
    result+=input[i];
  }
  return result;
}
