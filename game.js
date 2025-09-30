const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Square properties
let squareX = 50;
let squareY = 50;
const squareSize = 80;
const speed = 10;

// Draw the square at its current position
function drawSquare() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.fillStyle = 'blue';
  ctx.fillRect(squareX, squareY, squareSize, squareSize);
}

// Listen for WASD keyboard events only
document.addEventListener('S', function (event) {
  switch (event.key.toLowerCase()) {
    case 'w':
      squareY = Math.max(0, squareY - speed);
      break;
    case 's':
      squareY = Math.min(canvas.height - squareSize, squareY + speed);
      break;
    case 'a':
      squareX = Math.max(0, squareX - speed);
      break;
    case 'd':
      squareX = Math.min(canvas.width - squareSize, squareX + speed);
      break;
  }
  drawSquare();
});

// Initial draw
drawSquare();
