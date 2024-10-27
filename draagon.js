// Get references to elements
const betAmountInput = document.getElementById('bet-amount');
const placeBetButton = document.getElementById('place-bet');
const resetButton = document.getElementById('reset-game');
const halfBetButton = document.getElementById('half-bet');
const doubleBetButton = document.getElementById('double-bet');
const grid = document.getElementById('grid');

// Initialize bet amount
let betAmount = parseFloat(betAmountInput.value);

// Create the grid of tiles dynamically (with mines)
function createGrid(rows, cols) {
    grid.innerHTML = ''; // Clear grid
    for (let row = 0; row < rows; row++) {
        const safeTile = Math.floor(Math.random() * cols);  // Random safe tile in this row
        for (let col = 0; col < cols; col++) {
            const tile = document.createElement('div');
            tile.classList.add('grid-item');
            tile.setAttribute('data-row', row);
            tile.setAttribute('data-col', col);

            // Mark the safe tile
            tile.isMine = (col !== safeTile); 

            // Add event listener for click
            tile.addEventListener('click', () => selectTile(tile, row));
            grid.appendChild(tile);
        }
    }
}

// Handle selecting a tile
function selectTile(tile, row) {
    // Unselect previous tiles in the same row
    const rowTiles = document.querySelectorAll(`[data-row='${row}']`);
    rowTiles.forEach(t => {
        if (!t.classList.contains('mine')) {
            t.classList.remove('selected');
        }
    });

    // Check if the tile is a mine
    if (tile.isMine) {
        tile.classList.add('mine');  // Show mine
        alert("Game Over! You clicked a mine.");
        createGrid(5, 5);  // Reset the grid
    } else {
        tile.classList.add('selected');  // Highlight the selected safe tile
    }
}

// Update bet amount
function updateBetAmount(multiplier) {
    betAmount = parseFloat(betAmountInput.value);
    betAmount *= multiplier;
    betAmountInput.value = betAmount.toFixed(2);
}

// Place the bet and notify user
placeBetButton.addEventListener('click', () => {
    const difficulty = document.getElementById('difficulty').value;
    alert(`Bet placed! Amount: $${betAmount}, Difficulty: ${difficulty}`);
});

// Reset the game
resetButton.addEventListener('click', () => {
    createGrid(5, 5);
});

// Half bet
halfBetButton.addEventListener('click', () => {
    updateBetAmount(0.5);
});

// Double bet
doubleBetButton.addEventListener('click', () => {
    updateBetAmount(2);
});

// Initialize the grid with 5 rows and 5 columns
createGrid(5, 5);
