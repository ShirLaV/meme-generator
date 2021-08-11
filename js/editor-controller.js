'use strict'

const gElCanvas = document.querySelector('.main-canvas');
const gCtx = gElCanvas.getContext('2d');

function renderCanvas() {
    clearCanvas();
    drawImg();
    drawLines();
}

function onSetLine(txt) {
    if (!txt) return;
    addLine(txt);
    drawLines();
    document.querySelector('[name="text"]').value = '';
}

function onFontSizeChange(diff) {
    setFontSize(diff);
    renderCanvas();
}

function onLinePosChange(diff) {
    setLinePos(diff);
    renderCanvas();
}

function drawLines() {
    const lines = getLines();
    if (!lines.length) return
    lines.forEach(line => {
        drawLine(line);
    });
}

function drawLine(line = getLine()) {
    const txt = line.txt;
    gCtx.font = `${line.size}px impact`;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = line.color;
    const textWidth = gCtx.measureText(txt).width;
    gCtx.fillText(txt, (gElCanvas.width / 2) - (textWidth / 2), gElCanvas.height / 2 + line.diffFromCenter);
    gCtx.strokeText(txt, (gElCanvas.width / 2) - (textWidth / 2), gElCanvas.height / 2 + line.diffFromCenter);
}

function drawImg() {
    var img = new Image();
    const imgId = getImgId();
    img.src = `meme-imgs/${imgId}.jpg`;
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}