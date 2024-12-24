let board = [];
let rows = 20;
let cols = 20;
let interval;
let generationCount = 0;
let speed = 500;
let isMouseDown = false;

function createBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  rows = parseInt(document.getElementById('rows').value);
  cols = parseInt(document.getElementById('cols').value);
  gameBoard.style.setProperty('--rows', rows);
  gameBoard.style.setProperty('--cols', cols);
  for (let row = 0; row < rows; row++) {
    board[row] = [];
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', () => toggleCell(row, col));
      cell.addEventListener('mousedown', () => {
        isMouseDown = true;
        toggleCell(row, col);
      });
      cell.addEventListener('mousemove', () => {
        if (isMouseDown) {
          toggleCell(row, col);
        }
      });
      cell.addEventListener('mouseup', () => {
        isMouseDown = false;
      });
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
    generationCount++;
    document.getElementById('generation-count').textContent = generationCount;
  }, speed);
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

function resetBoard() {
  stopGame();
  generationCount = 0;
  document.getElementById('generation-count').textContent = generationCount;
  createBoard();
}

function pauseGame() {
  clearInterval(interval);
}

function saveGame() {
  const boardState = board.map(row => row.map(cell => cell.classList.contains('alive')));
  localStorage.setItem('boardState', JSON.stringify(boardState));
  localStorage.setItem('generationCount', generationCount);
}

function loadGame() {
  const boardState = JSON.parse(localStorage.getItem('boardState'));
  if (boardState) {
    stopGame();
    generationCount = parseInt(localStorage.getItem('generationCount'));
    document.getElementById('generation-count').textContent = generationCount;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (boardState[row][col]) {
          board[row][col].classList.add('alive');
        } else {
          board[row][col].classList.remove('alive');
        }
      }
    }
  }
}

function randomizeBoard() {
  stopGame();
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (Math.random() > 0.5) {
        board[row][col].classList.add('alive');
      } else {
        board[row][col].classList.remove('alive');
      }
    }
  }
}

document.getElementById('speed').addEventListener('input', (event) => {
  speed = parseInt(event.target.value);
  document.getElementById('current-speed').textContent = speed;
  if (interval) {
    clearInterval(interval);
    startGame();
  }
});

document.getElementById('patterns').addEventListener('change', (event) => {
  const pattern = event.target.value;
  if (pattern === 'pattern1') {
    // Define pattern1
  } else if (pattern === 'pattern2') {
    // Define pattern2
  } else if (pattern === 'pattern3') {
    // Define pattern3
  }
});

document.addEventListener('DOMContentLoaded', createBoard);
