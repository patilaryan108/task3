const gameBoard = document.getElementById("game-board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset-btn");

let currentPlayer = "X";
let gameActive = true;
let board = Array(9).fill(null);

// Create the game board
function createBoard() {
  gameBoard.innerHTML = "";
  board.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.setAttribute("data-index", index);
    cellDiv.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cellDiv);
  });
}

// Handle cell click
function handleCellClick(event) {
  const index = event.target.getAttribute("data-index");
  if (!gameActive || board[index] !== null) return;

  board[index] = currentPlayer;
  event.target.innerText = currentPlayer;
  checkWinner();
  switchPlayer();
}

// Switch player
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (currentPlayer === "O" && gameActive) {
    setTimeout(computerMove, 500); // Computer's turn after 500ms delay
  }
}

// Check winner or draw
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      setWinMessage(`${currentPlayer} wins!`);
      return;
    }
  }

  if (!board.includes(null)) {
    gameActive = false;
    setWinMessage("It's a draw!");
  }
}

// Set win message with style
function setWinMessage(message) {
  const winMessageDiv = document.createElement("div");
  winMessageDiv.classList.add("win-message");
  winMessageDiv.innerText = message;
  statusText.innerHTML = "";
  statusText.appendChild(winMessageDiv);
}

// Computer's move
function computerMove() {
  const availableMoves = board.reduce((acc, val, index) => {
    if (val === null) acc.push(index);
    return acc;
  }, []);
  const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  board[randomMove] = "O";
  document.querySelector(`[data-index='${randomMove}']`).innerText = "O";
  checkWinner();
  switchPlayer();
}

// Reset game
resetButton.addEventListener("click", () => {
  board = Array(9).fill(null);
  gameActive = true;
  currentPlayer = "X";
  statusText.innerText = "";
  createBoard();
});

// Initialize the game
createBoard();
