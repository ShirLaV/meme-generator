'use strict'

function onInit() {
    addGalleryEventListeners();
    addAboutEventListeners();
    initGallety();
    doTrans();
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]');
    els.forEach(el => {
        const txt = getTrans(el.dataset.trans);
        if (el.nodeName === 'INPUT') el.setAttribute('placeholder', txt);
        else el.innerText = txt;
    })
}

function onToggleLang() {
    const lang = toggleLang();
    if (lang === 'he') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
    onInit();
}

function onToggleMenu() {
    document.querySelector('body').classList.toggle('menu-open');
}

function onToggleModal() {
    document.querySelector('body').classList.toggle('modal-open');
}

function onToggleEditor(ev) {
    if (ev.target.classList.contains('gallery') && !document.querySelector('.gallery-page').hidden) return;
    document.querySelector('.meme-editor').hidden = !document.querySelector('.meme-editor').hidden;
    document.querySelector('.gallery-page').hidden = !document.querySelector('.gallery-page').hidden;
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

function addAboutEventListeners() {
    const ElGalleryA = document.querySelector('.about');
    ElGalleryA.addEventListener("click", onToggleModal);
    ElGalleryA.addEventListener("click", onToggleMenu);
}