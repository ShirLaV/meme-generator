'use strict'

let gSavedMemes;
let gMeme;

function initMeme() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: []
    }
}

function getImgId() {
    return gMeme.selectedImgId;
}

//editing meme functions

function addLine(txt, size) {
    gMeme.lines.push(_createLine(txt, size));
}

function deleteLine() {
    if (!gMeme.lines.length) return;
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    selectLine();
}

function setColor(diff, color) {
    if (!gMeme.lines.length) return;
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    switch (diff) {
        case 'stroke':
            currLine.strokeColor = color;
            break;
        case 'font':
            currLine.fontColor = color;
    }
}

function setFontFamily(fontFamily) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.fontFamily = fontFamily;
}

function setFontSize(diff) {
    if (!gMeme.lines.length) return;
    const lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].size += diff;
}

function alignText(diff) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.align = diff;
}

function setMemeImg(id) {
    gMeme.selectedImgId = id;
}

function getLines() {
    return gMeme.lines;
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function selectLine() {
    if (!gMeme.lines.length) return;
    if (gMeme.lines[gMeme.selectedLineIdx]) gMeme.lines[gMeme.selectedLineIdx].isSelected = false;
    let currIdx = gMeme.selectedLineIdx;
    gMeme.selectedLineIdx = (currIdx < gMeme.lines.length - 1) ? ++currIdx : 0;
    gMeme.lines[gMeme.selectedLineIdx].isSelected = true;
}

function _createLine(txt = '', size, fontFamily = 'Impact-new',
    align = 'center', fontColor = 'white', strokeColor = 'black') {
    return {
        txt,
        size,
        fontFamily,
        align,
        fontColor,
        strokeColor,
        isSelected: true
    }
}

//drag&drop service

function isLineClicked(clickedPos) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    const distance = Math.sqrt((currLine.x - clickedPos.x) ** 2 + (currLine.y - clickedPos.y) ** (-2))
    return distance <= currLine.size;
}

function setLineDrag(isDrag) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.isDrag = isDrag;
}

function moveLine(dx, dy) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.x += dx
    currLine.y += dy
}

//saving memes

function saveMeme(memeDataUrl) {
    if (!gSavedMemes) gSavedMemes = [];
    gSavedMemes.push(memeDataUrl);
    saveToStorage('savedMemesDB', gSavedMemes);
}

function getSavedMemes() {
    gSavedMemes = loadFromStorage('savedMemesDB');
    return gSavedMemes;
}