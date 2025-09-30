const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const squareSize = 80;
const speed = 4;
const floorHeight = 50;
const gravity = 0.5;
const jumpStrength = 12;

let squareX = 100;
let squareY = canvas.height - floorHeight - squareSize;
let velocityY = 0;
let onGround = true;

const keysPressed = {};

document.addEventListener('keydown', (event) => {
  keysPressed[event.key.toLowerCase()] = true;

  // Jump when W is pressed and square is on the ground
  if (event.key.toLowerCase() === 'w' && onGround) {
    velocityY = -jumpStrength;
    onGround = false;
  }
});

document.addEventListener('keyup', (event) => {
  keysPressed[event.key.toLowerCase()] = false;
});

function updatePosition() {
  // Move left or right
  if (keysPressed['a']) {
    squareX = Math.max(0, squareX - speed);
  }
  if (keysPressed['d']) {
    squareX = Math.min(canvas.width - squareSize, squareX + speed);
  }

  // Apply gravity
  velocityY += gravity;
  squareY += velocityY;

  // Check collision with floor
  const floorY = canvas.height - floorHeight - squareSize;
  if (squareY > floorY) {
    squareY = floorY;
    velocityY = 0;
    onGround = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw floor
  ctx.fillStyle = 'green';
  ctx.fillRect(0, canvas.height - floorHeight, canvas.width, floorHeight);

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
