const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Square properties
const squareSize = 80;
let squareX = 0;
let squareY = canvas.height - squareSize;
const speed = 4;

// Track pressed keys
const keysPressed = {};

// Draw the square at its current position
function drawSquare() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(squareX, squareY, squareSize, squareSize);
}

// Update position based on pressed keys
function updateSquare() {
  if (keysPressed['w']) {
    squareY = Math.max(0, squareY - speed);
  }
  if (keysPressed['s']) {
    squareY = Math.min(canvas.height - squareSize, squareY + speed);
  }
  if (keysPressed['a']) {
    squareX = Math.max(0, squareX - speed);
  }
  if (keysPressed['d']) {
    squareX = Math.min(canvas.width - squareSize, squareX + speed);
  }
}

// Game loop for smooth movement
function gameLoop() {
  updateSquare();
  drawSquare();
  requestAnimationFrame(gameLoop);
}

// Listen for WASD keydown/keyup events
document.addEventListener('keydown', function (event) {
  keysPressed[event.key.toLowerCase()] = true;
});

document.addEventListener('keyup', function (event) {
  keysPressed[event.key.toLowerCase()] = false;
});

// Start the game loop
gameLoop();
