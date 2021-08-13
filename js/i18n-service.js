'use strict'
let gCurrLang = 'en';

//translate
let gTrans = {
    Gallery: {
        en: 'Gallery',
        he: 'גלריה'
    },
    Memes: {
        en: 'Memes',
        he: 'ממים'
    },
    About: {
        en: 'About',
        he: 'אודות'
    },
    Search: {
        en: 'Search',
        he: 'חיפוש'
    },
    More: {
        en: 'More',
        he: 'עוד'
    },
    Text: {
        en: 'Type your text here',
        he: 'הקלד כאן'
    },
    Share: {
        en: 'Share',
        he: 'שיתוף'
    },
    Download: {
        en: 'Download',
        he: 'הורדה'
    },
    Save: {
        en: 'Save',
        he: 'שמור'
    },
    'about-subtitle': {
        en: 'Welcome to the best meme generator on the web.',
        he: 'ברוכים הבאים למחולל הממים הכי שווה ברשת'
    },
    'about-text': {
        en: 'In order to create a meme to your liking, click on any image you like and start editing your meme!' +
            ' You can edit the text, add lines and move them around, and also change colors, fonts and size.' +
            ' After you are done, share it on facebook or download it.',
        he: '.על מנת ליצור מים יש לבחור בתמונה הרצויה בגלריה ולהתחיל לערוך! אפשר לערוך טקסט, להוסיף שורות ולהזיז אותן על גבי התמונה, וכן לשנות צבעים, גודל ופונט. אחרי שתסיימו, תוכלו לשתף בפייסבוק או להוריד למחשב'
    },
    Enjoy: {
        en: 'Enjoy!',
        he: '!תהנו'
    }
}

function getTrans(transKey) {
    const currKey = gTrans[transKey];
    if (!currKey) return 'UNKNOWN';
    let txt = currKey[gCurrLang];
    if (!txt) txt = currKey['en'];
    return txt;
}

// function setLang(lang) {
//     gCurrLang = lang;
// }

function toggleLang() {
    gCurrLang = (gCurrLang === 'he') ? 'en' : 'he';
}