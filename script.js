
const defaultSize = 16;
const container = document.getElementById('container');
const buttons = document.getElementById('buttons');
let currentSize = defaultSize;
const defaultColor = 'black';
let currentColor = defaultColor;
const COLOR_MODE = 'color';
const RAINBOW_MODE = 'rainbow';
const ERASER_MODE = 'eraser';
let currentMode = COLOR_MODE;
let mouseDown = false;

// Functions section


function build(size){
    for(let rowNum = 0; rowNum < size; rowNum++){
        const row = document.createElement("div");
        row.classList.add('row');

        for(let colNum=0; colNum<size; colNum++){
            const col = document.createElement("div");
            col.classList.add('col');
            row.appendChild(col);

            //here we need to add event listeners for the hover effect:
            col.addEventListener('mouseenter', () => {
                if (!mouseDown) return;
                paintCell(col);
            })
            col.addEventListener('mousedown', () => {
                paintCell(col);
            })
        }
        container.appendChild(row);
    }
}

function clear(){
    container.innerHTML = "";
}

function reset(size){
    clear();
    build(size);
}

function getNewSize(){
    do {
        currentSize = prompt("Enter the new size, positive and less than 100", 32);
    } while (isNaN(currentSize) || currentSize < 0 || currentSize > 100);
    return currentSize;
}

function setMode(mode){
    currentMode = mode;

    switch (mode){
        case COLOR_MODE:
            colorButton.classList.add('active');
            rainbowButton.classList.remove('active');
            eraserButton.classList.remove('active');
            break;
        case RAINBOW_MODE:
            colorButton.classList.remove('active');
            rainbowButton.classList.add('active');
            eraserButton.classList.remove('active');
            break;
        case ERASER_MODE:
            colorButton.classList.remove('active');
            rainbowButton.classList.remove('active');
            eraserButton.classList.add('active');
            break;
    }
}

function paintCell(cell){
    switch (currentMode){
        case COLOR_MODE:
            cell.style.backgroundColor = currentColor;
            break;
        case RAINBOW_MODE:
            cell.style.backgroundColor = getRandomRGB();
            break;
        case ERASER_MODE:
            cell.style.backgroundColor = 'white';
            break;
    }
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min);
}

function getRandomRGB(){
    const r = getRandomInt(0, 255);
    const g = getRandomInt(0, 255);
    const b = getRandomInt(0, 255);
    return `rgb(${r}, ${g}, ${b})`;
}



// Sketchpad logic

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener('click', () => reset(currentSize));

const sizeSlider = document.getElementById('sizeSlider');
const sliderValue = document.getElementById('sliderValue');

sizeSlider.addEventListener('input', () => {
    currentSize = sizeSlider.value
    sliderValue.textContent = currentSize + " x " + currentSize;
    reset(sizeSlider.value);
})

const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', () => {
    currentColor = colorPicker.value;
})

const colorButton = document.getElementById('colorButton');
colorButton.classList.add('active');
colorButton.addEventListener('click', () => setMode(COLOR_MODE));

const rainbowButton = document.getElementById('rainbowButton');
rainbowButton.addEventListener('click', () => setMode(RAINBOW_MODE));

const eraserButton = document.getElementById('eraserButton');
eraserButton.addEventListener('click', () => setMode(ERASER_MODE));

document.body.addEventListener('mousedown', () => mouseDown = true);
document.body.addEventListener('mouseup', () => mouseDown = false);


build(defaultSize);
