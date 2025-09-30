const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Square properties
const squareSize = 80;
const speed = 4;
let squareX = 100;
let squareY = 100;

const keysPressed = {};

document.addEventListener('keydown', (event) => {
  keysPressed[event.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (event) => {
  keysPressed[event.key.toLowerCase()] = false;
});

function updatePosition() {
  let dx = 0;
  let dy = 0;

  if (keysPressed['w']) dy -= 1;
  if (keysPressed['s']) dy += 1;
  if (keysPressed['a']) dx -= 1;
  if (keysPressed['d']) dx += 1;

  if (dx !== 0 && dy !== 0) {
    dx *= Math.SQRT1_2; 
    dy *= Math.SQRT1_2;
  }

  squareX = Math.min(Math.max(0, squareX + dx * speed), canvas.width - squareSize);
  squareY = Math.min(Math.max(0, squareY + dy * speed), canvas.height - squareSize);
}

function drawSquare() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(squareX, squareY, squareSize, squareSize);
}

function gameLoop() {
  updatePosition();
  drawSquare();
  requestAnimationFrame(gameLoop);
}

gameLoop();





