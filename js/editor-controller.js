'use strict'

const gElCanvas = document.querySelector('.main-canvas');
const gCtx = gElCanvas.getContext('2d');
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
let gStartPos;
let gIsImgReady;

function initEditorMeme() {
    gIsImgReady = false;
    resizeCanvas();
    onAddLine();
    addListeners();
}

function renderCanvas() {
    clearCanvas();
    drawImg();
    drawLines();
}

function onSwitchLine() {
    const elEditLine = document.querySelector('[name="text"]');
    selectLine();
    elEditLine.value = getLine().txt;
    renderCanvas();
}

function onAddLine(txt = 'your text') {
    addLine(txt, gElCanvas.width / 10);
    selectLine();
    document.querySelector('[name="text"]').value = '';
    document.querySelector('[name="text"]').placeholder = 'Type your text here';
    renderCanvas();
}

function onDeleteLine() {
    document.querySelector('[name="text"]').value = '';
    document.querySelector('[name="text"]').placeholder = 'Type your text here';
    deleteLine();
    renderCanvas();
}

function onFontSizeChange(diff) {
    setFontSize(diff);
    renderCanvas();
}

function onColorChange(diff, color) {
    setColor(diff, color);
    renderCanvas();
}

function onSetFontFamily(fontFamily) {
    setFontFamily(fontFamily);
    console.log(fontFamily)
    renderCanvas();
}

function onAlignText(diff) {
    alignText(diff);
    renderCanvas();
}

function drawLines() {
    const lines = getLines();
    lines.forEach(line => {
        drawLine(line);
    });
}

function drawLine(line) {
    const txt = line.txt;
    gCtx.font = `${line.size}px ${line.fontFamily}`;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.fontColor;
    // const textWidth = gCtx.measureText(txt).width;
    gCtx.textAlign = line.align;
    if (!line.x) line.x = gElCanvas.width / 2;
    if (!line.y) line.y = gElCanvas.height / 2;
    gCtx.fillText(txt, line.x, line.y);
    gCtx.strokeText(txt, line.x, line.y);
    if (line.isSelected) highlightSelectedLine();
}

function onEditText() {
    const line = getLine();
    if (!line) {
        return;
    }
    const txt = document.querySelector('[name=text]').value;
    line.txt = txt;
    renderCanvas();
}

function drawImg() {
    var img = new Image();
    const imgId = getImgId();
    img.src = `meme-imgs/${imgId}.jpg`;
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gElCanvas.style.width = '100%';
    gElCanvas.style.height = '100%';
    // ...then set the internal size to match
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function highlightSelectedLine() {
    if (gIsImgReady) return;
    const line = getLine();
    const txt = line.txt;
    const textWidth = gCtx.measureText(txt).width;
    gCtx.beginPath();
    const x = line.x - textWidth;
    const y = line.y - line.size * 1.25;
    const width = textWidth * 2;
    const hegith = line.size * 2;
    gCtx.rect(x, y, width, hegith);
    gCtx.strokeStyle = 'white';
    gCtx.lineWidth = 2;
    gCtx.stroke();
}

//DRAG&DROP

function addListeners() {
    addMouseListeners();
    addTouchListeners();
    window.addEventListener('resize', () => {
        resizeCanvas();
        renderCanvas();
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev);
    if (!isLineClicked(pos)) return;
    console.log('yes')
    setLineDrag(true);
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
    const line = getLine();
    if (!line) return;
    if (line.isDrag) {
        console.log('hey')
        const pos = getEvPos(ev);
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;
        moveLine(dx, dy);
        gStartPos = pos;
        renderCanvas();
    }
}

function onUp() {
    setLineDrag(false);
    document.body.style.cursor = 'auto'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault();
        ev = ev.changedTouches[0];
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

// download&share

function onDownloadImg(elLink) {
    gIsImgReady = true;
    renderCanvas();
    const imgContent = gElCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
    gIsImgReady = false;
}

function onShareImg() {
    gIsImgReady = true;
    renderCanvas();
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        // document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`

        document.querySelector('.share-btn').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
    gIsImgReady = false;
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData();
    formData.append('img', imgDataUrl)
    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}