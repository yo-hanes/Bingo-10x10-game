// Basic game setup
const letters = ['B', 'I', 'N', 'G', 'O', ' ', '☠', '♡'];  // Letters to find
const container = document.getElementById("game-container");

let playerTurn = 1;
let revealedLettersPlayer1 = new Set();
let revealedLettersPlayer2 = new Set();
let skullCounterPlayer1 = 0;
let skullCounterPlayer2 = 0;
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

  grid.forEach((letter, index) => {
    const cell = document.createElement('div');
    cell.textContent = letter;
    cell.addEventListener('click', () => revealCell(cell, letter));
    gameBoard.appendChild(cell);
  });
}

// Reveal the clicked cell and check for effects
function revealCell(cell, letter) {
  if (!cell.classList.contains('revealed')) {
    cell.classList.add('revealed');
    cell.classList.add(`player${playerTurn}`);
    
    if (playerTurn === 1) {
      if (['B', 'I', 'N', 'G', 'O'].includes(letter)) {
        revealedLettersPlayer1.add(letter);
      }
      if (letter === '☠') {
        skullCounterPlayer1++;
        if (skullCounterPlayer1 >= 3) {
          messageDisplay.textContent = "Player 1 must do a DARE!";
          messageDisplay.style.backgroundColor = 'lightcoral'; // Change to your desired color
          skullCounterPlayer1 = 0;
        }
      }
    } else {
      if (['B', 'I', 'N', 'G', 'O'].includes(letter)) {
        revealedLettersPlayer2.add(letter);
      }
      if (letter === '☠') {
        skullCounterPlayer2++;
        if (skullCounterPlayer2 >= 3) {
          messageDisplay.textContent = "Player 2 must do a DARE!";
          messageDisplay.style.backgroundColor = 'lightcoral'; // Change to your desired color
          skullCounterPlayer2 = 0;
        }
      }
    }
    
    if (letter !== '♡') {
      switchTurn();
    } else {
      messageDisplay.textContent = `Player ${playerTurn} gets another turn!`;
      messageDisplay.style.backgroundColor = 'lightgreen'; // Change to your desired color
    }
    
  }
  checkWinner();
}

// Switch between players
function switchTurn() {
  playerTurn = playerTurn === 1 ? 2 : 1;
  turnDisplay.textContent = `Player ${playerTurn}'s Turn`;
  turnDisplay.style.color = playerTurn === 1 ? "red" : "blue"; 
  container.style.backgroundColor = playerTurn === 1 ? "blue" : "red";
  
}

// Check if any player has won
function checkWinner() {
  const bingoLetters = new Set(['B', 'I', 'N', 'G', 'O']);
  if ([...bingoLetters].every(letter => revealedLettersPlayer1.has(letter))) {
    messageDisplay.textContent = "🎉 Player 1 Wins!";
    showPopup('Player 1');
  }
  if ([...bingoLetters].every(letter => revealedLettersPlayer2.has(letter))) {
    messageDisplay.textContent = "🎉 Player 2 Wins!";
    showPopup('Player 2');
  }
}

// Show the popup
function showPopup() {
  popup.style.display = 'block';
}

// Reset the game
function resetGame() {
  gameBoard.innerHTML = '';
  revealedLettersPlayer1.clear();
  revealedLettersPlayer2.clear();
  skullCounterPlayer1 = 0;
  skullCounterPlayer2 = 0;
  playerTurn = 1;
  turnDisplay.textContent = "Player 1's Turn";
  messageDisplay.textContent = '';
  popup.style.display = 'none';
  createBoard();
}

createBoard();

document.querySelector('#popup button').addEventListener('click', resetGame);
