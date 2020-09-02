import viewStep from '@zonesoundcreative/view-step';
import $ from 'jquery';
// import Swiper JS
import Swiper, {Navigation} from 'swiper';
// import Swiper styles
import 'swiper/swiper-bundle.css';
import './style.css';
import './progress.js';
import './init.js';
import './loader.css';
import {initPlay} from './play.js';

//init
var swiper; 
const viewstep = new viewStep('.step',1,3, {
  2: checkLoading,
  3: newSwiper
});
//init sound
function importAll(r) {
  return r.keys().map(r);
}
const sounds = importAll(require.context('./sound', false, /\.(mp3)$/));
const len = sounds.length;
var loading = false;
var soundReady = 0;
initSound();


$("#start").click(()=>{  
  loading = true;
  viewstep.showNext();
})

function newSwiper() {
  Swiper.use([Navigation]);

  swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    spaceBetween: 5,
    //slidesPerView: 'auto',
    //freeMode: true,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  })
  initPlay();
}

function initSound() {
  for (let i in sounds) {
    $('body').append(createAudio(i, sounds[i].default));
    $('#audio-'+i).bind('canplaythrough', function() {
        console.log(i+' can play through');
        soundReady++;
        if (loading) checkLoading();
    })
  }
}

function createAudio(id, soundsrc) {
  return `<audio id="audio-${id}" src=${soundsrc}>`;
}


function checkLoading() {
  if (soundReady == len) {
    loading = false;
    viewstep.showNext();
  }
}
