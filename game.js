const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Square properties
const squareSize = 80;
const speed = 4;
let squareX = 100;
let floorHeight = 50;  // height of the floor
let squareY = canvas.height - floorHeight - squareSize;  // start on top of the floor

// Floor properties
const floorY = canvas.height - floorHeight;

const keysPressed = {};

document.addEventListener('keydown', (event) => {
  keysPressed[event.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (event) => {
  keysPressed[event.key.toLowerCase()] = false;
});

function updatePosition() {
  if (keysPressed['a']) {
    squareX = Math.max(0, squareX - speed);
  }
  if (keysPressed['d']) {
    squareX = Math.min(canvas.width - squareSize, squareX + speed);
  }
}

function drawSquare() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw floor
  ctx.fillStyle = 'green';
  ctx.fillRect(0, floorY, canvas.width, floorHeight);
  
  // Draw square
  ctx.fillStyle = 'blue';
  ctx.fillRect(squareX, squareY, squareSize, squareSize);
}

function gameLoop() {
  updatePosition();
  drawSquare();
  requestAnimationFrame(gameLoop);
}

gameLoop();






