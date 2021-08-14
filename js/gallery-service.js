'use strict'

const gKeywords = { 'all': 0, 'happy': 3, 'funny': 4, 'animal': 10, 'man': 6, 'cartoon': 20, 'baby': 3 };
const KEY = 'imgsDB';
let gImgs;
let gFilterBy = 'all';

_createGImgs();

function setFilter(word) {
    word = word.toLowerCase();
    if (!gKeywords[word] && gKeywords[word] !== 0) return;
    gFilterBy = word;
    if (gFilterBy === 'all') return;
    gKeywords[gFilterBy]++;
}

function getKeyWords() {
    return gKeywords;
}

function _createGImgs() {
    let imgs = loadFromStorage(KEY);
    if (imgs && imgs.length) gImgs = imgs;
    else {
        gImgs = [];
        gImgs.push(_createImg(1, ['funny', 'man']));
        gImgs.push(_createImg(2, ['animal']));
        gImgs.push(_createImg(3, ['animal', 'baby']));
        gImgs.push(_createImg(4, ['animal']));
        gImgs.push(_createImg(5, ['funny', 'baby']));
        gImgs.push(_createImg(6, ['funny', 'man']));
        gImgs.push(_createImg(7, ['funny', 'baby']));
        gImgs.push(_createImg(8, ['funny', 'man']));
        gImgs.push(_createImg(9, ['funny', 'baby', 'happy']));
        gImgs.push(_createImg(10, ['funny', 'man', 'happy']));
        gImgs.push(_createImg(11, ['funny']));
        gImgs.push(_createImg(12, ['funny', 'man']));
        gImgs.push(_createImg(13, ['man']));
        gImgs.push(_createImg(14, ['man']));
        gImgs.push(_createImg(15, ['man', 'happy']));
        gImgs.push(_createImg(16, ['funny', 'man']));
        gImgs.push(_createImg(17, ['man']));
        gImgs.push(_createImg(18, ['cartoon']));
    }
    _saveGImgsToStorage();
}

function _createImg(id, keyWords) {
    return {
        id,
        keyWords,
        url: `meme-imgs/${id}.jpg`
    }
}

function getTodosForDisplay() {
    if (gFilterBy === 'all') return gImgs;
    let imgs = gImgs.filter(img => {
        return img.keyWords.includes(gFilterBy);
    })
    return imgs;
}

function _saveGImgsToStorage() {
    saveToStorage(KEY, gImgs);
}