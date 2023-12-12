let board = []; // Array to hold the game board.
let rows = 8; // Number of rows in the game board.
let columns = 8; // Number of columns in the game board.

let minesCount = 10; // Total number of mines in the game.
let minesLocation = []; // Array to store the locations of mines.

let tilesClicked = 0; // Counter for tiles clicked.
let flagEnabled = false; // Flag mode status.

let gameOver = false; // Flag to indicate if the game is over.

const restartGame = () => {
  // Reset all game variables.
  board = [];
  minesLocation = [];
  tilesClicked = 0;
  flagEnabled = false;
  gameOver = false;

  // Clear the board in the UI.
  const boardElement = document.getElementById("board");
  while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.firstChild);
  }

  // Restart the game.
  startGame();
};

const setMines = () => {
  // Loop to randomly place mines on the board.
  let minesLeft = minesCount;
  while (minesLeft > 0) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    let id = `${r}-${c}`;

    if (!minesLocation.includes(id)) {
      minesLocation.push(id);
      minesLeft -= 1;
    }
  }
};

const startGame = () => {
  document.getElementById("minesCount").innerText = minesCount; // Set the mines count in the UI.
  document.getElementById("flag").addEventListener("click", setFlag); // Add event listener for flag button.
  setMines(); // Initialize mine placement.

  // Populate the game board.
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = `${r}-${c}`;
      tile.addEventListener("click", clickTile);
      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }
};

const setFlag = () => {
  // Toggle flag mode and update button style.
  if (flagEnabled) {
    flagEnabled = false;
    document.getElementById("flag").style.backgroundColor = "lightgray";
  } else {
    flagEnabled = true;
    document.getElementById("flag").style.backgroundColor = "darkgray";
  }
};

const clickTile = (e) => {
  let tile = e.target;

  // If the game is over or tile is already clicked, return early.
  if (gameOver || tile.classList.contains("tile-clicked")) {
    return;
  }

  if (flagEnabled) {
    // Toggle flag icon.
    if (tile.innerText == "") {
      tile.innerText = "🚩";
    } else if (tile.innerText == "🚩") {
      tile.innerText = "";
    }
    return;
  }

  if (minesLocation.includes(tile.id)) {
    // If a mine is clicked, end the game.
    gameOver = true;
    revealMines();
    return;
  }

  let coords = tile.id.split("-"); // Split the tile ID to get row and column.
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);
  checkMine(r, c);
};

const revealMines = () => {
  // Reveal all mines at the end of the game.
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = board[r][c];
      if (minesLocation.includes(tile.id)) {
        tile.innerText = "💣";
        tile.style.backgroundColor = "red";
      }
    }
  }
};

const checkMine = (r, c) => {
  if (r < 0 || r >= rows || c < 0 || c >= columns) {
    return;
  }
  if (board[r][c].classList.contains("tile-clicked")) {
    return;
  }

  // Mark tile as clicked and update counter.
  board[r][c].classList.add("tile-clicked");
  tilesClicked += 1;

  let minesFound = 0;

  // Check surrounding tiles for mines.
  minesFound += checkTile(r - 1, c - 1); // top left
  minesFound += checkTile(r - 1, c); // top
  minesFound += checkTile(r - 1, c + 1); // top right
  minesFound += checkTile(r, c - 1); // left
  minesFound += checkTile(r, c + 1); // right
  minesFound += checkTile(r + 1, c - 1); // bottom left
  minesFound += checkTile(r + 1, c); // bottom
  minesFound += checkTile(r + 1, c + 1); // bottom right

  if (minesFound > 0) {
    // If adjacent mines found, display the count.
    board[r][c].innerText = minesFound;
    board[r][c].className = `x${minesFound}`;
  } else {
    // If no adjacent mines, recursively check surrounding tiles.
    board[r][c].innerText = "";
    checkMine(r - 1, c - 1); // top left
    checkMine(r - 1, c); // top
    checkMine(r - 1, c + 1); // top right
    checkMine(r, c - 1); // left
    checkMine(r, c + 1); // right
    checkMine(r + 1, c - 1); // bottom left
    checkMine(r + 1, c); // bottom
    checkMine(r + 1, c + 1); // bottom right
  }

  if (tilesClicked == rows * columns - minesCount) {
    // If all non-mine tiles clicked, show win message.
    document.getElementById("minesCount").innerText = "Cleared";
    gameOver = true;
  }
};

const checkTile = (r, c) => {
  if (r < 0 || r >= rows || c < 0 || c >= columns) {
    return 0;
  }
  if (minesLocation.includes(`${r}-${c}`)) {
    return 1;
  }
  return 0;
};
window.addEventListener("load", startGame); // Start the game when the window loads.
