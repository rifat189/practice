const uploadBox = document.querySelector(".upload-box"),
    previewImg = uploadBox.querySelector("img"),
    fileInput = uploadBox.querySelector("input"),
    widthInput = document.querySelector("#width-input"),
    heightInput = document.querySelector("#height-input"),
    downloadBtn = document.querySelector(".download-btn"),
    qualityInput = document.querySelector("#quality"),
    ratioInput = document.querySelector("#ratio");

let ogImageRatio = 1;

const loadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return; //return if user hasn't selected any file
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener('load', () => {
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        reverseRatio = 1 / ogImageRatio;
        document.querySelector(".wrapper").classList.add("active");
    });
    // console.log(file);
}

function calcHightWithRatio() {
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.round(height);
}

function calcWidthWithRatio() {
    const width = ratioInput.checked ? heightInput.value / reverseRatio : widthInput.value;
    widthInput.value = Math.round(width);
}

const resizeAndDownload = () => {
    const canvas =  document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext('2d');

    const imgQuality = qualityInput.checked ? 0.7 : 1;

    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

    a.href = canvas.toDataURL("image/jpeg", imgQuality);
    a.download = new Date().getTime();
    a.click();
    // document.body.appendChild(canvas);
}


downloadBtn.addEventListener('click', resizeAndDownload);

widthInput.addEventListener('keyup', calcHightWithRatio);
widthInput.addEventListener('mouseup', calcHightWithRatio);
heightInput.addEventListener('keyup', calcWidthWithRatio);
heightInput.addEventListener('mouseup', calcWidthWithRatio);

uploadBox.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', loadFile);

