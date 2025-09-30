const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const squareSize = 80;
const speed = 4;
const floorHeight = 50;
const gravity = 0.5;
const jumpStrength = 12;

let canvasWidth, canvasHeight;

let squareX = 100;
let squareY = 0; // will be set after resize
let velocityY = 0;
let onGround = false;

const keysPressed = {};

function resizeCanvas() {
  // Set canvas internal drawing size to match CSS size
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Position square on top of floor after resize
  squareY = canvasHeight - floorHeight - squareSize;
  squareX = Math.min(squareX, canvasWidth - squareSize);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

document.addEventListener('keydown', (event) => {
  keysPressed[event.key.toLowerCase()] = true;
  if (event.key.toLowerCase() === 'w' && onGround) {
    velocityY = -jumpStrength;
    onGround = false;
  }
});

document.addEventListener('keyup', (event) => {
  keysPressed[event.key.toLowerCase()] = false;
});

function updatePosition() {
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

  // Draw square
  ctx.fillStyle = 'blue';
  ctx.fillRect(squareX, squareY, squareSize, squareSize);
}

function gameLoop() {
  updatePosition();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
