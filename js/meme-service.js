'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: []
}

function addLine(txt) {
    gMeme.lines.push(_createLine(txt));
    // console.log('gMeme.lines', gMeme.lines)
}

function getImgId() {
    return gMeme.selectedImgId;
}

function getLine() {
    return gMeme.lines[0];
}

function setMemeImg(id) {
    console.log('gMeme.selectedImgId', gMeme.selectedImgId)
    gMeme.selectedImgId = id;
    console.log('gMeme.selectedImgId', gMeme.selectedImgId)
}

function _createLine(txt, size = 48, align = 'center', color = 'white') {
    return {
        txt,
        size,
        align,
        color
    }
}