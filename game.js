const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Square properties
const squareSize = 80;
const speed = 4;
let squareX = 100;
let squareY = 100;

// Object to track which keys are currently pressed
const keysPressed = {};

// Listen for keydown events - mark key as pressed
document.addEventListener('keydown', (event) => {
  keysPressed[event.key.toLowerCase()] = true;
});

// Listen for keyup events - mark key as not pressed
document.addEventListener('keyup', (event) => {
  keysPressed[event.key.toLowerCase()] = false;
});

// Update the square’s position based on which keys are pressed
function updatePosition() {
  if (keysPressed['w']) {
    squareY = Math.max(0, squareY - speed);
  }
  if (keysPressed['a']) {
    squareX = Math.max(0, squareX - speed);
  }
  if (keysPressed['s']) {
    squareY = Math.min(canvas.height - squareSize, squareY + speed);
  }
  if (keysPressed['d']) {
    squareX = Math.min(canvas.width - squareSize, squareX + speed);
  }
}

// Draw the square
function drawSquare() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(squareX, squareY, squareSize, squareSize);
}

// Game loop: update position and redraw repeatedly
function gameLoop() {
  updatePosition();
  drawSquare();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
