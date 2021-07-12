start();

function start() {
    const DEFAULT_SIZE = 10;

    addCellsToSketchpad(DEFAULT_SIZE);
    addCellHover(() => getRainbowColor());
    changeSize(DEFAULT_SIZE);
    clear();

    onColorButtonClick();
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

function removeCells() {
    const sketchpad = document.querySelector(".sketchpad");
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        sketchpad.removeChild(cell);
    });
}

function changeSize(defaultSize) {
    const button = document.querySelector("#button-size");

    button.addEventListener("click", () => {
        let size = 0;
        while (size < 1 || size > 100) {
            size = prompt("Size?", defaultSize);
            if (size == null) {
                return;
            }
        }
        removeCells();
        addCellsToSketchpad(size);
        addCellHover( () => getRainbowColor());
    })
}

function resetCells() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => cell.style.backgroundColor = "#fff");
}

function clear() {
    const button = document.querySelector("#clear")
    button.addEventListener("click", () => resetCells());
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function addCellHover(color) {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.addEventListener("mouseover", () => {

            // Needs to be a function because we want rainbow color 
            cell.style.backgroundColor = color();
        })
    });
}

function getRainbowColor() {
    return `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
}

function onColorButtonClick() {
    const colorButtons = document.querySelectorAll(".color-button");

    colorButtons.forEach(colorButton => {
        
        colorButton.addEventListener("click", () => {

            if (!(colorButton.classList.contains("activated"))) {
                turnOffActivatedButton();
                colorButton.classList.toggle("activated");

            }

            // TODO change to whatever color clicked
            if (colorButton.id === "black") {
                addCellHover(() => "black");
            } else if (colorButton.id === "rainbow") {
                addCellHover(() => getRainbowColor());
            } else if (colorButton.id === "eraser") {
                addCellHover(() => "#fff");
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