'use strict'

function onInit() {
    addEventListeners(document.querySelector('.gallery'), [onToggleMenu, onOpenGallery]);
    addEventListeners(document.querySelector('.about'), [onToggleMenu, onToggleModal]);
    addEventListeners(document.querySelector('.memes'), [onToggleMenu, onOpenMemes]);
    initGallery();
    initMemes();
    doTrans();
}

function addEventListeners(el, functions) {
    functions.forEach(func => {
        el.addEventListener("click", func);
    })
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

function onOpenGallery() {
    onOpenPage(document.querySelector('.gallery'));
    document.querySelector('.gallery-page').hidden = false;
    document.querySelector('.meme-editor').hidden = true;
    document.querySelector('.memes-page').hidden = true;
}

function onOpenEditor() {
    document.querySelector('.meme-editor').hidden = false;
    document.querySelector('.gallery-page').hidden = true;
    document.querySelector('.memes-page').hidden = true;
}

function onOpenMemes() {
    onOpenPage(document.querySelector('.memes'))
    document.querySelector('.memes-page').hidden = false;
    document.querySelector('.meme-editor').hidden = true;
    document.querySelector('.gallery-page').hidden = true;
}

function onOpenPage(el) {
    const links = document.querySelectorAll('a.active')
    links.forEach(link => {
        link.classList.remove('active')
    })
    el.classList.add('active')
}


function addImgEventListeners() {
    const ElImgs = document.querySelectorAll('.meme-img');
    ElImgs.forEach(elImg => {
        elImg.addEventListener("click", onOpenEditor);
        elImg.addEventListener("click", onSetMemeImg);
    })
}