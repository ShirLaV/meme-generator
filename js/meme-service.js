'use strict'

let gMeme;

function initMeme() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: []
    }
}

function addLine(txt) {
    gMeme.lines.push(_createLine(txt));
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

function getImgId() {
    return gMeme.selectedImgId;
}

function getLines() {
    return gMeme.lines;
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function setMemeImg(id) {
    gMeme.selectedImgId = id;
}

function selectLine() {
    if (!gMeme.lines.length) return;
    if (gMeme.lines[gMeme.selectedLineIdx]) gMeme.lines[gMeme.selectedLineIdx].isSelected = false;
    let currIdx = gMeme.selectedLineIdx;
    gMeme.selectedLineIdx = (currIdx < gMeme.lines.length - 1) ? ++currIdx : 0;
    gMeme.lines[gMeme.selectedLineIdx].isSelected = true;
}

function setFontSize(diff) {
    if (!gMeme.lines.length) return;
    const lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].size += diff;
}

function setLinePos(diff) {
    if (!gMeme.lines.length) return;
    const lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].diffFromCenter += diff
}

function alignText(diff) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.align = diff;
}

//drag&drop service

function isLineClicked(clickedPos) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    const distance = Math.sqrt((currLine.x - clickedPos.x) ** 2 + (currLine.y - clickedPos.y) ** 2)
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

function _createLine(txt = '', size = 48, align = 'center', fontColor = 'white', strokeColor = 'black') {
    return {
        txt,
        size,
        align,
        fontColor,
        strokeColor,
        diffFromCenter: 0,
        isSelected: true
    }
}