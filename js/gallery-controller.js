'use strict'

function initGallery() {
    renderImgs();
    renderSearchWords();
}

function renderImgs() {
    const imgs = getTodosForDisplay();
    let strHTMLs = imgs.map(img => {
        return `<img class="meme-img" id=${img.id} src="${img.url}">`;
    })
    document.querySelector('.images-container').innerHTML = strHTMLs.join('');
    addImgEventListeners();
}

function renderSearchWords() {
    var wordsMap = getKeyWords();
    var keyWords = Object.keys(wordsMap);
    let strHTML = keyWords.map(word => {
        const fontSize = 10 + wordsMap[word];
        return `<li class="key-word" style="font-size: ${fontSize}px" onclick="onFilterImgs('${word}')">${word}</li>`
    });
    document.querySelector('.search-words').innerHTML = strHTML.join('');
}

function onFilterImgs(word) {
    document.querySelector('[name=search-box]').value = '';
    const lang = getLang();

    document.querySelector('[name=search-box]').placeholder = (lang === 'en') ? 'Search' : 'חיפוש';
    setFilter(word);
    initGallery();
}

function onSetMemeImg(ev) {
    const id = +ev.target.id;
    initMeme();
    setMemeImg(id);
    initEditorMeme();
}