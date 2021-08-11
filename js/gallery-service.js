'use strict'

const gKeywords = { 'happy': 0, 'funny': 0, 'animal': 0 };
const KEY = 'imgsDB';
let gImgs;

_createGImgs();

function _createGImgs() {
    let imgs = loadFromStorage(KEY);
    if (imgs && imgs.length) gImgs = imgs;
    else {
        gImgs = [];
        gImgs.push(_createImg(1, ['funny']));
        gImgs.push(_createImg(2, ['animal']));
        gImgs.push(_createImg(3, ['animal']));
        gImgs.push(_createImg(4, ['animal']));
        gImgs.push(_createImg(5, ['funny']));
        gImgs.push(_createImg(6, ['funny']));
        gImgs.push(_createImg(7, ['funny']));
        gImgs.push(_createImg(8, ['funny']));
        gImgs.push(_createImg(9, ['funny']));
        gImgs.push(_createImg(10, ['funny']));
        gImgs.push(_createImg(11, ['funny']));
        gImgs.push(_createImg(12, ['funny']));
        gImgs.push(_createImg(13, ['funny']));
        gImgs.push(_createImg(14, ['funny']));
        gImgs.push(_createImg(15, ['funny']));
        gImgs.push(_createImg(16, ['funny']));
        gImgs.push(_createImg(17, ['funny']));
        gImgs.push(_createImg(18, ['funny']));
    }
    _saveGImgsToStorage();
}

function _createImg(id, keyWords) {
    return {
        id,
        url: `meme-imgs/${id}.jpg`,
        keyWords
    }
}


function _saveGImgsToStorage() {
    saveToStorage(KEY, gImgs);
}

function getImgs() {
    return gImgs;
}