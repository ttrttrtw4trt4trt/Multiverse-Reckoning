const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const menu = document.getElementById('menu');
const startButton = document.getElementById('startButton');

const squareSize = 80;
const speed = 4;
const floorHeight = 50;
const gravity = 0.5;
const jumpStrength = 12;

let canvasWidth;
let canvasHeight;

let squareX = 100;
let squareY = 0;
let velocityY = 0;
let onGround = false;

const keysPressed = {};

let gameStarted = false;

function resizeCanvas() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Position square on floor if game started
  if (gameStarted) {
    squareY = canvasHeight - floorHeight - squareSize;
    squareX = Math.min(squareX, canvasWidth - squareSize);
  }
}

window.addEventListener('resize', resizeCanvas);

startButton.addEventListener('click', () => {
  menu.style.display = 'none';
  gameStarted = true;
  squareY = canvasHeight - floorHeight - squareSize;
  velocityY = 0;
  onGround = false;

  // Reset keys pressed
  for (let key in keysPressed) {
    keysPressed[key] = false;
  }
});

document.addEventListener('keydown', (event) => {
  if (!gameStarted) return;
  keysPressed[event.key.toLowerCase()] = true;

  if (event.key.toLowerCase() === 'w' && onGround) {
    velocityY = -jumpStrength;
    onGround = false;
  }
});

document.addEventListener('keyup', (event) => {
  if (!gameStarted) return;
  keysPressed[event.key.toLowerCase()] = false;
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

resizeCanvas();
gameLoop();
