const SIZE = 5 //5*5 game board
let board = []; //現在のボード
let initialBoard = []; //初期状態のボードを保持

// initialize all to zero
//old //const board = Array(SIZE).fill().map(() => Array(SIZE).fill((0)));

const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const newBoardButton = document.getElementById('new-board-button');


//create random board
function initializeBoard(randomize = false) {
    return Array(SIZE)
        .fill()
        .map(() =>
            Array(SIZE).fill().map(() => (randomize ? Math.round(Math.random()) :0))
    );
}

//Create the game board
function createBoard() {
    // clear the current game board (remove all chiled elements)現在のボードをクリア
    gameBoard.innerHTML = "";


    for (let x = 0; x < SIZE; x++ ) {
        for (let y = 0; y < SIZE; y++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (board[x][y] === 0){
                cell.classList.add('off') //initial state
            }
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.addEventListener('click', () => toggle(x, y));
            gameBoard.appendChild(cell); 
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
    if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) return; //out of bounds
    board[x][y] = 1 - board[x][y];
    const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    if (cell) {
        cell.classList.toggle('off', board[x][y] === 0);
    }

}

//check if all lights are off
function checkWin() {
    return board.flat().every(cell => cell === 0);
}

//reset the board to its initial state
resetButton.addEventListener('click', () => {
    board = initialBoard.map(row => [...row]); //初期状態を保存
    createBoard(); //simply re-render the current board
});

//generate a new random　board
newBoardButton.addEventListener('click', () => {
    board = initializeBoard(true);  //Reinitialize with random values
    initialBoard = board.map(row => [...row]); ///初期状態を保存
    
    createBoard();  //Re-rendor the new board
});

//initial and render the board
board = initializeBoard(true);  //start with a random board
initialBoard = board.map(row => [...row]); ///初期状態を保存

createBoard();