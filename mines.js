const gameBoard = document.getElementById("gameBoard");
const placeBetButton = document.getElementById("placeBet");
const mineCountSelect = document.getElementById("mineCount");

let minePositions = [];
let gameEnded = false;

function createBoard() {
    gameBoard.innerHTML = '';
    minePositions = [];
    gameEnded = false;

    // Stwórz planszę 5x5 (25 pól)
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement("div");
        cell.classList.add("game-cell");
        cell.addEventListener("click", () => handleCellClick(i));
        gameBoard.appendChild(cell);
    }
}

function placeMines(count) {
    let placedMines = 0;

    // Losowo rozmieszczaj miny
    while (placedMines < count) {
        const position = Math.floor(Math.random() * 25);
        if (!minePositions.includes(position)) {
            minePositions.push(position);
            placedMines++;
        }
    }
}

function handleCellClick(index) {
    if (gameEnded) return;

    const cells = document.querySelectorAll(".game-cell");

    if (minePositions.includes(index)) {
        cells[index].classList.add("mine");
        alert("Trafiłeś na minę! Gra skończona.");
        gameEnded = true;
        revealMines();
    } else {
        cells[index].classList.add("clicked");
    }
}

function revealMines() {
    const cells = document.querySelectorAll(".game-cell");
    minePositions.forEach(position => {
        cells[position].classList.add("mine");
    });
}

placeBetButton.addEventListener("click", () => {
    const mineCount = parseInt(mineCountSelect.value);
    createBoard();
    placeMines(mineCount);
});

createBoard();
