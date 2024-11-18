const SIZE = 5 //5*5 game board

// initialize all to zero
const board = Array(SIZE).fill().map(() => Array(SIZE).fill((0));

const gameBoard = document.getElementById('game-board');

//Create the game board
function createBoard() {
    for (let x = 0; x < SIZE; x++ ) {
        for (let y = 0; y < SIZE; y++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = x;
            cell.dateset.y = y;
            cell.addEventListener('click', () => taggle(x, y));
            gameBoard.appendchild(cell); 
        }
    }

}

//taggle a cell and its neighbors
function toggle(x, y) {
    toggleCell(x, y); //center
    toggleCell(x - 1, y); //top
    toggleCell(x + 1, y); //bottom
    toggleCell(x, y - 1); //left
    toggleCell(x, y + 1); //right

    if (checkWin()) {
        alert("クリア！");
    }
}

//toggle a single cell
function toggleCell(x, y) {
    if (x < 0 || X >= SIZE || y < 0 || y >= SIZE) return; //out of bounds
    board[x][y] = 1 - board[x][y];
    const cell = document.querySelector('[date-x="${x}"][date-y="${y}"]');
    cell.classList.toggle('off', board[x][y] === 0);
}

//check if all lights are off
function checkWin() {
    return board.flat().every(cell => cell === 0);
}

createBoard();