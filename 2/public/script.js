let btn = document.querySelector('.btn');
let button = document.querySelector('.power-switch');
let bulb = document.querySelector('.bulb');
let body = document.querySelector('body');
let audio = document.querySelector('#audio');
// 2.1
btn.onclick = function () {
    body.classList.toggle('on');
    audio.play();
}
// 2.2
bulb.onclick = function () {
    body.classList.toggle('on');
    audio.play();
}
button.onclick = function () {
    body.classList.toggle('on');
    audio.play();
}