start();

function start() {
    const DEFAULT_SIZE = 10;

    addCellsToSketchpad(DEFAULT_SIZE);

    setCellColorListener(() => rainbowColor());

    document.querySelector("#rainbow").classList.toggle("activated");
    document.querySelector(".colors").id = "rainbow";

    setColorButtonListener();
    setClearListener();
    setChangeSizeListener(DEFAULT_SIZE);
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

            // Color is a function because we want rainbow color to
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
    const colorsDiv = document.querySelector(".colors");

    colorButtons.forEach(colorButton => {
        colorButton.addEventListener("click", () => {

            if (!(colorButton.classList.contains("activated"))) {
                turnOffActivatedButton();
                colorButton.classList.toggle("activated");
                colorsDiv.id = colorButton.id;
            }

            setElementColorId(colorButton);
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

function setElementColorId(element) {
    if (element.id === "rainbow") {
        setCellColorListener(() => rainbowColor());
    } else if (element.id === "black") {
        setCellColorListener(() => "black");
    } else if (element.id === "eraser") {
        setCellColorListener(() => "#fff");
    }
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
    const colorsDiv = document.querySelector(".colors");

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

        setElementColorId(colorsDiv);
    });
}

function removeCells() {
    const sketchpad = document.querySelector(".sketchpad");
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        sketchpad.removeChild(cell);
    });
}

// TODO: choose custom color button, responsiveness, click and hover to sketch,
// add fonts, choose grid size easier, toggle grid (borders).