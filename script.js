


let board = [];
let score = 0;

function createBoard() {
  for (let i = 0; i < 4; i++) {
    board[i] = [];
    for (let j = 0; j < 4; j++) {
      board[i][j] = 0;
    }
  }
}

function addRandomNumber() {
  let emptyCells = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        emptyCells.push({ row: i, col: j });
      }
    }
  }
  if (emptyCells.length > 0) {
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2: 4;
  }
}

function updateBoardUI() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let cell = document.getElementById(`cell-${i}-${j}`);
      cell.innerHTML = board[i][j] === 0 ? '' : board[i][j];
    }
  }
  document.getElementById('score').textContent = `Score: ${score}`;
}

function initGame() {
  createBoard();
  addRandomNumber();
  addRandomNumber();
  updateBoardUI();
  //checkWinCondition();//
}

function moveLeft() {
  for (let i = 0; i < 4; i++) {
    let currentRow = board[i];
    let merged = false;

    for (let j = 1; j < 4; j++) {
      if (currentRow[j] !== 0) {
        let k = j - 1;
        while (k >= 0 && currentRow[k] === 0) {
          currentRow[k] = currentRow[k + 1];
          currentRow[k + 1] = 0;
          k--;
        }
        if (k >= 0 && currentRow[k] === currentRow[k + 1] && !merged) {
          currentRow[k] *= 2;
          currentRow[k + 1] = 0;
          score += currentRow[k];
          merged = true;
        }
      }
    }
  }
}

function moveRight() {
  for (let i = 0; i < 4; i++) {
    board[i] = board[i].reverse();
  }
  moveLeft();
  for (let i = 0; i < 4; i++) {
    board[i] = board[i].reverse();
  }
}

function moveUp() {
  board = transpose(board);
  moveLeft();
  board = transpose(board);
}

function moveDown() {
  board = transpose(board);
  moveRight();
  board = transpose(board);
}

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function isGameOver() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        return false;
      }
      if (i < 3 && board[i][j] === board[i + 1][j]) {
        return false;
      }
      if (j < 3 && board[i][j] === board[i][j + 1]) {
        return false;
      }
    }
  }
  return true;
}

function handleKeyPress(event) {
  if (isGameOver()) {
    alert('Game over!');
    return;
  }

  switch (event.keyCode) {
    case 37: // Left arrow key
      moveLeft();
      break;
    case 38: // Up arrow key
      moveUp();
      break;
    case 39: // Right arrow key
      moveRight();
      break;
    case 40: // Down arrow key
      moveDown();
      break;
  }

  addRandomNumber();
  updateBoardUI();
  checkWinCondition();
  if (isGameOver()) {
    alert('Game over!');
  }
  
  // checkWinCondition();
}

function checkWinCondition() {
  let hasWon = false;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 2048) {
        hasWon = true;
        break;
      }
    }
   /* if (hasWon) {
      break;
    }*/
  }

  if (hasWon) {
    alert('Congratulations! You won the game!');
  }
}

document.addEventListener('keydown', handleKeyPress);

// Start a new game when the page loads
initGame();
