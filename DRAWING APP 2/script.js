const canvas = document.getElementById('canvas');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const ctx = canvas.getContext('2d');

size = 20;
color = 'black';
isPressed = false;


canvas.addEventListener('mousedown', (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
})

canvas.addEventListener('mouseup', () => {
  isPressed = false;

  x = undefined;
  y = undefined;
})

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    x2 = e.offsetX;
    y2 = e.offsetY;

    drawCircle(x, y);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
})


function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.lineWidth = size * 2;
}

increaseBtn.addEventListener('click', () => {
  size += 5;

  if (size > 50) {
    size = 50;
  }

  updateSize();
})

decreaseBtn.addEventListener('click', () => {
  size -= 5;

  if (size < 5) {
    size = 5;
  }

  updateSize();
})

function updateSize() {
  sizeEl.innerText = size;
}

colorEl.addEventListener('change', (e) => {
  color = e.target.value
})

clearEl.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
})