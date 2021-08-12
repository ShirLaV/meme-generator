'use strict'

function initGallety() {
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
    setFilter(word);
    initGallety();
}

function onToggleMenu() {
    document.querySelector('body').classList.toggle('menu-open');
}

function onToggleEditor(ev) {
    if (ev.target.classList.contains('gallery') && !document.querySelector('.gallery-page').hidden) return;
    document.querySelector('.meme-editor').hidden = !document.querySelector('.meme-editor').hidden;
    document.querySelector('.gallery-page').hidden = !document.querySelector('.gallery-page').hidden;
}

function onSetMemeImg(ev) {
    const id = +ev.target.id;
    initMeme();
    setMemeImg(id);
    initEditorMeme();
}

function addImgEventListeners() {
    const ElImgs = document.querySelectorAll('.meme-img');
    ElImgs.forEach(elImg => {
        elImg.addEventListener("click", onToggleEditor);
        elImg.addEventListener("click", onSetMemeImg);
    })
}

function addGalleryEventListeners() {
    const ElGalleryA = document.querySelector('.gallery');
    ElGalleryA.addEventListener("click", onToggleEditor);
    ElGalleryA.addEventListener("click", onToggleMenu);
}