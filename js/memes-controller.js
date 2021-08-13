'use strict'

function initMemes() {
    renderMemes();
}

function renderMemes() {
    const memes = getSavedMemes();
    if (!memes) return;
    let strHTMLs = memes.map(meme => {
        return `<img src="${meme}">`
    })
    document.querySelector('.memes-container').innerHTML = strHTMLs.join('');
}