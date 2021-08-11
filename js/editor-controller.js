'use strict'
const gElCanvas = document.querySelector('.main-canvas');
const gCtx = gElCanvas.getContext('2d');

function drawImg() {
    var img = new Image();
    const imgId = getImgId();
    console.log('editor controller img id', imgId)
    img.src = `meme-imgs/${imgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function onSetLine(txt) {
    addLine(txt);
    drawTxt();
    document.querySelector('[name="text"]').value = '';
}

function drawTxt() {
    const line = getLine();
    const txt = line.txt;
    gCtx.font = `${line.size}px impact`;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = line.color;
    const textWidth = gCtx.measureText(txt).width;
    gCtx.fillText(txt, (gElCanvas.width / 2) - (textWidth / 2), gElCanvas.height / 2);
    gCtx.strokeText(txt, (gElCanvas.width / 2) - (textWidth / 2), gElCanvas.height / 2);
}