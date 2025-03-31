// Basic game setup
const letters = ['B', 'I', 'N', 'G', 'O', 'F', '☠️', '❤️'];  // Letters to find
const container = document.getElementById("game-container"); // Adjust based on your actual ID or class

let playerTurn = 1;  // Player 1 starts
let revealedLettersPlayer1 = new Set();  // Track Player 1's revealed letters
let revealedLettersPlayer2 = new Set();  // Track Player 2's revealed letters
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
      if (['B', 'I', 'N', 'G', 'O'].includes(letter)) {
        revealedLettersPlayer1.add(letter);
      }
    } else {
      if (['B', 'I', 'N', 'G', 'O'].includes(letter)) {
        revealedLettersPlayer2.add(letter);
      }
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
    container.style.backgroundColor = "red"; // Change to Player 2 color
  } else {
    playerTurn = 1;
    turnDisplay.textContent = "Player 1's Turn";
    container.style.backgroundColor = "blue"; // Change to Player 1 color
  }
}

// Check if any player has revealed all letters in "BINGO"
function checkWinner() {
  const bingoLetters = new Set(['B', 'I', 'N', 'G', 'O']);
  
  // Check if Player 1 has revealed all 'BINGO' letters
  if ([...bingoLetters].every(letter => revealedLettersPlayer1.has(letter))) {
    messageDisplay.textContent = "🎉 Player 1 Wins!";
    showPopup();
    return;
  }
  
  // Check if Player 2 has revealed all 'BINGO' letters
  if ([...bingoLetters].every(letter => revealedLettersPlayer2.has(letter))) {
    messageDisplay.textContent = "🎉 Player 2 Wins!";
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
  revealedLettersPlayer1.clear();
  revealedLettersPlayer2.clear();
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
