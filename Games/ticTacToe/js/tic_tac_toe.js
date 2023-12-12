let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let statsBtn = document.getElementById("statsBtn");
let boxes = Array.from(document.getElementsByClassName("box"));
let xWinsElement = document.getElementById("xWins");
let oWinsElement = document.getElementById("oWins");
let drawsElement = document.getElementById("draws");

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

let gameStats = {
  x: 0,
  o: 0,
  draws: 0,
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
  restartBtn.addEventListener("click", restart);

  // Load stats from local storage on page load
  loadFromLocalStorage();
  updateStatsDisplay();
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      playerText.innerHTML = `${currentPlayer} has won!`;
      let winning_blocks = playerHasWon();

      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );

      updateStats(currentPlayer);
      saveToLocalStorage();
      return;
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
  }
}

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

function updateStats(winner) {
  if (winner === X_TEXT) {
    gameStats.x++;
  } else if (winner === O_TEXT) {
    gameStats.o++;
  } else {
    gameStats.draws++;
  }

  updateStatsDisplay();
}

function updateStatsDisplay() {
  xWinsElement.innerText = `X Wins: ${gameStats.x}`;
  oWinsElement.innerText = `O Wins: ${gameStats.o}`;
  drawsElement.innerText = `Draws: ${gameStats.draws}`;
}

function restart() {
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });

  playerText.innerHTML = "Tic Tac Toe";

  currentPlayer = X_TEXT;
}

function showStats() {
  alert(
    `X Wins: ${gameStats.x}\nO Wins: ${gameStats.o}\nDraws: ${gameStats.draws}`
  );
}

function saveToLocalStorage() {
  localStorage.setItem("ticTacToeStats", JSON.stringify(gameStats));
}

function loadFromLocalStorage() {
  const savedStats = localStorage.getItem("ticTacToeStats");
  if (savedStats) {
    gameStats = JSON.parse(savedStats);
  }
}

startGame();
