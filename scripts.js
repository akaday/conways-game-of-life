let board = [];
let rows = 20;
let cols = 20;
let interval;

function createBoard() {
  const gameBoard = document.getElementById('game-board');
  for (let row = 0; row < rows; row++) {
    board[row] = [];
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', () => toggleCell(row, col));
      board[row][col] = cell;
      gameBoard.appendChild(cell);
    }
  }
}

function toggleCell(row, col) {
  board[row][col].classList.toggle('alive');
}

function startGame() {
  interval = setInterval(() => {
    let newBoard = board.map(arr => arr.slice());
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let aliveNeighbors = countAliveNeighbors(row, col);
        if (board[row][col].classList.contains('alive')) {
          if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            newBoard[row][col].classList.remove('alive');
          }
        } else {
          if (aliveNeighbors === 3) {
            newBoard[row][col].classList.add('alive');
          }
        }
      }
    }
    board = newBoard;
  }, 500);
}

function stopGame() {
  clearInterval(interval);
}

function countAliveNeighbors(row, col) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      let newRow = row + i;
      let newCol = col + j;
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        if (board[newRow][newCol].classList.contains('alive')) {
          count++;
        }
      }
    }
  }
  return count;
}

document.addEventListener('DOMContentLoaded', createBoard);
