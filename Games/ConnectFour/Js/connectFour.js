const playerRed = "R";
const playerBlue = "B";
let currentPlayer = playerRed;
let gameOver = false;
let board;
const rows = 6;
const columns = 7;
let currentColumns = Array(columns).fill(rows - 1);

window.onload = () => {
    setGame();
    document.getElementById("restartButton").addEventListener("click", restartGame);
}
const restartGame = () => {
    currentPlayer = playerRed;
    gameOver = false;
    board = Array.from({ length: rows }, () => Array(columns).fill(' '));
    currentColumns = Array(columns).fill(rows - 1);

    // Reset the visual board
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.classList.remove("redPiece", "bluePiece");
    });

    // Clear the winner message
    const winnerElement = document.getElementById("winner");
    winnerElement.innerText = "";
}

const setGame = () => {
    board = Array.from({ length: rows }, () => Array(columns).fill(' '));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // HTML
            const tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            tile.classList.add("tile");
            tile.addEventListener("click", () => setPiece(r, c));
            document.getElementById("board").append(tile);
        }
    }
}

const setPiece = (r, c) => {
    if (gameOver) return;

    r = currentColumns[c];

    if (r < 0) return;

    board[r][c] = currentPlayer;

    const tile = document.getElementById(`${r}-${c}`);
    tile.classList.add(currentPlayer === playerRed ? "redPiece" : "bluePiece");

    currentPlayer = currentPlayer === playerRed ? playerBlue : playerRed;
    currentColumns[c] = r - 1;

    checkWinner();
}

const checkWinner = () => {
     // horizontal
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}


const setWinner = (r, c) => {
    const winnerElement = document.getElementById("winner");
    winnerElement.innerText = board[r][c] === playerRed ? "Red Wins" : "Blue Wins";
    gameOver = true;
}
