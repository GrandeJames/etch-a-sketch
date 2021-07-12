start();

function start() {
    const DEFAULT_SIZE = 10;

    addCellsToSketchpad(DEFAULT_SIZE);

    setCellColorListener(() => rainbowColor());
    toggleColorButton(document.querySelector("#rainbow"));

    setColorButtonListener();
    setClearListener();
    setChangeSizeListener(DEFAULT_SIZE);
}

function toggleColorButton(colorButton) {
    colorButton.classList.toggle("activated");
}



function addCellsToSketchpad(size) {
    const sketchpad = document.querySelector(".sketchpad");
    
    sketchpad.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    sketchpad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < (size * size); i++) {

        const cell = document.createElement("div");
        cell.className = "cell"

        sketchpad.appendChild(cell);
    }
}


function setCellColorListener(color) {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.addEventListener("mouseover", () => {

            // Color needs to be a function because we want rainbow color to
            // always change.
            cell.style.backgroundColor = color();
        })
    });
}


function rainbowColor() {
    return `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function setColorButtonListener() {
    const colorButtons = document.querySelectorAll(".color-button");

    colorButtons.forEach(colorButton => {
        colorButton.addEventListener("click", () => {

            if (!(colorButton.classList.contains("activated"))) {
                turnOffActivatedButton();
                colorButton.classList.toggle("activated");
            }

            if (colorButton.id === "black") {
                setCellColorListener(() => "black");
            } else if (colorButton.id === "rainbow") {
                setCellColorListener(() => rainbowColor());
            } else if (colorButton.id === "eraser") {
                setCellColorListener(() => "#fff");
            }
        });
    });
}

function turnOffActivatedButton() {
    const colorButtons = document.querySelectorAll(".color-button");

    colorButtons.forEach(colorButton => {
        if (colorButton.classList.contains("activated")) {
            colorButton.classList.toggle("activated");
        }
    });
}


function setClearListener() {
    const button = document.querySelector("#clear")
    button.addEventListener("click", () => clearCells());
}

function clearCells() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => cell.style.backgroundColor = "#fff");
}


function setChangeSizeListener(defaultSize) {
    const button = document.querySelector("#button-size");

    button.addEventListener("click", () => {
        let size = 0;
        while (size < 1 || size > 100) {
            size = prompt("Enter the size of the sketchpad", defaultSize);
            if (size == null) {
                return;
            }
        }
        removeCells();
        addCellsToSketchpad(size);

        // TODO keep original color
        // check which color button is activated
        // set the color to the activate button
        setCellColorListener(() => rainbowColor());
    })
}

function removeCells() {
    const sketchpad = document.querySelector(".sketchpad");
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        sketchpad.removeChild(cell);
    });
}