import {titles, contents} from './content';
import $ from 'jquery';

function importAll(r) {
    return r.keys().map(r);
}
const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));

initPage();

function initPage() {
    for (let i in images) {
        $('.swiper-wrapper').append(createSlide2(i, images[i].default, titles[i], contents[i]));
        $('#playControl').append(createControlList(i, images[i].default, titles[i]));
    }
    $('#control-0').removeClass('hidden');
}

function createSlide2(id,imgsrc, title, content) {
    return `<div class="swiper-slide">
        <div class="swipe-all row">
            <div class="col-sm-12 col-lg">
            <img class="swipe-img" src="${imgsrc}">
            </div>
            <div class="swipe-txt col-sm-12 col-lg">
            <div class="swipe-title"> 
                <i id="slide-play-${id}" state="play" class="slide-play-${id} play fas fa-play-circle"></i>
                ${title} 
            </div>
            <div class="swipe-content">${content}</div>
            </div>
        </div>
        </div>`;
}

function createSlide(id, imgsrc, title, content) {
return `<div class="swiper-slide">
            <div class="swipe-all">
            <img class="swipe-img" src="${imgsrc}">
            <div class="swipe-txt">
                <div class="swipe-title"> 
                <i id="play-${id}" state="play" class="play fas fa-play-circle"></i>
                ${title} 
                </div>
                <div class="swipe-content">${content}</div>
            </div>
            </div>
        </div>`;
}

function createControlList(id, imgsrc, title) {
    return `<div id="control-${id}" class="control-all row hidden">
                <div class="col-2 col-lg-1">
                    <img class="control-img" src="${imgsrc}">
                </div>
                <div class="control-title col-6 col-lg">
                    ${title}
                </div>
                <div class="col-2 col-lg-1"><i id="control-play-${id}" state="play" class="play fas fa-play"></i></div>
                <div class="col-2 col-lg-1"><i id="control-forward-${id}" class="forward fas fa-redo-alt"></i></div>
            </div>`
}

