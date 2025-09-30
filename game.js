const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Square properties
const squareSize = 80;
const speed = 4;
let squareX = 0;
let squareY = canvas.height - squareSize;

// Track pressed keys
const keysPressed = {};

// Draw a grid
function drawGrid() {
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x <= canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.fillText(x, x + 2, 12);
  }
  for (let y = 0; y <= canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.fillText(y, 2, y - 2);
  }
}

// Draw the square at its current position and its coordinates
function drawSquare() {
  drawGrid();
  ctx.fillStyle = 'blue';
  ctx.fillRect(squareX, squareY, squareSize, squareSize);
  // Show square coordinates
  ctx.fillStyle = 'red';
  ctx.font = '16px Arial';
  ctx.fillText(`(${squareX}, ${squareY})`, squareX + 5, squareY + 20);
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
