export let dangerCount1 = 0;
export let dangerCount2 = 0;

// Function to update BINGO boxes in the player's container
export function updateBingoBoxes(playerId, lettersArray) {
  const boxes = document.querySelectorAll(`#${playerId} .box`);
  let index = 0;

  "BINGO".split("").forEach(letter => {
    if (lettersArray.includes(letter) && index < 5) {
      boxes[index].textContent = letter;
      boxes[index].style.background = "yellow";
      index++;
    }
  });
}

// Function to update danger ☠️ count
export function updateDangerCount(player) {
  let dangerBoxes = document.querySelectorAll(`#player${player}-danger .danger-box`);

  if (player === 1 && dangerCount1 < 3) {
    dangerBoxes[dangerCount1].style.background = "black";
    dangerCount1++;
  } else if (player === 2 && dangerCount2 < 3) {
    dangerBoxes[dangerCount2].style.background = "black";
    dangerCount2++;
  }
}
