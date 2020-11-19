// main.js
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const gridRow = [];
const gridColumn = [];
// Iteration 1
function drawGrid() {
  for (let x = 0; x < 11; x++) {
    context.beginPath();
    context.moveTo(x * 50, 0);
    context.lineTo(x * 50, height);
    context.closePath();
    context.stroke();
    gridColumn.push(x * 50);
  }
  for (let y = 0; y < 11; y++) {
    context.beginPath();
    context.moveTo(0, y * 50);
    context.lineTo(width, y * 50);
    context.closePath();
    context.stroke();
    gridRow.push(y * 50);
  }
}

class Character {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.direction = 'down';
  }
  moveUp() {
    this.row -= 1;
  }
  moveRight() {
    this.col += 1;
  }
  moveDown() {
    this.row += 1;
  }
  moveLeft() {
    this.col -= 1;
  }
}

const player = new Character(0, 0);

function drawPlayer() {
  const playerImage = new Image();
  switch (player.direction) {
    case 'down':
      playerImage.src = 'images/character-down.png';
      break;
    case 'right':
      playerImage.src = 'images/character-right.png';
      break;
    case 'up':
      playerImage.src = 'images/character-up.png';
      break;
    case 'left':
      playerImage.src = 'images/character-left.png';
      break;
  }
  playerImage.addEventListener('load', () => {
    context.drawImage(
      playerImage,
      gridColumn[player.col],
      gridRow[player.row],
      48,
      48
    );
  });
}

class Treasure {
  constructor() {
    this.row = 0;
    this.column = 0;
  }
  setRandomPosition() {
    this.row = gridRow[Math.floor(Math.random() * 10)];
    this.column = gridColumn[Math.floor(Math.random() * 10)];
  }
}

const newTreasure = new Treasure();

function drawTreasure() {
  newTreasure.setRandomPosition();
  const treasureImage = new Image();
  treasureImage.src = 'images/treasure.png';
  treasureImage.addEventListener('load', () => {
    context.drawImage(
      treasureImage,
      newTreasure.column,
      newTreasure.row,
      48,
      48
    );
  });
}

function treasureRemains() {
  const treasureImage = new Image();
  treasureImage.src = 'images/treasure.png';
  treasureImage.addEventListener('load', () => {
    context.drawImage(
      treasureImage,
      newTreasure.column,
      newTreasure.row,
      48,
      48
    );
  });
}

function drawEverything() {
  context.clearRect(0, 0, 500, 500);
  drawGrid();
  drawPlayer(player.row, player.col);
  drawTreasure();
}

function refresh() {
  context.clearRect(0, 0, 500, 500);
  drawGrid();
  drawPlayer(player.row, player.col);
  treasureRemains();
}
drawEverything();

window.addEventListener('keydown', (event) => {
  // Stop the default behavior (moving the screen to the left/up/right/down)
  event.preventDefault();

  // React based on the key pressed
  switch (event.key) {
    case 'ArrowLeft':
      if (gridColumn[player.col] === 0) {
        alert('The player cannot go outside of the grid');
        break;
      }
      player.moveLeft();
      player.direction = 'left';
      if (
        gridColumn[player.col] === newTreasure.column &&
        gridRow[player.row] === newTreasure.row
      ) {
        drawEverything();
      } else {
        refresh();
      }
      break;
    case 'ArrowUp':
      if (gridRow[player.row] === 0) {
        alert('The player cannot go outside of the grid');
        break;
      }
      player.moveUp();
      player.direction = 'up';
      if (
        gridRow[player.row] === newTreasure.row &&
        gridColumn[player.col] === newTreasure.column
      ) {
        drawEverything();
      } else {
        refresh();
      }
      break;
    case 'ArrowRight':
      if (gridColumn[player.col] === 9) {
        alert('The player cannot go outside of the grid');
        break;
      }
      player.moveRight();
      player.direction = 'right';
      if (
        gridColumn[player.col] === newTreasure.column &&
        gridColumn[player.row] === newTreasure.row
      ) {
        drawEverything();
      } else {
        refresh();
      }
      break;
    case 'ArrowDown':
      if (gridRow[player.row] === 9) {
        alert('The player cannot go outside of the grid');
        break;
      }
      player.moveDown();
      player.direction = 'down';
      if (
        gridRow[player.row] === newTreasure.row &&
        gridColumn[player.col] === newTreasure.column
      ) {
        drawEverything();
      } else {
        refresh();
      }
      break;
  }
});
