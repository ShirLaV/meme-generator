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