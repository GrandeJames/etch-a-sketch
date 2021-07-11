
function addCellsToSketchpad(size) {
    const sketchpad = document.querySelector(".sketchpad");
    
    sketchpad.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    sketchpad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < (size * size); i++) {
        const cell = document.createElement("div");

        cell.className = "cell"
        cell.style.border = "0.1px solid black";
        cell.style.backgroundColor = "#fff";

        sketchpad.appendChild(cell);
    }
}

function addCellHoverListener() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.addEventListener("mouseover", () => {
            cell.style.backgroundColor = `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
        })
    });
}

function removeCells() {
    const sketchpad = document.querySelector(".sketchpad");
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        sketchpad.removeChild(cell);
    });
}

function changeSize() {
    const button = document.querySelector("#button-size");

    button.addEventListener("click", () => {
        let size = 0;
        while (size < 1 || size > 100) {
            size = prompt("Size?", 16);
            if (size == null) {
                return;
            }
        }
        removeCells();
        addCellsToSketchpad(size);
        addCellHoverListener();
    })
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

addCellsToSketchpad(16);
changeSize();
addCellHoverListener();