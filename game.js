const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const menu = document.getElementById('menu');
const startButton = document.getElementById('startButton');

const squareSize = 80;
const speed = 4;
const floorHeight = 50;
const gravity = 0.5;
const jumpStrength = 12;

let canvasWidth, canvasHeight;

let squareX = 100;
let squareY = 0; // will be set on resize
let velocityY = 0;
let onGround = false;

const keysPressed = {};

let gameStarted = false; // Flag to control game state

function resizeCanvas() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvasWidth = width;
  canvasHeight = height;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  squareY = canvasHeight - floorHeight - squareSize;
  squareX = Math.min(squareX, canvasWidth - squareSize);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

document.addEventListener('keydown', (event) => {
  if (!gameStarted) return; // Ignore keys if game not started
  const key = event.key.toLowerCase();
  keysPressed[key] = true;
  if (key === 'w' && onGround) {
    velocityY = -jumpStrength;
    onGround = false;
  }
});

document.addEventListener('keyup', (event) => {
  if (!gameStarted) return; // Ignore keys if game not started
  keysPressed[event.key.toLowerCase()] = false;
});

startButton.addEventListener('click', () => {
  menu.style.display = 'none';
  gameStarted = true;
  // Reset position in case player restarts later
  squareX = 100;
  squareY = canvasHeight - floorHeight - squareSize;
  velocityY = 0;
  onGround = false;
  keysPressed['a'] = false;
  keysPressed['d'] = false;
  keysPressed['w'] = false;
});

function updatePosition() {
  if (!gameStarted) return;

  if (keysPressed['a']) {
    squareX = Math.max(0, squareX - speed);
  }
  if (keysPressed['d']) {
    squareX = Math.min(canvasWidth - squareSize, squareX + speed);
  }

  velocityY += gravity;
  squareY += velocityY;

  const floorY = canvasHeight - floorHeight - squareSize;
  if (squareY > floorY) {
    squareY = floorY;
    velocityY = 0;
    onGround = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw floor
  ctx.fillStyle = 'green';
  ctx.fillRect(0, canvasHeight - floorHeight, canvasWidth, floorHeight);

  // Draw square if game started
  if (gameStarted) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(squareX, squareY, squareSize, squareSize);
  }
}

function gameLoop() {
  updatePosition();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
