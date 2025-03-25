// Basic game setup
const letters = ['B', 'I', 'N', 'G', 'O'];  // Letters to find
let playerTurn = 1;  // Player 1 starts
let revealedLettersPlayer1 = [];  // Track Player 1's revealed letters (red)
let revealedLettersPlayer2 = [];  // Track Player 2's revealed letters (blue)
let gameBoard = document.getElementById('board');
let turnDisplay = document.getElementById('turn');
let messageDisplay = document.getElementById('message');
let popup = document.getElementById('popup');

// Initialize the 10x10 grid with random letters from "BINGO"
function createBoard() {
  const grid = [];
  for (let i = 0; i < 100; i++) {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    grid.push(randomLetter);
  }

  // Display grid
  grid.forEach((letter, index) => {
    const cell = document.createElement('div');
    cell.textContent = letter;
    cell.addEventListener('click', () => revealCell(cell, letter));
    gameBoard.appendChild(cell);
  });
}

// Reveal the clicked cell and check if the game is won
function revealCell(cell, letter) {
  if (!cell.classList.contains('revealed')) {
    cell.classList.add('revealed');
    cell.classList.add(`player${playerTurn}`);
    
    // Track the revealed letters for the corresponding player
    if (playerTurn === 1) {
      revealedLettersPlayer1.push(letter);
    } else {
      revealedLettersPlayer2.push(letter);
    }
    
    checkWinner();
    switchTurn();
  }
}

// Switch between Player 1 and Player 2
function switchTurn() {
  if (playerTurn === 1) {
    playerTurn = 2;
    turnDisplay.textContent = "Player 2's Turn";
  } else {
    playerTurn = 1;
    turnDisplay.textContent = "Player 1's Turn";
  }
}

// Check if any player has revealed all letters in "BINGO"
function checkWinner() {
  // Check if Player 1 has revealed all 'BINGO' letters
  if (revealedLettersPlayer1.length >= 5 && letters.every(letter => revealedLettersPlayer1.includes(letter))) {
    messageDisplay.textContent = "Player 1 Wins!";
    showPopup();
  }
  
  // Check if Player 2 has revealed all 'BINGO' letters
  if (revealedLettersPlayer2.length >= 5 && letters.every(letter => revealedLettersPlayer2.includes(letter))) {
    messageDisplay.textContent = "Player 2 Wins!";
    showPopup();
  }
}

// Show the popup with the reset button
function showPopup() {
  popup.style.display = 'block';
}

// Reset the game
function resetGame() {
  // Clear the board
  gameBoard.innerHTML = '';
  revealedLettersPlayer1 = [];
  revealedLettersPlayer2 = [];
  playerTurn = 1;
  turnDisplay.textContent = "Player 1's Turn";
  messageDisplay.textContent = '';
  popup.style.display = 'none';
  
  createBoard(); // Recreate the game board
}

// Start the game
createBoard();

// Attach the reset button event
document.querySelector('#popup button').addEventListener('click', resetGame);
