const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

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

// Resize and adjust canvas size and square position
function resizeCanvas() {
  // If fullscreen, use fullscreen element size, else use window size
  const width = document.fullscreenElement ? window.screen.width : window.innerWidth;
  const height = document.fullscreenElement ? window.screen.height : window.innerHeight;

  canvasWidth = width;
  canvasHeight = height;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  squareY = canvasHeight - floorHeight - squareSize;
  squareX = Math.min(squareX, canvasWidth - squareSize);
}

window.addEventListener('resize', resizeCanvas);
document.addEventListener('fullscreenchange', resizeCanvas);
resizeCanvas();

document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  keysPressed[key] = true;

  if (key === 'w' && onGround) {
    velocityY = -jumpStrength;
    onGround = false;
  }

  // Toggle fullscreen when 'f' pressed
  if (key === 'f') {
    toggleFullscreen();
  }
});

document.addEventListener('keyup', (event) => {
  keysPressed[event.key.toLowerCase()] = false;
});

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) { // Safari
      canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { // IE/Edge
      canvas.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { // Safari
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  }
}

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

  ctx.fillStyle = 'green';
  ctx.fillRect(0, canvasHeight - floorHeight, canvasWidth, floorHeight);

  ctx.fillStyle = 'blue';
  ctx.fillRect(squareX, squareY, squareSize, squareSize);
}

function gameLoop() {
  updatePosition();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
