'use strict'

function renderImgs() {
    const imgs = getImgs();
    let strHTMLs = imgs.map(img => {
        return `<img class="meme-img" id=${img.id} src="${img.url}">`;
    })
    document.querySelector('.images-container').innerHTML = strHTMLs.join('');
    addImgEventListeners();
}

function onOpenEditor() {
    document.querySelector('.meme-editor').hidden = false;
    document.querySelector('.gallery-page').hidden = true;
}

function onSetMemeImg(ev) {
    const id = +ev.target.id;
    console.log('id', id)
    setMemeImg(id);
    drawImg();
}

function addImgEventListeners() {
    const ElImgs = document.querySelectorAll('.meme-img');
    ElImgs.forEach(elImg => {
        elImg.addEventListener("click", onOpenEditor);
        elImg.addEventListener("click", onSetMemeImg);
    })
}