'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: []
}

function addLine(txt) {
    gMeme.lines.push(_createLine(txt));
}

function getImgId() {
    return gMeme.selectedImgId;
}

function getLines() {
    return gMeme.lines;
}

function getLine() {
    return gMeme.lines[selectedLineIdx];
}

function setMemeImg(id) {
    gMeme.selectedImgId = id;
}

function setFontSize(diff) {
    if (!gMeme.lines.length) return;
    const lineIdx = gMeme.selectedLineIdx;
    console.log('gMeme.lines[lineIdx].size', gMeme.lines[lineIdx].size)
    gMeme.lines[lineIdx].size += diff;
    console.log('gMeme.lines[lineIdx].size', gMeme.lines[lineIdx].size)
}

function setLinePos(diff) {
    const lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].diffFromCenter += diff
}

function _createLine(txt, size = 48, align = 'center', color = 'white') {
    return {
        txt,
        size,
        align,
        color,
        diffFromCenter: 0
    }
}