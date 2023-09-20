const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');

function drawClockFace() {
  // Draw clock face
  ctx.beginPath();
  ctx.arc(250, 250, 210, 0, 2 * Math.PI);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw tick marks
  for (let i = 0; i < 12; i++) {
    const angle = (Math.PI / 6) * i;
    const x1 = 250 + 190 * Math.cos(angle);
    const y1 = 250 + 190 * Math.sin(angle);
    const x2 = 250 + 210 * Math.cos(angle);
    const y2 = 250 + 210 * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // Draw clock numbers
  ctx.font = '20px sans-serif';
  for (let i = 1; i <= 12; i++) {
    const angle = (2 * Math.PI / 12) * i;
    const x = 240 + 180 * Math.cos(angle - Math.PI / 2);
    const y = 250 + 180 * Math.sin(angle - Math.PI / 2);
    ctx.fillText(i, x, y);
  }
}

function drawClockHands(hours, minutes) {
  // Normalize hours
  hours = hours % 12;

  // Calculate angles
  const minuteAngle = (2 * Math.PI / 60) * minutes;
  const hourAngle = (2 * Math.PI / 12) * hours + (2 * Math.PI / 12) * (minutes / 60);

  // Draw minute hand
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(250, 250);
  ctx.lineTo(
    250 + 150 * Math.cos(Math.PI / 2 - minuteAngle),
    250 - 150 * Math.sin(Math.PI / 2 - minuteAngle)
  );
  ctx.stroke();

  // Draw hour hand
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(250, 250);
  ctx.lineTo(
    250 + 100 * Math.cos(Math.PI / 2 - hourAngle),
    250 - 100 * Math.sin(Math.PI / 2 - hourAngle)
  );
  ctx.stroke();

  // Calculate angle between hands
  let angleBetweenHands = Math.abs((hourAngle - minuteAngle) * (180 / Math.PI));
  angleBetweenHands = Math.min(360 - angleBetweenHands, angleBetweenHands);

  document.getElementById('angleDisplay').innerText = `Angle: ${angleBetweenHands.toFixed(2)} degrees`;
}

function drawClock() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const hours = document.getElementById('hourInput').value;
  const minutes = document.getElementById('minuteInput').value;
  drawClockFace();
  drawClockHands(hours, minutes);
}

// Initial draw
drawClockFace();
