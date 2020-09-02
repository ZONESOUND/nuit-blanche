import $ from 'jquery';
import {bar} from'./progress.js';

var nowPlaying = -1;
var audioArray = [];
//initPlay();

export function initPlay() {
    $('.play').click(playAction);
    $('.forward').click(forwardAction);
    for (let i=0; i<4; i++) {
        let e = document.getElementById("audio-"+i);
        audioArray.push(e);
        if (e) {
            e.addEventListener('timeupdate', timeupdate);
            e.addEventListener('ended', ended);
        }
    }
}

function toggleClass(id, now, replace) {
    //console.log(".slide-play-"+id);
    $(".slide-play-"+id).attr('state', replace);
    $("#control-play-"+id).attr('state', replace);
    $("#control-play-"+id).removeClass(`fa-${now}`);
    $("#control-play-"+id).addClass(`fa-${replace}`);
    $(".slide-play-"+id).removeClass(`fa-${now}-circle`);
    $(".slide-play-"+id).addClass(`fa-${replace}-circle`);
}

function playAction() {
    console.log($(this).attr('id'))
    if ($(this).attr('state') == 'play') {
        play($(this));
    } else {
        pause($(this));
    }
}

function forwardAction() {
    audioArray[nowPlaying].currentTime += 30;
}

function play(el) {
    //console.log('play!', nowPlaying);
    if (nowPlaying != -1) {
        getAudio(nowPlaying).pause();
        toggleClass(nowPlaying, 'pause', 'play');
        hideControl(nowPlaying);
    }
    nowPlaying = el.attr('id').split('-')[2];
    //console.log('to: ', nowPlaying);
    showControl(nowPlaying);
    getAudio(nowPlaying).play();
    toggleClass(nowPlaying, 'play', 'pause');
}

function pause(el) {
    console.log('pause');
    toggleClass(nowPlaying, 'pause', 'play');
    getAudio(nowPlaying).pause();
}

function getAudio(id) {
    if (!audioArray[id]) 
        audioArray[id] = document.getElementById("audio-"+id)
    return audioArray[id];
}

function hideControl(id) {
    $('#control-'+id).addClass('hidden');
}

function showControl(id) {
    $('#control-'+id).removeClass('hidden');
}

function timeupdate(event) {
    if (event.target.id == `audio-${nowPlaying}`) {
        bar.animate(event.target.currentTime/event.target.duration);
        //save to cache
    }
}

function ended(event) {
    let id = event.target.id.split('-')[1];
    console.log(id);
    $('.slide-play-'+id).addClass('hidden');
    $('#control-play-'+id).addClass('hidden');
    $('#control-forward-'+id).addClass('hidden');
    nowPlaying = -1;
}