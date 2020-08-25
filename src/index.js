import viewStep from '@zonesoundcreative/view-step';
import $ from 'jquery';
// import Swiper JS
import Swiper, {Navigation} from 'swiper';
// import Swiper styles
import 'swiper/swiper-bundle.css';
import './style.css';
import Asound from './A.mp3';

var mySwiper; 
const viewstep = new viewStep('.step',1,2);
var myAudio = document.getElementById('audio');

$("#start").click(()=>{
  console.log('start click');
  viewstep.showNext();
  newSwiper();
  myAudio.volume = 0;
  myAudio.play();//.then(() => {myAudio.pause()})
  loop();
})

function newSwiper() {
  Swiper.use([Navigation]);

  mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  })
}
//window.onload = function(){
console.log(myAudio);
var sourceElement = document.createElement('source');
myAudio.appendChild(sourceElement);
sourceElement.src = Asound;
sourceElement.type = 'audio/wav';
myAudio.addEventListener("loadstart", function() {
  //grabbing the file
  console.log('loadStart');
});
myAudio.addEventListener("progress", function() {
  // you could let the user know the media is downloading
  console.log('progress');
  //loop();
});
myAudio.addEventListener("canplaythrough", function() {
  //audio is ready to play all the way through
  console.log('can play through');
});
myAudio.addEventListener("timeupdate", function() {
  //update something related to playback progress
  console.log('time')
});
//}
function loop() {
  var buffered = audio.buffered;
  var loaded;
  var played;
  console.log('loop', buffered);
  if (buffered.length) {
    loaded = 100 * buffered.end(0) / audio.duration;
    played = 100 * audio.currentTime / audio.duration;
    if (loaded < 100)
      myAudio.currentTime = buffered.end(0);
    else {
      console.log('yo!');
      myAudio.volume = 1;
    }
    console.log(loaded.toFixed(2),played.toFixed(2));
  }

  if (!loaded || loaded < 100) {
    setTimeout(loop, 100);
  }
}

