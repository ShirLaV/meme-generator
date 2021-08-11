'use strict'

const gElCanvas = document.querySelector('.main-canvas');
const gCtx = gElCanvas.getContext('2d');
let gIsAdding = false;

function onEditorInit() {
    renderCanvas();
}

function renderCanvas() {
    clearCanvas();
    drawImg();
    drawLines();
}

function onSwitchLine() {
    selectLine();
    renderCanvas();
}

function onAddLine() {
    onEditText(true);
}

function onEditText(isNewLine) {
    const lines = getLines();
    //if first line-
    if (!lines.length) isNewLine = true;
    const elEditLine = document.querySelector('[name="text"]');
    const txt = elEditLine.value;
    if (isNewLine) {
        addLine(txt);
        onSwitchLine();
    } else {
        const line = getLine();
        line.txt = txt;
    }
    elEditLine.value = '';
    renderCanvas();
}

function onDeleteLine() {
    deleteLine();
    renderCanvas();
}

function onFontSizeChange(diff) {
    setFontSize(diff);
    renderCanvas();
}

function onLinePosChange(diff) {
    setLinePos(diff);
    renderCanvas();
}

function onColorChange(diff, color) {
    setColor(diff, color);
    renderCanvas();
}

function onAlignText(diff) {
    alignText(diff);
    renderCanvas();
}

function drawLines() {
    const lines = getLines();
    lines.forEach(line => {
        drawLine(line);
    });
}

function drawLine(line = getLine()) {
    const txt = line.txt;
    gCtx.font = `${line.size}px impact`;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.fontColor;
    const textWidth = gCtx.measureText(txt).width;
    gCtx.textAlign = line.align;
    gCtx.fillText(txt, (gElCanvas.width / 2), gElCanvas.height / 2 + line.diffFromCenter);
    gCtx.strokeText(txt, (gElCanvas.width / 2), gElCanvas.height / 2 + line.diffFromCenter);
    if (line.isSelected) highlightSelectedLine();
}

function drawImg() {
    var img = new Image();
    const imgId = getImgId();
    img.src = `meme-imgs/${imgId}.jpg`;
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function highlightSelectedLine() {
    const line = getLine();
    const txt = line.txt;
    const textWidth = gCtx.measureText(txt).width;
    gCtx.beginPath();
    const x = (gElCanvas.width / 2) - (textWidth / 2) - 100;
    const y = (gElCanvas.height / 2) + line.diffFromCenter - line.size;
    const width = textWidth + 200;
    const hegith = line.size + 20;
    gCtx.rect(x, y, width, hegith);
    gCtx.strokeStyle = 'white';
    gCtx.lineWidth = 2;
    gCtx.stroke();
}